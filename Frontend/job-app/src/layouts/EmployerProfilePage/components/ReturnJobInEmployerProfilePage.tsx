/* eslint-disable @typescript-eslint/no-explicit-any */
import { AiFillHeart } from "react-icons/ai";
import {
  HiOutlineCurrencyDollar,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import JobModel from "../../../models/JobModel";

export const ReturnJobInEmployerProfilePage: React.FC<{
  job: JobModel;
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
    <div className="w-full">
      <div className="flex justify-between items-center">
        <span className="font-light text-xs md:text-sm text-neutral-500">
          Còn {calculateDaysRemaining(props.job.toDate)} ngày
        </span>
        <div className="cursor-pointer text-neutral-500 hover:text-red-600">
          <AiFillHeart className="w-7 h-7" />
        </div>
      </div>
      <Link
        to={`/home/job/${props.job.id}`}
        className="font-semibold text-lg hover:text-orangetext"
      >
        {props.job.title}
      </Link>
      <div className="mt-2 flex">
        <div className="flex mr-3 xl:mr-5">
          <HiOutlineLocationMarker className="text-lg mr-1" />
          <p className="text-sm">{props.job.address}</p>
        </div>
        <div className="flex">
          <HiOutlineCurrencyDollar className="text-lg mr-1" />
          <p className="text-sm">{props.job.salary}</p>
        </div>
      </div>
    </div>
  );
};
