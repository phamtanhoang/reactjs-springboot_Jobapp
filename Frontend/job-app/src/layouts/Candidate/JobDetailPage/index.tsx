/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { JobModel } from "../../../models/JobModel";
import { ErrorBox, Spinner } from "../../../components";

import { EmployerInfo, JobDetail, JobInfo } from "./components";
import { TopEmployers } from "../HomePage/components";
import { jobsAPI } from "../../../services";

export const JobProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [job, setJob] = useState<JobModel>();

  const jobId = window.location.pathname.split("/")[3];

  useEffect(() => {
    const getJob = () => {
      jobsAPI
        .getJobById(jobId)
        .then((res) => {
          setJob(res.data);
        })
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    getJob();
  }, [jobId]);

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

  return (
    <>
      <section className="text-gray-700">
        <div className="px-6 pt-10">
          <div className="w-full">
            <h1 className="text-lg sm:text-xl font-bold md:text-2xl mb-5 text-center uppercase">
              Thông tin tuyển dụng
            </h1>
          </div>
          <div className="w-full sm:w-[90%] lg:w-[95%] xl:w-[80%] mx-auto flex my-4 gap-5">
            <JobInfo job={job} />
            <EmployerInfo job={job} />
          </div>
          <JobDetail job={job} />
        </div>
      </section>
      <TopEmployers />
    </>
  );
};
