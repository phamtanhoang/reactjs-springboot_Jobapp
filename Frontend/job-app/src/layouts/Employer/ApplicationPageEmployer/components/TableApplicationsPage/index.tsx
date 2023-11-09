/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { applicationsAPI } from "../../../../../services";
import { ErrorBox, PaginationAdmin, Spinner } from "../../../../../components";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillEye,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineExclamation,
} from "react-icons/ai";
import ProfileAccountPage from "../ProfileAccountPage";
import { ApplicationDetailPage } from "..";
import { ApplicationResponseModel } from "../../../../../models/ApplicationResponseModel";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

/* eslint-disable @typescript-eslint/no-explicit-any */
const TableApplicationsPage: React.FC<{ title: any }> = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [aplications, setApplications] = useState<ApplicationResponseModel[]>(
    []
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [totalAmountOfItems, setTotalAmountOfItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [showBoxProfileAccount, setShowBoxProfileAccount] = useState(false);
  const [showBoxApplicationDetail, setShowBoxApplicationDetail] =
    useState(false);

  const [accountID, setAccountID] = useState("");
  const [application, setApplication] = useState<ApplicationResponseModel>();

  useEffect(() => {
    const fetchApplications = () => {
      applicationsAPI
        .getApplicationsByEmployerToken(
          props.title,
          currentPage - 1,
          itemsPerPage,
          localStorage.getItem("employerToken") || ""
        )
        .then((res) => {
          setApplications(res.data.content);
          setTotalAmountOfItems(res.data.totalElements);
          setTotalPages(res.data.totalPages);
        })
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchApplications();
  }, [currentPage, itemsPerPage, props.title]);

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
          const waitingPopup: any = Swal.fire({
            title: "Waiting...",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          applicationsAPI
            .updateState(
              state,
              applicationId,
              localStorage.getItem("employerToken") || ""
            )
            .then(() => {
              waitingPopup.close();
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
            }).catch(() => {
              waitingPopup.close();
              Swal.fire("Error!", `${state} application fail`, "error");
            });
        }
      });
    } else {
      Swal.fire("Error!", "Some thing went wrong", "error");
    }
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="px-3 md:px-6 mx-auto">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full lign-middle">
              <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 cursor-default">
                  <thead className="bg-gray-50 ">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-600 "
                      >
                        S.No
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-600 "
                      >
                        Candidate
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-600 "
                      >
                        Apply Date
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-600 "
                      >
                        Job
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-600 "
                      >
                        State
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-600 "
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 ">
                    {totalAmountOfItems > 0 ? (
                      <>
                        {aplications.map((application, i) => (
                          <tr key={i}>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 ">
                              <div className="inline-flex items-center gap-x-3">
                                <span>#{i}</span>
                              </div>
                            </td>

                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              <div className="flex items-center gap-x-2">
                                <img
                                  className="object-cover w-8 h-8 rounded-full"
                                  src={
                                    application.image
                                      ? application.image
                                      : "https://res.cloudinary.com/dcpatkvcu/image/upload/v1695807392/DoAnNganh/non-user_lctzz5.jpg"
                                  }
                                  alt="logo"
                                />
                                <div>
                                  <h2
                                    className="text-sm font-semibold text-gray-800 dark:text-white hover:text-blue-600 cursor-pointer"
                                    onClick={() => {
                                      setAccountID(application.accountId);
                                      setShowBoxProfileAccount(true);
                                    }}
                                  >
                                    {application.accountName}
                                  </h2>
                                  <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                                    {application.userName}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="px-4 py-4 text-sm text-gray-600 ">
                              {application.applyDate &&
                                new Date(
                                  application.applyDate
                                ).toLocaleDateString()}
                            </td>

                            <td className="px-4 py-4 text-sm text-gray-600 ">
                              <Link
                                to={`/employer/job/${application.jobId}`}
                                className="hover:text-blue-600"
                              >
                                {application.title}
                              </Link>
                              {new Date(application.expiredDate) <
                                new Date() && (
                                <span className="text-red-500 ml-2">
                                  (Expired)
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              {application.state == "pending" ? (
                                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-yellow-500 bg-yellow-100/60 ">
                                  <AiOutlineExclamation />
                                  <h2 className="text-sm font-normal">
                                    Pending
                                  </h2>
                                </div>
                              ) : application.state == "approved" ? (
                                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 ">
                                  <AiOutlineCheck />
                                  <h2 className="text-sm font-normal">
                                    Approved
                                  </h2>
                                </div>
                              ) : (
                                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-red-500 bg-red-100/60 ">
                                  <AiOutlineClose />
                                  <h2 className="text-sm font-normal">
                                    Refused
                                  </h2>
                                </div>
                              )}
                            </td>

                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center gap-x-6 text-2xl text-gray-600">
                                <div
                                  className=" cursor-pointer hover:text-yellow-500"
                                  onClick={() => {
                                    setShowBoxApplicationDetail(true);
                                    setApplication(application);
                                  }}
                                >
                                  <AiFillEye />
                                </div>
                                <div
                                  className="cursor-pointer hover:text-blue-500"
                                  onClick={() => {
                                    application.state == "pending"
                                      ? updateState("approved", application.id)
                                      : Swal.fire(
                                          "Notification",
                                          "Approved only while application is pending",
                                          "info"
                                        );
                                  }}
                                >
                                  <AiFillCheckCircle />
                                </div>
                                <div
                                  className="cursor-pointer hover:text-red-500"
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
                                  <AiFillCloseCircle />
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td colSpan={6}>
                          <div className="w-full p-5">
                            <ErrorBox text="There are no applications" />
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {totalPages > 0 && (
          <PaginationAdmin
            paginate={paginate}
            currentPage={currentPage}
            totalPages={totalPages}
            type={false}
          />
        )}
      </div>
      {showBoxProfileAccount && localStorage.getItem("employerToken") && (
        <ProfileAccountPage
          setShowBoxProfileAccount={setShowBoxProfileAccount}
          accountID={accountID}
        />
      )}
      {showBoxApplicationDetail && localStorage.getItem("employerToken") && (
        <ApplicationDetailPage
          setShowBoxApplicationDetail={setShowBoxApplicationDetail}
          application={application}
        />
      )}
    </>
  );
};
export default TableApplicationsPage;
