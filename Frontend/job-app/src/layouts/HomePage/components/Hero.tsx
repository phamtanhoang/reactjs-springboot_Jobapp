/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { AiOutlineSearch, AiOutlineEnvironment } from "react-icons/ai";
import JobModel from "../../../models/JobModel";
import { Spinner } from "../../../components/Spinner";
import { ErrorBox } from "../../../components/ErrorBox";
import Select from "react-select";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="flex py-6 lg:flex-row flex-col-reverse items-center bg-orangebackground">
      <div className="flex-auto lg:w-2/3 ">
        <div className="w-4/5 mx-auto md:w-full md:mx-0 lg:w-10/12 m-0 lg:mx-32">
          <h1 className="font-bold text-3xl lg:text-4xl">
            Tìm kiếm công việc <span className="text-orangetext">Trong mơ</span>{" "}
            của bạn
          </h1>
          <p className="text-base font-normal mt-4 text-neutral-500">
            Tại đây, bạn có thể tìm thấy những tin tuyển dụng việc làm với mức
            lương vô cùng hấp dẫn. Là nơi bạn có thể tìm những công việc việc có
            môi trường chuyên nghiệp, năng động, trẻ trung.
          </p>
          <h2 className="text-lg lg:text-xl font-medium mt-5 lg:mt-8 mb-2.5">
            Những công việc xu hướng:
          </h2>
          <div className="text-sm lg:text-lg text-orangetext flex font-medium mb-4">
            <a href="#" className="mr-2.5">
              Web Designers
            </a>
            <a href="#" className="mr-2.5">
              UI/UX Designer
            </a>
            <a href="#">Frontend</a>
          </div>

          <Link
            to="/home/jobs"
            className="text-base lg:text-sm  xl:text-base text-white px-8 py-2 rounded-full font-semibold bg-orangetext hover:outline-none hover:ring hover:ring-orangebackground  "
          >
            Tìm việc làm ngay!!!
          </Link>
        </div>
      </div>
      <div className="flex-auto lg:w-1/3 flex items-center justify-center">
        <img
          src="https://res.cloudinary.com/dcpatkvcu/image/upload/v1692603984/DoAnNganh/image-hero_cly9ur.png"
          alt=""
          className="w-5/6  ml-auto lg:w-full h-full object-cover"
        />
      </div>
    </section>
  );
};
