import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EmployerModel } from "../../../../models/EmployerModel";
import { jobsAPI } from "../../../../services";

const EmployerItem: React.FC<{
  employer: EmployerModel;
}> = (props) => {
  const [jobCount, setJobCount] = useState(0);

  useEffect(() => {
    const fetchJobCountByCategory = async () => {
      try {
        const response = await jobsAPI.getJobsByEmployerId(props.employer.id);
        setJobCount(response.data._embedded.jobs.length);
      } catch (error) {
        console.error("Lỗi khi đếm số công việc:", error);
        setJobCount(0);
      }
    };
    fetchJobCountByCategory();
  }, [props.employer.id]);

  return (
    <>
      <div className="w-1/5 items-center ">
        <img src={props.employer.image} alt="avatar" className="w-2/3 " />
      </div>
      <div className="w-4/5">
        <Link
          to={`/home/employer/${props.employer?.id}`}
          className="text-gray-700 font-semibold hover:text-orangetext text-sm"
        >
          {props.employer.name}
          <span className="text-gray-700 text-xs font-light inline-block pl-1 \">
            ({jobCount} công việc)
          </span>
        </Link>
      </div>
    </>
  );
};
export default EmployerItem;
