/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { JobModel } from "../../../models/JobModel";
import { EmployerModel } from "../../../models/EmployerModel";
import { employersAPI } from "../../../services";
import { EmployerItem, JobItem } from "../JobsPage/components";
import { ErrorBox, Pagination, Spinner } from "../../../components";

const FavoritePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [employers, setEmployers] = useState<EmployerModel[]>([]);

  const [jobs, setJobs] = useState<JobModel[]>([]);

  const [currentEmployerPage, setCurrentEmployerPage] = useState(1);
  const [employersPerPage] = useState(6);
  const [totalAmountOfEmployers, setTotalAmountOfEmployers] = useState(0);
  const [totalEmployerPages, setTotalEmployerPages] = useState(0);

  const [currentJobPage, setCurrentJobPage] = useState(1);
  const [jobsPerPage] = useState(6);
  const [totalAmountOfJobs, setTotalAmountOfJobs] = useState(0);
  const [totalJobPages, setTotalJobPages] = useState(0);

  //Get EmployerVIP
  useEffect(() => {
    const getEmployers = () => {
      employersAPI
        .getVipEmployers(currentEmployerPage - 1, employersPerPage)
        .then((res) => {
          setEmployers(res.data._embedded.employers);
          setTotalAmountOfEmployers(res.data.page.totalElements);
          setTotalEmployerPages(res.data.page.totalPages);
        })
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    getEmployers();
  }, [currentEmployerPage, employersPerPage]);

  // Get Job in local
  useEffect(() => {
    const getJobs = () => {
      const savedJobsString = localStorage.getItem("savedJobs") || "[]";
      const savedJobs = JSON.parse(savedJobsString);

      // Tính toán các giá trị liên quan đến phân trang công việc
      const startIndex = (currentJobPage - 1) * jobsPerPage;
      const endIndex = startIndex + jobsPerPage;

      const jobsToDisplay = savedJobs.slice(startIndex, endIndex);

      setJobs(jobsToDisplay);
      setTotalAmountOfJobs(savedJobs.length);
      setTotalJobPages(Math.ceil(savedJobs.length / jobsPerPage));
    };

    getJobs();
  }, [currentJobPage, jobs, jobsPerPage]);

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

  const paginateEmployer = (pageNumber: number) =>
    setCurrentEmployerPage(pageNumber);

  const paginateJobs = (pageNumber: number) => {
    setCurrentJobPage(pageNumber);
  };

  return (
    <>
      <section className="text-gray-700">
        <div className="px-3 py-6 sm:px-6 sm:py-10 ">
          <div className="flex justify-between w-full md:w-[95%] lg:w-full xl:w-[85%] mx-auto">
            <div className="w-full lg:w-8/12 ">
              <div className="w-full flex-row sm:flex  lg:justify-between py-3 pl-5 bg-white rounded-lg shadow-md ">
                <h1 className="text-lg sm:text-xl font-bold md:text-2xl  uppercase">
                  Công việc đã lưu:
                </h1>
              </div>
              {totalAmountOfJobs > 0 ? (
                <>
                  <ul className="">
                    {jobs.map((job) => (
                      <JobItem key={job.id} job={job} />
                    ))}
                  </ul>
                  <div className="flex justify-center sm:justify-between mt-8">
                    <div className="font-medium hidden sm:block">
                      <p>Hiện tối đa {jobsPerPage} công việc trên 1 trang:</p>
                    </div>
                    {totalJobPages > 0 && (
                      <Pagination
                        currentPage={currentJobPage}
                        totalPages={totalJobPages}
                        paginate={paginateJobs}
                        type={true}
                      />
                    )}
                  </div>
                </>
              ) : (
                <>
                  <ErrorBox text="Không có công việc nào được lưu" />
                </>
              )}
            </div>
            <div className="-mx-8 w-4/12 hidden lg:block">
              <div className="px-8">
                <h1 className="mb-5 text-xl font-bold py-3 pl-5 bg-white rounded-lg shadow-md">
                  Một số nhà tuyển dụng nổi bật:
                </h1>
                <div className="flex flex-col bg-white max-w-sm px-8 py-2 mx-auto rounded-lg shadow-lg">
                  {totalAmountOfEmployers > 0 ? (
                    <>
                      <ul className="">
                        {employers.map((employer) => (
                          <li
                            key={employer.id}
                            className="flex items-center py-4"
                          >
                            <EmployerItem employer={employer} />
                          </li>
                        ))}
                      </ul>
                      <div className="flex justify-center m-2">
                        {totalEmployerPages > 0 && (
                          <Pagination
                            currentPage={currentEmployerPage}
                            totalPages={totalEmployerPages}
                            paginate={paginateEmployer}
                            type={false}
                          />
                        )}
                      </div>
                    </>
                  ) : (
                    <ErrorBox text="Không có nhà tuyển dụng nổi bật nào" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default FavoritePage;
