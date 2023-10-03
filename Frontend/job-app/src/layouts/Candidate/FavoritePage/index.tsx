/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { JobModel } from "../../../models/JobModel";
import { EmployerModel } from "../../../models/EmployerModel";
import { employersAPI } from "../../../services";
import { EmployerItem, JobItem } from "../JobsPage/components";
import { ErrorBox, Pagination, Spinner } from "../../../components";

export const FavoritePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [employers, setEmployers] = useState<EmployerModel[]>([]);

  const [jobs, setJobs] = useState<JobModel[]>([]);

  const [currentEmployerPage, setCurrentEmployerPage] = useState(1);
  const [employersPerPage] = useState(6);
  const [totalAmountOfEmployers, setTotalAmountOfEmployers] = useState(0);
  const [totalEmployerPages, setTotalEmployerPages] = useState(0);

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

  // Get Job in session
  const savedJobs = JSON.parse(sessionStorage.getItem("savedJobs") || "[]");
  useEffect(() => {
    
    setJobs(savedJobs);
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
      <div className="flex-grow w-5/6 sm:w-3/4 mx-auto my-10">
        <ErrorBox text={httpError} />
      </div>
    );
  }

  const paginateEmployer = (pageNumber: number) =>
    setCurrentEmployerPage(pageNumber);

  return (
    <>
      <section className="text-gray-700">
        <div className="px-6 py-10 ">
          <div className="flex justify-between w-full md:w-[95%] lg:w-full xl:w-[85%] mx-auto">
            <div className="w-full lg:w-8/12">
              <div className="w-full flex-row sm:flex text-center lg:justify-between ">
                <h1 className="text-lg sm:text-xl font-bold md:text-2xl mb-5 uppercase">
                  Công việc đã lưu
                </h1>
              </div>
              {jobs.length > 0 ? (
                <>
                  {jobs.map((job) => (
                    <JobItem key={job.id} job={job} />
                  ))}
                </>
              ) : (
                <>
                  <ErrorBox text="Không có công việc nào được lưu" />
                </>
              )}
            </div>
            <div className="-mx-8 w-4/12 hidden lg:block">
              <div className="px-8">
                <h1 className="mb-4 mt-2 text-xl font-bold">
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
