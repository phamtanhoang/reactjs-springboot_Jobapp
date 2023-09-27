/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import { jobsAPI } from "../../../../../services";
import { JobModel } from "../../../../../models/JobModel";
import { ErrorBox, Pagination, Spinner } from "../../../../../components";
import { JobItem } from "../JobItem";

const TopJobs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [jobs, setJobs] = useState<JobModel[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(9);
  const [totalAmountOfJobs, setTotalAmountOfJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getJobs = () => {
      jobsAPI
        .getVipJobs(currentPage - 1, jobsPerPage)
        .then((res) => {
          setJobs(res.data._embedded.jobs);
          setTotalAmountOfJobs(res.data.page.totalElements);
          setTotalPages(res.data.page.totalPages);
        })
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    getJobs();
  }, [currentPage, jobsPerPage]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setJobsPerPage(4);
      } else if (window.innerWidth < 1024) {
        setJobsPerPage(6);
      } else {
        setJobsPerPage(9);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <section className="py-12">
      <div className="w-10/12 m-auto">
        <div className="flex justify-center">
          <div className="max-w-[800px] text-center">
            <h2 className="mb-4 text-3xl font-semibold">Việc làm nổi bật</h2>
            <p className="mb-10 text-neutral-500">
              Hãy cùng khám phá các công việc tại đây và bắt đầu hành trình mới
              của bạn ngay hôm nay!
            </p>
          </div>
        </div>
        {totalAmountOfJobs > 0 ? (
          <>
            <div className="grid gap-x-5 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <JobItem job={job} key={job.id} />
              ))}
            </div>
            <div className="flex justify-center mt-5">
              {totalPages > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  paginate={paginate}
                  type={false}
                />
              )}
            </div>
          </>
        ) : (
          <div className="mt-5">
            <ErrorBox text="Không có công việc nổi bật nào" />
          </div>
        )}
      </div>
    </section>
  );
};
export default TopJobs;
