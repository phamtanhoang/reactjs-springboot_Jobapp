/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ErrorBox, Spinner } from "../../../../../components";
import { jobsAPI } from "../../../../../services";
import { JobModel } from "../../../../../models/JobModel";

const PendingJobs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [jobs, setJobs] = useState<JobModel[]>([]);
  useEffect(() => {
    const fetchJobs = () => {
      jobsAPI
        .getPendingJobsByAdminToken(localStorage.getItem("adminToken") || "")
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
  });

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
    <div className="relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 w-full shadow-lg rounded">
      <div className="rounded-t mb-0 px-0 border-0">
        <div className="flex flex-wrap items-center px-4 py-2">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-base text-gray-900 ">
              Pending Jobs
            </h3>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-4 bg-gray-100  text-gray-500 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Title
                </th>
                <th className="px-4 bg-gray-100  text-gray-500 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  From Date
                </th>
                {/* <th className="px-4 bg-gray-100  text-gray-500  align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                  Action
                </th> */}
              </tr>
            </thead>
            <tbody>
              {jobs.length > 0 ? (
                jobs.map((job, i) => (
                  <tr className="text-gray-700" key={i}>
                    <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left">
                      {job.title}
                    </th>
                    <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                      {job.fromDate &&
                        new Date(job.fromDate).toLocaleDateString()}
                    </td>
                    {/* <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div className="flex items-center">
                        <span className="mr-2">70%</span>
                        <div className="relative w-full">
                          <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                            <div className="w-[70%] shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-600"></div>
                          </div>
                        </div>
                      </div>
                    </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    <div className="w-full p-5">
                      <ErrorBox text="There are no jobs pending.." />
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default PendingJobs;
