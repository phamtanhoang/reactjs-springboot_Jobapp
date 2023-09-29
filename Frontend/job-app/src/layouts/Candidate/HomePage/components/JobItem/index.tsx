/* eslint-disable @typescript-eslint/no-explicit-any */
import { AiFillHeart } from "react-icons/ai";
import { JobModel } from "../../../../../models/JobModel";
import { useEffect, useState } from "react";
import { employersAPI } from "../../../../../services";
import { EmployerModel } from "../../../../../models/EmployerModel";
import Swal from "sweetalert2";

export const JobItem: React.FC<{ job?: JobModel }> = (props) => {
  const [employer, setEmployer] = useState<EmployerModel>();
  const [isJobSaved, setIsJobSaved] = useState(false);

  useEffect(() => {
    const getEmployer = () => {
      employersAPI.getEmployerById(props.job?.employerId).then((res) => {
        setEmployer(res.data);
      });
    };
    getEmployer();
  }, [props.job?.employerId]);

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

  return (
    <div className="group bg-white border-gray-200 border-2 rounded-lg p-5 hover:border-orangetext hover:bg-[#f4f5f5]">
      <div className="flex">
        <div className="w-1/4 flex justify-center items-center">
          <img
            src={
              employer?.image
                ? employer?.image
                : "https://res.cloudinary.com/dcpatkvcu/image/upload/v1695807392/DoAnNganh/non-user_lctzz5.jpg"
            }
            alt="logo-company"
            className="w-2/3"
          />
        </div>
        <div className="w-3/4 ml-2 grow">
          <p
            className="mb-1 font-semibold text-sm xl:text-base truncate overflow-ellipsis group-hover:text-orangetext cursor-pointer"
            onClick={() => {
              window.location.href = `/home/job/${props.job?.id}`;
            }}
          >
            {props.job?.title}
          </p>
          <p
            className="text-neutral-500 text-xs xl:text-sm truncate overflow-ellipsis cursor-pointer"
            onClick={() => {
              window.location.href = `/home/employer/${employer?.id}`;
            }}
          >
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
        <div
          className={`w-1/12 cursor-pointer text-neutral-500 hover:text-red-600 ${
            isJobSaved ? "text-red-600" : ""
          }`}
          onClick={handleSaveJob}
        >
          <AiFillHeart className="w-6 h-6 xl:w-8 xl:h-8" />
        </div>
      </div>
    </div>
  );
};
