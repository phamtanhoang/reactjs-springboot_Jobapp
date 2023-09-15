import React, { useContext } from "react";
import CategoryModel from "../../../models/CategoryModel";
import JobModel from "../../../models/JobModel";
import { JobContext } from "../JobsPage";

export const ReturnCategoryInJobsPage: React.FC<{ category: CategoryModel }> = (
  props
) => {
  const jobsContextData = useContext(JobContext);
  const jobs = jobsContextData?.allJob ?? [];

  const countJobsByCategory = (categoryId: string) => {
    const jobsCount = jobs.filter(
      (job: JobModel) => job.categoryId === categoryId
    ).length;
    return jobsCount;
  };

  return (
    <>
      <div className="w-1/4 items-center">
        <img
          src={props.category.image}
          alt="avatar"
          className="w-5/12 object-cover mx-auto"
        />
      </div>
      <div className="w-3/4">
        <a
          href="#"
          className="text-gray-700 font-medium hover:text-orangetext text-sm"
        >
          {props.category.name}
          <span className="text-gray-700 text-xs font-light inline-block pl-1">
            ({categoryJobsCount} công việc)
          </span>
        </a>
      </div>
    </>
  );
};
