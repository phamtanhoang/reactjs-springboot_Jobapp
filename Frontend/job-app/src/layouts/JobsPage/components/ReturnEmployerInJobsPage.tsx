import React, { useContext } from "react";
import EmployerModel from "../../../models/EmployerModel";
import JobModel from "../../../models/JobModel";
import { JobContext } from "../JobsPage";

export const ReturnEmployerInJobPage: React.FC<{
  employer: EmployerModel;
}> = (props) => {
  const jobsContextData = useContext(JobContext);
  const jobs = jobsContextData?.allJob ?? [];

  const countJobsByEmployer = (employerId: string) => {
    const jobsCount = jobs.filter(
      (job: JobModel) => job.employerId === employerId
    ).length;
    return jobsCount;
  };

  // Sử dụng hàm để lấy số lượng công việc của nhà tuyển dụng
  const employerJobsCount = countJobsByEmployer(props.employer.id);

  return (
    <>
      <div className="w-1/5 items-center ">
        <img
          src={props.employer.image}
          alt="avatar"
          className="w-2/3 "
        />
      </div>
      <div className="w-4/5">
        <a
          href="#"
          className="text-gray-700 font-semibold hover:text-orangetext text-sm"
        >
          {props.employer.name}
          <span className="text-gray-700 text-xs font-light inline-block pl-1 \">
            ({employerJobsCount} công việc)
          </span>
        </a>
      </div>
    </>
  );
};
