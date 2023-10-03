/* eslint-disable @typescript-eslint/no-explicit-any */
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { EmployerModel } from "../../../../../models/EmployerModel";
import { JobModel } from "../../../../../models/JobModel";
import { employersAPI } from "../../../../../services";
import Swal from "sweetalert2";

const JobItem: React.FC<{
  job: JobModel;
}> = (props) => {
  const [employer, setEmPloyer] = useState<EmployerModel>();
  const [isJobSaved, setIsJobSaved] = useState(false);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const fetchEmployer = async () => {
      employersAPI.getEmployerById(props.job.employerId).then((res) => {
        setEmPloyer(res.data);
      });
    };
    fetchEmployer();

    if (logoRef.current) {
      const width = logoRef.current.offsetWidth;
      logoRef.current.style.height = width + "px";
    }
  }, [props.job.employerId]);

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
    const currentDate: any = new Date(); // Ngày hiện tại
    const targetDate: any = new Date(toDate); // Chuyển đổi chuỗi toDate thành đối tượng Date

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
          src={
            employer?.image
              ? employer?.image
              : "https://res.cloudinary.com/dcpatkvcu/image/upload/v1695807392/DoAnNganh/non-user_lctzz5.jpg"
          }
          alt="avatar"
          className="w-[90%] object-cover p-1 md:p-4"
          ref={logoRef}
        />
      </div>

      <div className="w-3/4 sm:w-4/5">
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
            <AiFillHeart className="w-6 h-6 xl:w-8 xl:h-8" />
          </div>
        </div>
        <div className="mt-1">
          <div>
            <Link
              to={`/home/job/${props.job.id}`}
              className=" text-gray-700 font-bold hover:text-orangetext text-base md:text-lg "
            >
              {props.job.title}
            </Link>
          </div>
          <div className="mt-1">
            <p className="text-gray-600 text-sm md:text-base truncate cursor-default">
              {employer?.name}
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
export default JobItem;
