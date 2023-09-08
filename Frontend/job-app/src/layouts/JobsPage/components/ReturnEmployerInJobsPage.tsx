import { useContext } from "react";
import EmployerModel from "../../../models/EmployerModel";
import { AppContext } from "../JobsPage";
import JobModel from "../../../models/JobModel";

export const ReturnEmployerInJobPage: React.FC<{
  employer: EmployerModel;
}> = (props) => {
    
  const { jobs } = useContext(AppContext);

  // Xác định kiểu dữ liệu cho employerId
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
      <div className="w-1/4 items-center">
        <img
          src={props.employer.image}
          alt="avatar"
          className="w-5/6 object-cover"
        />
      </div>
      <div className="w-3/4">
        <a
          href="#"
          className="text-gray-700 font-medium hover:text-orangetext text-sm"
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
