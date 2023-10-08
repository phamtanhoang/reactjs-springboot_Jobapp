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
import { ApplicationModel } from "../../../../../models/Application";
import ProfileAccountPage from "../ProfileAccountPage";
import { ApplicationDetailPage } from "..";

/* eslint-disable @typescript-eslint/no-explicit-any */
const TableApplicationsPage: React.FC<{ title: any }> = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [aplications, setApplications] = useState<ApplicationModel[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [totalAmountOfItems, setTotalAmountOfItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [showBoxProfileAccount, setShowBoxProfileAccount] = useState(false);
  const [showBoxApplicationDetail, setShowBoxApplicationDetail] =
    useState(false);

  useEffect(() => {
    const fetchApplications = () => {
      applicationsAPI
        .getApplicationsByEmployerToken(
          currentPage - 1,
          itemsPerPage,
          localStorage.getItem("employerToken") || ""
        )
        .then((res) => {
          setApplications(res.data);
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
      <div className="flex-grow w-5/6 sm:w-3/4 mx-auto my-10">
        <ErrorBox text={httpError} />
      </div>
    );
  }

  // const EditJob = (job: JobModel) => {
  //   setShowBoxEditJob(true);
  //   setEditJob(job);
  // };

  // const DeleteJob = (job: JobModel) => {
  //   Swal.fire({
  //     title: "Do you want to delete?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       // candidatesAPI
  //       //   .updateCandidate(firstName, lastName, dateOfBirth, sex, token)
  //       //   .then(() => {
  //       //     Swal.fire("Thành công!", "Chỉnh sửa thành công!", "success");
  //       //     window.location.reload();
  //       //   })
  //       //   .catch(() => {
  //       //     Swal.fire("Thất bại!", "Chỉnh sửa thất bại!", "error");
  //       //   });
  //     }
  //   });
  // };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="px-4 mx-auto pb-6">
        <div className="flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
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
                    {/* {totalAmountOfItems > 0 ? (
                      <> */}
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
                              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                              alt=""
                            />
                            <div>
                              <h2
                                className="text-sm font-semibold text-gray-800 dark:text-white hover:text-blue-600 cursor-pointer"
                                onClick={() => setShowBoxProfileAccount(true)}
                              >
                                Arthur Melo
                              </h2>
                              <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                                authurmelo@example.com
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
                          {application.jobId}
                          {new Date(application.jobId) < new Date() && (
                            <span className="text-red-500 ml-2">(Expired)</span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          {application.state == "pending" ? (
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-yellow-500 bg-yellow-100/60 ">
                              <AiOutlineExclamation />
                              <h2 className="text-sm font-normal">Pending</h2>
                            </div>
                          ) : application.state == "active" ? (
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 ">
                              <AiOutlineCheck />
                              <h2 className="text-sm font-normal">Active</h2>
                            </div>
                          ) : (
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-red-500 bg-red-100/60 ">
                              <AiOutlineClose />
                              <h2 className="text-sm font-normal">Refused</h2>
                            </div>
                          )}
                        </td>

                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-6 text-2xl text-gray-600">
                            <div
                              className=" cursor-pointer hover:text-yellow-500"
                              onClick={() => {
                                setShowBoxApplicationDetail(true);
                              }}
                            >
                              <AiFillEye />
                            </div>
                            <div className="cursor-pointer hover:text-blue-500">
                              <AiFillCheckCircle />
                            </div>
                            <div className="cursor-pointer hover:text-red-500">
                              <AiFillCloseCircle />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {/* </>
                    ) : (
                      <tr>
                        <td colSpan="6">
                          <div className="w-full p-5">
                            <ErrorBox text="There are no applications" />
                          </div>
                        </td>
                      </tr>
                    )} */}
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
          />
        )}
      </div>
      {showBoxProfileAccount && localStorage.getItem("employerToken") && (
        <ProfileAccountPage
          setShowBoxProfileAccount={setShowBoxProfileAccount}
        />
      )}
      {showBoxApplicationDetail && localStorage.getItem("employerToken") && (
        <ApplicationDetailPage
          setShowBoxApplicationDetail={setShowBoxApplicationDetail}
        />
      )}
    </>
  );
};
export default TableApplicationsPage;
