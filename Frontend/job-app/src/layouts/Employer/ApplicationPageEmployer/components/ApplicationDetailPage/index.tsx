/* eslint-disable @typescript-eslint/no-explicit-any */

import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ApplicationModel } from "../../../../../models/ApplicationModel";
import { useEffect, useState } from "react";
import { ErrorBox, Spinner } from "../../../../../components";
import { applicationsAPI } from "../../../../../services";
import Swal from "sweetalert2";
import { ApplicationResponseModel } from "../../../../../models/ApplicationResponseModel";
import { openCV } from "../../../../../utils";

const ApplicationDetailPage: React.FC<{
  setShowBoxApplicationDetail: any;
  application?: ApplicationResponseModel;
}> = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [application, setApplication] = useState<ApplicationModel>();

  useEffect(() => {
    const fetchApplication = () => {
      applicationsAPI
        .getApplicationByIDAndEmployerToken(
          props.application?.id || "",
          localStorage.getItem("employerToken") || ""
        )
        .then((res) => {
          setApplication(res.data);
        })
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchApplication();
  }, [props.application?.id]);

  if (isLoading) {
    return (
      <div className="flex-grow">
        <Spinner />
      </div>
    );
  }

  if (httpError) {
    return (
      <div className="flex-grow w-5/6 sm:w-3/4 mx-auto my-10">
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
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow relative w-[90%] sm:w-[70%] md:w-[60%] lg:w-[53%] xl:w-[45%]">
        <div className="flex items-start justify-between p-2 sm:p-5 pl-5 border-b rounded-t">
          <h3 className="text-lg sm:text-xl font-semibold">
            Candidate application for{" "}
            <Link
              to={`/employer/job/${props.application?.jobId}`}
              className="uppercase text-gray-700 hover:text-blue-600"
            >
              {props.application?.title}
            </Link>
          </h3>
          <button
            type="button"
            className="text-xl text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center"
            onClick={() => props.setShowBoxApplicationDetail(false)}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="rounded-lg py-3 overflow-y-auto max-h-[calc(100vh-180px)]">
          <div className="pb-2 px-5 text-xs sm:text-sm">
            <div className="min-[450px]:flex gap-5 mt-2">
              <label className="block min-[450px]:w-[60%] mb-5">
                <span className="font-semibold">Candidate Name: </span>
                <p className="mt-2">{application?.name}</p>
              </label>

              <label className="block min-[450px]:w-[40%] mb-5">
                <span className="font-semibold">Apply Date: </span>
                <p className="mt-2">
                  {application?.applyDate &&
                    new Date(application?.applyDate).toLocaleDateString()}
                </p>
              </label>
            </div>

            <div className="min-[450px]:flex gap-5 ">
              <label className="block  min-[450px]:w-[60%] mb-5">
                <span className="font-semibold">Email: </span>
                <p className="mt-2">{application?.email}</p>
              </label>

              <label className="block min-[450px]:w-[40%] mb-5">
                <span className="font-semibold">Phone Number: </span>
                <p className="mt-2">{application?.phoneNumber}</p>
              </label>
            </div>

            <label className="block mb-5">
              <span className="font-semibold">Thư giới thiệu:</span>
              <div
                className="mt-2 ring-1 px-3 py-2 rounded-lg ring-gray-300"
                dangerouslySetInnerHTML={{
                  __html: application?.letter || "",
                }}
              />
            </label>
            <label className="block mb-5">
              <span className="font-semibold">CV: </span>
              <a
                className="hover:text-blue-600 ml-1 cursor-pointer"
                onClick={() => openCV(application?.cv || "")}
              >
                Xem chi tiết
              </a>
            </label>

            {application?.state == "pending" && (
              <div className="mb-3 flex gap-5 justify-end">
                <button
                  className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
                  onClick={() => {
                    application.state == "pending"
                      ? updateState("refused", application.id)
                      : Swal.fire(
                          "Notification",
                          "Refused only while application is pending",
                          "info"
                        );
                  }}
                >
                  Refused
                </button>
                <button
                  className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
                  onClick={() => {
                    application?.state == "pending"
                      ? updateState("approved", application.id)
                      : Swal.fire(
                          "Notification",
                          "Approved only while application is pending",
                          "info"
                        );
                  }}
                >
                  Approved
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ApplicationDetailPage;
