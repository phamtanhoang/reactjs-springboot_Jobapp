/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { ErrorBox, Spinner } from "../../../../../components";
import { useEffect, useState } from "react";
import { PopularJob } from "../../../../../models/PopularJobsModel";
import { jobsAPI } from "../../../../../services";

const PendingJobs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [jobs, setJobs] = useState<PopularJob[]>([]);
  useEffect(() => {
    const fetchJobs = () => {
      jobsAPI
        .getPendingJobsByEmployerToken(
          localStorage.getItem("employerToken") || ""
        )
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
      <p className="text-xl font-semibold mb-4">Pending job</p>
      <div className="w-full bg-white border rounded-lg p-4 mb-8 xl:mb-0">
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
                    className="font-semibold text-lg hover:text-blue-500"
                  >
                    {job.title}
                  </Link>
                </div>
                <p>{job.categoryName}</p>
              </div>
            </div>
          ))
        ) : (
          <ErrorBox text="There are no jobs..." />
        )}
      </div>
    </div>
  );
};
export default PendingJobs;
