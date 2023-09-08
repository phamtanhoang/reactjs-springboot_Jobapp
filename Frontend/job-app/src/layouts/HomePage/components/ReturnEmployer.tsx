import React from "react";
import EmployerModel from "../../../models/EmployerModel";

export const ReturnEmployer: React.FC<{ employer: EmployerModel }> = (props) => {
  return (
    <div className="relative w-full  h-[180px] max-w-sm bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:shadow-orangetext/30">
      <a href="#">
        {props.employer.image ? (
          <img
            src={props.employer.image}
            className="p-8 rounded-t-lg"
            alt="employer"
          />
        ) : (
          <img
            src={require("https://res.cloudinary.com/dcpatkvcu/image/upload/v1692603983/DoAnNganh/google_yjj8ci.png")}
            className="p-8 rounded-t-lg"
            alt="employer"
          />
        )}
      </a>
      <div className="absolute px-5 pb-5 w-full text-center bottom-0">
        <a href="#">
          <h5 className="text-base font-medium tracking-tight text-gray-900 text-center">
            {props.employer.name}
          </h5>
        </a>
      </div>
    </div>
  );
};
