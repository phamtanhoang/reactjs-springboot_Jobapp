import { AiFillHeart } from "react-icons/ai";
import { JobModel } from "../../../../../models/JobModel";
import { useEffect, useState } from "react";
import { employersAPI } from "../../../../../services";
import { EmployerModel } from "../../../../../models/EmployerModel";

export const JobItem: React.FC<{ job?: JobModel }> = (props) => {
  const [employer, setEmployer] = useState<EmployerModel>();

  useEffect(() => {
    const getEmployer = () => {
      employersAPI.getEmployerById(props.job?.employerId).then((res) => {
        setEmployer(res.data);
      });
    };
    getEmployer();
  }, [props.job?.employerId]);

  return (
    <div className="group bg-white border-gray-200 border-2 rounded-lg p-5 hover:border-orangetext hover:bg-[#f4f5f5]">
      <div className="flex">
        <div className="w-1/4 flex justify-center items-center">
          <img
            src={employer?.image}
            alt="logo-company"
            className="w-2/3"
          />
        </div>
        <div className="w-3/4 ml-2 grow">
          <p className="mb-1 font-semibold text-sm xl:text-base truncate overflow-ellipsis group-hover:text-orangetext cursor-pointer">
            {props.job?.title}
          </p>
          <p className="text-neutral-500 text-xs xl:text-sm truncate overflow-ellipsis cursor-pointer">
            {employer?.name}
          </p>
        </div>
      </div>
      <div className="flex mt-4">
        <div className="flex w-11/12 justify-items-start mr-3">
          <div className="bg-[#f4f5f5] text-xs xl:text-sm text-[#212f3f] py-1 px-2 mx-2 rounded-md max-w-[115px] lg:max-w-[62px]  xl:max-w-[1000px]  overflow-hidden whitespace-nowrap overflow-ellipsis cursor-default">
            {props.job?.salary}
          </div>

          <div className="bg-[#f4f5f5] text-xs xl:text-sm text-[#212f3f] py-1 px-2 rounded-md max-w-[115px] lg:max-w-[62px] xl:max-w-[100px] overflow-hidden whitespace-nowrap overflow-ellipsis cursor-default">
            {props.job?.address}
          </div>
        </div>
        <div className="w-1/12 cursor-pointer text-neutral-500 hover:text-red-600">
          <AiFillHeart className="w-6 h-6 xl:w-8 xl:h-8" />
        </div>
      </div>
    </div>
  );
};
