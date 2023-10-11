/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { JobModel } from "../../../../../models/JobModel";
import {
  applicationsAPI,
  candidatesAPI,
  employersAPI,
} from "../../../../../services";
import { EmployerModel } from "../../../../../models/EmployerModel";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import { ApplicationModel } from "../../../../../models/ApplicationModel";
import { Link } from "react-router-dom";

export const JobInfo: React.FC<{ job?: JobModel }> = (props) => {
  const [showBox, setShowBox] = useState(false);
  const [isJobSaved, setIsJobSaved] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [letter, setLetter] = useState("");
  const [cvFile, setCVFile] = useState<File | null>(null);
  const [isApply, setIsApply] = useState<ApplicationModel>();
  const token = localStorage.getItem("candidateToken") || "";

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    const isSaved = savedJobs.some(
      (savedJob: any) => savedJob.id === props.job?.id
    );

    if (isSaved) {
      setIsJobSaved(true);
    }

    const checkCandidateApplyJob = () => {
      if (props.job?.id && token)
        applicationsAPI
          .getCandidateApplyJob(props.job?.id, token)
          .then((res) => {
            setIsApply(res.data);
          })
          .catch((error: any) => console.log(error));
    };
    checkCandidateApplyJob();
  }, [props.job, token]);

  const handleLetterChange = (content: string) => {
    setLetter(content);
  };

  const handleSaveJob = () => {
    if (!isJobSaved) {
      const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
      savedJobs.push(props.job);
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
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
            localStorage.getItem("savedJobs") || "[]"
          );
          const updatedSavedJobs = savedJobs.filter(
            (savedJob: any) => savedJob.id !== props.job?.id
          );
          localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
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

  const [employer, setEmployer] = useState<EmployerModel>();

  useEffect(() => {
    const getEmployer = () => {
      employersAPI.getEmployerById(props.job?.employerId).then((res) => {
        setEmployer(res.data);
      });
    };
    getEmployer();
  }, [props.job?.employerId]);

  const dayRemaining = calculateDaysRemaining(props.job?.toDate || "");

  const ApplyJobHandle = () => {
    if (localStorage.getItem("candidateToken")) {
      setShowBox(!showBox);
    } else {
      Swal.fire({
        title: "Bạn cần đăng nhập để ứng tuyển?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/home/login";
        }
      });
    }
  };

  const submitApplication = () => {
    const token = localStorage.getItem("candidateToken") || "";
    if (token) {
      if (name && email && phoneNumber && cvFile) {
        Swal.fire({
          title: "Xác nhận gửi?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Đồng ý",
        }).then((result) => {
          if (result.isConfirmed) {
            candidatesAPI
              .candidateApply(
                props.job?.id,
                letter,
                phoneNumber,
                email,
                name,
                cvFile,
                token
              )
              .then(() => {
                Swal.fire(
                  "Thành công!",
                  "Gửi đơn ứng tuyển thành công",
                  "success"
                );
                window.location.reload();
              })
              .catch(() => {
                Swal.fire("Thất bại!", "Gửi đơn ứng tuyển thất bại", "error");
              });
          }
        });
      } else {
        Swal.fire("Thất bại!", "Vui lòng nhập đầy đủ thông tin", "error");
      }
    }
  };

  return (
    <>
      <div className="w-full lg:w-[70%] bg-white rounded-lg p-5 flex">
        <div className="w-1/4 sm:w-1/5 flex items-center lg:hidden">
          <img
            src={
              employer?.image
                ? employer?.image
                : "https://res.cloudinary.com/dcpatkvcu/image/upload/v1695807392/DoAnNganh/non-user_lctzz5.jpg"
            }
            alt="avatar"
            className="w-[90%] object-cover p-1 md:p-4"
          />
        </div>
        <div className="w-3/4 sm:w-4/5 lg:w-full">
          <div>
            <p className=" text-gray-700 font-bold hover:text-orangetext text-base md:text-xl truncate cursor-pointer">
              {props.job?.title}
            </p>
          </div>
          <div className="md:mt-2">
            <Link
              to={`/home/employer/${employer?.id}`}
              className="text-gray-600 text-sm md:text-base truncate cursor-pointer"
            >
              {employer?.name}
            </Link>
          </div>

          {dayRemaining > 0 ? (
            <>
              <div className="md:mt-1">
                <span className="font-light text-xs md:text-sm text-neutral-500">
                  Hết hạn trong {dayRemaining} ngày
                </span>
              </div>
              <div className="flex w-full mt-3 gap-1 sm:gap-3">
                {isApply ? (
                  <div className="bg-orange-300 text-center text-white py-2 px-2 sm:px-4 rounded w-[65%] sm:w-[70%] text-sm md:text-base">
                    <strong className="font-semibold">Đã ứng tuyển! </strong>
                    <span className="block sm:inline">
                      {isApply.applyDate
                        ? new Date(isApply.applyDate).toLocaleDateString()
                        : ""}
                    </span>
                  </div>
                ) : (
                  <button
                    className="bg-orangetext hover:bg-[#fe825c] text-white font-semibold py-2 px-2 sm:px-4 rounded w-[65%] sm:w-[70%] text-sm md:text-base"
                    onClick={ApplyJobHandle}
                  >
                    Ứng tuyển ngay
                  </button>
                )}

                <button
                  className="bg-transparent text-orangetext hover:text-[#fe825c] font-semibold py-2 px-2 sm:px-4 border border-orangetext hover:border-[#fe825c] rounded w-[35%] sm:w-[30%] text-sm md:text-base"
                  onClick={handleSaveJob}
                >
                  {!isJobSaved ? "Lưu tin" : "Bỏ lưu"}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="mt-4 ">
                <span className="font-semibold text-lg md:text-xl text-red-500">
                  Đã hết hạn
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      {showBox && localStorage.getItem("candidateToken") && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-[90%] sm:w-[75%] md:w-3/5 xl:w-1/2 text-sm">
            <h1 className="text-base md:text-lg font-semibold w-full text-center mb-5">
              Ứng tuyển vị trí{" "}
              <span className="hover:text-orangetext cursor-default">
                {props.job?.title}
              </span>{" "}
              tại{" "}
              <span className="hover:text-orangetext cursor-default">
                {employer?.name}
              </span>
            </h1>
            <label className="block mb-3">
              <span className="">Họ Tên:</span>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 mt-1   w-full"
                placeholder="Nhập họ và tên..."
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label className="block mb-3">
              <span className="">Email:</span>
              <input
                type="email"
                className="border rounded-lg px-3 py-2 mt-1  w-full"
                placeholder="Nhập Email..."
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="block mb-3">
              <span className="">Số điện thoại:</span>
              <input
                type="phone"
                className="border rounded-lg px-3 py-2 mt-1  w-full"
                placeholder="Nhập số điện thoại..."
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </label>
            <label className="block mb-2">
              <span className="">Thư giới thiệu:</span>
              <ReactQuill
                theme="snow"
                value={letter}
                onChange={handleLetterChange}
                className="mt-1 max-h-[20vh] overflow-y-auto"
              />
            </label>
            <label className="block mb-3">
              <span className="text-gray-700">CV của bạn</span>
              <input
                type="file"
                className="border rounded-lg px-3 py-2 mt-1   w-full"
                accept=".doc,.pdf"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setCVFile(e.target.files[0]);
                  } else {
                    setCVFile(null);
                  }
                }}
              />
            </label>

            <div className="mb-3 flex gap-5 justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
                onClick={() => setShowBox(!showBox)}
              >
                Hủy bỏ
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
                onClick={submitApplication}
              >
                Ứng tuyển
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
