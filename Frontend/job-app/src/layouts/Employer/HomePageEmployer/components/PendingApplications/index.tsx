/* eslint-disable @typescript-eslint/no-explicit-any */
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ErrorBox, Spinner } from "../../../../../components";
import { useEffect, useState } from "react";
import { applicationsAPI } from "../../../../../services";
import { ApplicationResponseModel } from "../../../../../models/ApplicationResponseModel";
import { ApplicationDetailPage } from "../../../ApplicationPageEmployer/components";
import Swal from "sweetalert2";

const PendingApplications = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [applications, setApplications] = useState<ApplicationResponseModel[]>(
    []
  );
  const [application, setApplication] = useState<ApplicationResponseModel>();

  const [showBoxApplicationDetail, setShowBoxApplicationDetail] =
    useState(false);

  useEffect(() => {
    const fetchJobs = () => {
      applicationsAPI
        .getPendingApplicationsByEmployerToken(
          localStorage.getItem("employerToken") || ""
        )
        .then((res) => {
          setApplications(res.data.content);
        })
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchJobs();
  }, []);

  if (isLoading) {
    return (
      <div className="flex-grow">
        <Spinner />
      </div>
    );
  }

  if (httpError) {
    return (
      <div className="flex-grow px-6 mx-auto">
        <ErrorBox text={httpError} />
      </div>
    );
  }

  const updateState = (state: string, applicationId: string) => {
    if (state.trim() == "approved" || state.trim() == "refused") {
      Swal.fire({
        title: `Do you want to ${state} application`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          setIsLoading(true);
          applicationsAPI
            .updateState(
              state,
              applicationId,
              localStorage.getItem("employerToken") || ""
            )
            .then(() => {
              Swal.fire({
                title: `${state} application success`,
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Yes",
              })
                .then((result) => {
                  if (result.isConfirmed) {
                    window.location.reload();
                  }
                })
                .catch(() => {
                  Swal.fire("Error!", `${state} application fail`, "error");
                })
                .finally(() => {
                  setIsLoading(false);
                });
            });
        }
      });
    } else {
      Swal.fire("Error!", "Some thing went wrong", "error");
    }
  };

  return (
    <>
      <div className="w-full xl:w-1/3 px-3">
        <p className="text-xl font-semibold mb-4">Pending application</p>
        <div className="w-full bg-white border rounded-lg p-4 mb-8 xl:mb-0">
          {applications.length > 0 ? (
            applications.map((application, i) => (
              <div
                className="w-full bg-gray-100 border rounded-lg flex justify-between items-center px-4 py-2 my-2"
                key={i}
              >
                <div>
                  <div className="flex items-center">
                    <Link
                      to="#"
                      className="font-semibold text-lg hover:text-blue-500 truncate max-w-[180px] sm:max-w-[450px]  lg:max-w-[180px]"
                      onClick={() => {
                        setShowBoxApplicationDetail(true);
                        setApplication(application);
                      }}
                    >
                      {application.title}
                    </Link>
                  </div>
                  <p className="truncate max-w-[180px] sm:max-w-[450px]  lg:max-w-[180px]">
                    {application.accountName}
                  </p>
                </div>
                <div className="flex gap-1 sm:gap-2 text-2xl">
                  <div className="cursor-pointer hover:text-blue-500">
                    <AiFillCheckCircle
                      onClick={() => {
                        application.state == "pending"
                          ? updateState("approved", application.id)
                          : Swal.fire(
                              "Notification",
                              "Approved only while application is pending",
                              "info"
                            );
                      }}
                    />
                  </div>
                  <div className="cursor-pointer hover:text-red-500">
                    <AiFillCloseCircle
                      onClick={() => {
                        application.state == "pending"
                          ? updateState("refused", application.id)
                          : Swal.fire(
                              "Notification",
                              "Refused only while application is pending",
                              "info"
                            );
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <ErrorBox text="There are no applications..." />
          )}
        </div>
      </div>
      {showBoxApplicationDetail && localStorage.getItem("employerToken") && (
        <ApplicationDetailPage
          setShowBoxApplicationDetail={setShowBoxApplicationDetail}
          application={application}
        />
      )}
    </>
  );
};
export default PendingApplications;
