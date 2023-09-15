/* eslint-disable @typescript-eslint/no-explicit-any */
import JobModel from "../../../models/JobModel";
import EmployerModel from "../../../models/EmployerModel";
import { AiFillHeart } from "react-icons/ai";

export const ReturnJobInJobsPage: React.FC<{
  job: JobModel;
  employer?: EmployerModel;
}> = (props) => {
  const calculateDaysRemaining = (toDate: string) => {
    const currentDate = new Date() as any; // Ngày hiện tại
    const targetDate = new Date(toDate) as any; // Chuyển đổi chuỗi toDate thành đối tượng Date

    // Tính số mili giây còn lại giữa ngày đích và ngày hiện tại
    const timeRemaining = targetDate - currentDate;

    // Chuyển đổi số mili giây thành số ngày và làm tròn xuống
    const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

    return daysRemaining;
  };

  return (
    <div className="max-full px-4 py-2 sm:px-10 sm:py-4 bg-white rounded-lg shadow-md flex my-4">
      <div className="w-1/4 sm:w-1/5 flex items-center">
        <img
          src={props.employer?.image}
          alt="avatar"
          className="w-[90%] object-cover p-1 md:p-4"
        />
      </div>

      <div className="w-3/4 sm:w-4/5">
        <div className="flex justify-between items-center">
          <span className="font-light text-xs md:text-sm text-neutral-500">
            Còn {calculateDaysRemaining(props.job.toDate)} ngày
          </span>
          <div className="cursor-pointer text-neutral-500 hover:text-red-600">
            <AiFillHeart className="w-8 h-8" />
          </div>
        </div>
        <div className="mt-1">
          <div>
            <p className=" text-gray-700 font-bold hover:text-orangetext text-base md:text-lg truncate cursor-pointer">
              {props.job.title}
            </p>
          </div>
          <div className="mt-1">
            <p className="text-gray-600 text-sm md:text-base truncate cursor-pointer">
              {props.employer?.name}
            </p>
          </div>
          <div className="flex mt-4">
            <div className="bg-[#f4f5f5] text-xs md:text-sm text-gray-600 py-1 px-2 rounded-md cursor-default">
              {props.job.salary}
            </div>
            <div className="bg-[#f4f5f5] text-xs md:text-sm text-gray-600 py-1 px-2 ml-4 rounded-md cursor-default">
              {props.job.address}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
