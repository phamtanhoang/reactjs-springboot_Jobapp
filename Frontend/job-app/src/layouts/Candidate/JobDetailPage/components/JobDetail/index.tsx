import { BsCalendarCheck, BsCalendarX } from "react-icons/bs";
import { JobModel } from "../../../../../models/JobModel";
import { BiCategoryAlt } from "react-icons/bi";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import { CategoryModel } from "../../../../../models/CategoryModel";
import { useEffect, useState } from "react";
import { categoriesAPI } from "../../../../../services";

export const JobDetail: React.FC<{ job?: JobModel }> = (props) => {
  const [cate, setCate] = useState<CategoryModel>();

  useEffect(() => {
    categoriesAPI.getCategoryByID(props.job?.categoryId || "").then((res) => {
      setCate(res.data);
    });
  });

  return (
    <div className="w-full sm:w-[90%] lg:w-[95%] xl:w-[80%] mx-auto my-4 bg-white rounded-lg p-5 flex md:flex-row flex-col-reverse gap-5 text-sm md:text-base">
      <div
        className="w-full md:w-[55%] lg:w-[65%]"
        dangerouslySetInnerHTML={{
          __html: props.job?.description || "",
        }}
      />
      <div className="w-full md:w-[45%] lg:w-[35%]">
        <div className="w-full border border-orangetext bg-[#fff4e9] rounded-lg">
          <ul className="px-5 py-2">
            <li className="flex border-[#949697] border-b-2 py-4">
              <div className="w-[20%]">
                <BsCalendarCheck className="text-[30px] sm:text-[35px] mx-auto items-center" />
              </div>
              <div className="w-[80%] text-xs">
                <h5 className="text-[#949697] font-light">NGÀY ĐĂNG TUYỂN</h5>
                <p className="mt-1 text-sm">
                  {props.job?.fromDate &&
                    new Date(props.job?.fromDate).toLocaleDateString()}
                </p>
              </div>
            </li>
            <li className="flex border-[#949697] border-b-2 py-4">
              <div className="w-[20%]">
                <BsCalendarX className="text-[30px] sm:text-[35px] mx-auto items-center" />
              </div>
              <div className="w-[80%] text-xs">
                <h5 className="text-[#949697] font-light">NGÀY KẾT THÚC</h5>
                <p className="mt-1 text-sm">
                  {props.job?.toDate &&
                    new Date(props.job?.toDate).toLocaleDateString()}
                </p>
              </div>
            </li>
            <li className="flex border-[#949697] border-b-2 py-4">
              <div className="w-[20%]">
                <BiCategoryAlt className="text-[30px] sm:text-[35px] mx-auto items-center" />
              </div>
              <div className="w-[80%] text-xs">
                <h5 className="text-[#949697] font-light">LOẠI CÔNG VIỆC</h5>
                <p className="mt-1 text-sm">{cate?.name}</p>
              </div>
            </li>
            <li className="flex border-[#949697] border-b-2 py-4">
              <div className="w-[20%]">
                <AiOutlineDollarCircle className="text-[30px] sm:text-[35px] mx-auto items-center" />
              </div>
              <div className="w-[80%] text-xs">
                <h5 className="text-[#949697] font-light">MỨC LƯƠNG</h5>
                <p className="mt-1 text-sm">{props.job?.salary}</p>
              </div>
            </li>
            <li className="flex py-3">
              <div className="w-[20%]">
                <FiMapPin className="text-[30px] sm:text-[35px] mx-auto items-center" />
              </div>
              <div className="w-[80%] text-xs">
                <h5 className="text-[#949697] font-light">ĐỊA ĐIỂM</h5>
                <p className="mt-1 text-sm">{props.job?.address}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
