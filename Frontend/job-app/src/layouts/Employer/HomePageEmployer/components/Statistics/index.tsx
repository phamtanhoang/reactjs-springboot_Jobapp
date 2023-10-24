/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { applicationsAPI, jobsAPI } from "../../../../../services";
import { ErrorBox, Spinner } from "../../../../../components";

const Statistics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [countAllJob, setCountAllJob] = useState(0);
  const [countAllApplication, setCountAllApplication] = useState(0);
  const [countPendingJob, setCountPendingJob] = useState(0);
  const [countPendingApplication, setCountPendingApplication] = useState(0);

  useEffect(() => {
    const fetchAllJob = () => {
      setIsLoading(true);
      jobsAPI
        .getAllJobByEmployerToken(
          localStorage.getItem("employerToken") || "",
          ""
        )
        .then((res) => {
          setCountAllJob(res.data.totalElements);
        })
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchAllJob();

    const fetchAllApplication = () => {
      setIsLoading(true);
      applicationsAPI
        .getAllApplicationByEmployerToken(
          localStorage.getItem("employerToken") || "",
          ""
        )
        .then((res) => {
          setCountAllApplication(res.data.totalElements);
        })
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchAllApplication();

    const fetchPendingJob = () => {
      setIsLoading(true);
      jobsAPI
        .getPendingJobsByEmployerToken(
          localStorage.getItem("employerToken") || ""
        )
        .then((res) => {
          setCountPendingJob(res.data.totalElements);
        })
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchPendingJob();

    const fetchPendingApplication = () => {
      setIsLoading(true);
      applicationsAPI
        .getPendingApplicationsByEmployerToken(
          localStorage.getItem("employerToken") || ""
        )
        .then((res) => {
          setCountPendingApplication(res.data.totalElements);
        })
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchPendingApplication();
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
    <div className="flex flex-wrap -mx-3 mb-20">
      <div className="w-1/2 xl:w-1/4 px-3">
        <div className="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0">
          <div className="text-gray-700">
            <p className="font-semibold text-3xl">{countAllJob}</p>
            <p>All job</p>
          </div>
        </div>
      </div>
      <div className="w-1/2 xl:w-1/4 px-3">
        <div className="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0">
          <div className="text-gray-700">
            <p className="font-semibold text-3xl">{countPendingJob}</p>
            <p>Pending jobs</p>
          </div>
        </div>
      </div>
      <div className="w-1/2 xl:w-1/4 px-3">
        <div className="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6">
          <div className="text-gray-700">
            <p className="font-semibold text-3xl">{countAllApplication}</p>
            <p>All application</p>
          </div>
        </div>
      </div>
      <div className="w-1/2 xl:w-1/4 px-3">
        <div className="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6">
          <div className="text-gray-700">
            <p className="font-semibold text-3xl">{countPendingApplication}</p>
            <p>Pending applications</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Statistics;
