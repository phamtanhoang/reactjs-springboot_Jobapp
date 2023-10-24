/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jobsAPI } from "../../../../../services";
import { PopularJob } from "../../../../../models/PopularJobsModel";
import { ErrorBox, Spinner } from "../../../../../components";

const PopularJobs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [jobs, setJobs] = useState<PopularJob[]>([]);
  useEffect(() => {
    const fetchJobs = () => {
      jobsAPI
        .getPopularJobs(localStorage.getItem("employerToken") || "")
        .then((res) => {
          setJobs(res.data.content);
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
  return (
    <div className="w-full xl:w-1/3 px-3">
      <p className="text-xl font-semibold mb-4">Popular jobs</p>
      <div className="w-full bg-white border rounded-lg p-4">
        {jobs.length > 0 ? (
          jobs.map((job, i) => (
            <div
              className="w-full bg-gray-100 border rounded-lg flex justify-between items-center px-4 py-2 my-2"
              key={i}
            >
              <div>
                <div className="flex items-center">
                  <Link
                    to={`/employer/job/${job.id}`}
                    className="font-semibold text-lg hover:text-blue-500 truncate max-w-[180px] sm:max-w-[450px]  lg:max-w-[180px]"
                  >
                    {job.title}
                  </Link>
                </div>
                <p className="truncate max-w-[180px] sm:max-w-[450px]  lg:max-w-[180px]">
                  {job.categoryName}
                </p>
              </div>
              <span className="text-blue-500 font-semibold text-lg">
                {job.applyCount} apply
              </span>
            </div>
          ))
        ) : (
          <ErrorBox text="There are no jobs..." />
        )}
      </div>
    </div>
  );
};
export default PopularJobs;
