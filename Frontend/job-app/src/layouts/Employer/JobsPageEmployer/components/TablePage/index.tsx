import { useEffect, useState } from "react";
import { JobModel } from "../../../../../models/JobModel";
import { jobsAPI } from "../../../../../services";
import { ErrorBox, PaginationAdmin, Spinner } from "../../../../../components";
import {
  AiFillDelete,
  AiFillEdit,
  AiFillEye,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineExclamation,
} from "react-icons/ai";
import { EditJobPage } from "..";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

/* eslint-disable @typescript-eslint/no-explicit-any */
const TablePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [jobs, setJobs] = useState<JobModel[]>([]);

  const [editJob, setEditJob] = useState<JobModel>();

  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(6);
  const [totalAmountOfJobs, setTotalAmountOfJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [showBoxEditJob, setShowBoxEditJob] = useState(false);

  useEffect(() => {
    const fetchJobs = () => {
      jobsAPI
        .getJobsEmployerToken(
          localStorage.getItem("employerToken") || "",
          currentPage - 1,
          jobsPerPage
        )
        .then((res) => {
          setJobs(res.data.content);
          setTotalAmountOfJobs(res.data.totalElements);
          setTotalPages(res.data.totalPages);
        })
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchJobs();
  }, [currentPage, jobsPerPage]);

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

  const EditJob = (job: JobModel) => {
    setShowBoxEditJob(true);
    setEditJob(job);
  };

  const DeleteJob = (job: JobModel) => {
    Swal.fire({
      title: "Do you want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        // candidatesAPI
        //   .updateCandidate(firstName, lastName, dateOfBirth, sex, token)
        //   .then(() => {
        //     Swal.fire("Thành công!", "Chỉnh sửa thành công!", "success");
        //     window.location.reload();
        //   })
        //   .catch(() => {
        //     Swal.fire("Thất bại!", "Chỉnh sửa thất bại!", "error");
        //   });
      }
    });
  };

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
                        Title
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
                        From Date
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-600 "
                      >
                        To Date
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
                    {totalAmountOfJobs > 0 ? (
                      <>
                        {jobs.map((job, i) => (
                          <tr key={i}>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 ">
                              <div className="inline-flex items-center gap-x-3">
                                <span>#{i}</span>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-600 ">
                              {job.title}
                            </td>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              {job.state == "0" ? (
                                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-yellow-500 bg-yellow-100/60 ">
                                  <AiOutlineExclamation />
                                  <h2 className="text-sm font-normal">
                                    Pending
                                  </h2>
                                </div>
                              ) : job.state == "1" ? (
                                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 ">
                                  <AiOutlineCheck />
                                  <h2 className="text-sm font-normal">
                                    Active
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
                            <td className="px-4 py-4 text-sm text-gray-600 ">
                              {job.fromDate}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-600 ">
                              {job.toDate}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center gap-x-6 text-2xl text-gray-600">
                                <Link to={`/employer/job/${job.id}`}>
                                  <AiFillEye className=" cursor-pointer hover:text-yellow-500" />
                                </Link>

                                <AiFillEdit
                                  className=" cursor-pointer hover:text-blue-500"
                                  onClick={() => {
                                    job.state != "2"
                                      ? EditJob(job)
                                      : Swal.fire(
                                          "Notification",
                                          "Cannot be edited!",
                                          "info"
                                        );
                                  }}
                                />

                                <AiFillDelete
                                  className=" cursor-pointer hover:text-red-500"
                                  onClick={() => DeleteJob(job)}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td colSpan="6">
                          <div className="w-full p-5">
                            <ErrorBox text="Không có công việc nào" />
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
        <PaginationAdmin
          paginate={paginate}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
      {showBoxEditJob && localStorage.getItem("employerToken") && (
        <EditJobPage setShowBoxEditJob={setShowBoxEditJob} job={editJob} />
      )}
    </>
  );
};
export default TablePage;
