import React from "react";
import { EmployerModel } from "../../../../../models/EmployerModel";

export const EmployerItem: React.FC<{ employer: EmployerModel }> = (props) => {
  return (
    <div className="group w-full h-[150px] max-w-sm bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:shadow-orangetext/30">
      <div className="flex justify-center items-center rounded-t-lg h-[60%]">
        <img
          src={
            props.employer.image
              ? props.employer.image
              : "https://res.cloudinary.com/dcpatkvcu/image/upload/v1695807392/DoAnNganh/non-user_lctzz5.jpg"
          }
          className="w-[20%] h-auto"
          alt="employer"
        />
      </div>

      <div className="px-5  w-full text-center bottom-0">
        <a href="#">
          <h5 className="text-sm md:text-base font-medium tracking-tight text-gray-900 text-center group-hover:text-orangetext">
            {props.employer.name}
          </h5>
        </a>
      </div>
    </div>
  );
};
