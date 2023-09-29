/* eslint-disable @typescript-eslint/no-explicit-any */
import { AiFillHeart } from "react-icons/ai";
import {
  HiOutlineCurrencyDollar,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { JobModel } from "../../../../../models/JobModel";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const JobItem: React.FC<{
  job: JobModel;
}> = (props) => {
  const [isJobSaved, setIsJobSaved] = useState(false);

  useEffect(() => {
    const savedJobs = JSON.parse(sessionStorage.getItem("savedJobs") || "[]");
    const isSaved = savedJobs.some(
      (savedJob: any) => savedJob.id === props.job?.id
    );

    if (isSaved) {
      setIsJobSaved(true);
    }
  }, [props.job]);

  const handleSaveJob = () => {
    if (!isJobSaved) {
      const savedJobs = JSON.parse(sessionStorage.getItem("savedJobs") || "[]");
      savedJobs.push(props.job);
      sessionStorage.setItem("savedJobs", JSON.stringify(savedJobs));
      setIsJobSaved(true);
      Swal.fire("Thành công!", "Lưu công việc thành công", "success");
    } else {
      Swal.fire({
        title: "Bạn có muốn bỏ lưu không?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý",
      }).then((result) => {
        if (result.isConfirmed) {
          const savedJobs = JSON.parse(
            sessionStorage.getItem("savedJobs") || "[]"
          );
          const updatedSavedJobs = savedJobs.filter(
            (savedJob: any) => savedJob.id !== props.job?.id
          );
          sessionStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
          setIsJobSaved(false);
        }
      });
    }
  };

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
        <div
          className={`cursor-pointer text-neutral-500 hover:text-red-600 ${
            isJobSaved ? "text-red-600" : ""
          }`}
          onClick={handleSaveJob}
        >
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
