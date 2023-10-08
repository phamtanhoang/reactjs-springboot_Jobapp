/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import { CandidateResponseModel } from "../../../../../models/CandidateResponseModel";
import { candidatesAPI } from "../../../../../services";
import Swal from "sweetalert2";
import { Spinner } from "../../../../../components";

const LeftPage: React.FC<{ candidateRes?: CandidateResponseModel }> = (
  props
) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showBox, setShowBox] = useState(false);

  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [sex, setSex] = useState("Nam");

  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <div className="flex-grow">
        <Spinner />
      </div>
    );
  }

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const submitAvatar = () => {
    const token = localStorage.getItem("candidateToken") || "";
    if (token) {
      if (selectedFile) {
        Swal.fire({
          title: "Xác nhận đổi ảnh đại diện?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Đồng ý",
        }).then((result) => {
          if (result.isConfirmed) {
            setIsLoading(true);
            candidatesAPI
              .updateAvatar(selectedFile, token)
              .then(() => {
                Swal.fire(
                  "Thành công!",
                  "Thay đổi ảnh đại diện thành công",
                  "success"
                ).then((result) => {
                  if (result.isConfirmed) {
                    window.location.reload();
                  }
                });
              })
              .catch(() => {
                Swal.fire(
                  "Thất bại!",
                  "Thay đổi ảnh đại diện thất bại",
                  "error"
                );
              })
              .finally(() => {
                setIsLoading(false);
              });
          }
        });
      } else {
        Swal.fire("Thất bại!", "Vui chọn ảnh", "error");
      }
    }
  };

  const updateHandle = () => {
    const token = localStorage.getItem("candidateToken") || "";
    if (token) {
      if (firstName && lastName && dateOfBirth && sex) {
        Swal.fire({
          title: "Xác nhận chỉnh sửa?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Đồng ý",
        }).then((result) => {
          if (result.isConfirmed) {
            candidatesAPI
              .updateCandidate(firstName, lastName, dateOfBirth, sex, token)
              .then(() => {
                Swal.fire("Thành công!", "Chỉnh sửa thành công!", "success");
                window.location.reload();
              })
              .catch(() => {
                Swal.fire("Thất bại!", "Chỉnh sửa thất bại!", "error");
              });
          }
        });
      } else {
        Swal.fire("Thất bại!", "Vui lòng nhập đầy đủ thông tin", "error");
      }
    }
  };
  const closedBox = () => {
    setfirstName("");
    setLastName("");
    setDateOfBirth("");
    setSex("Nam");
    setShowBox(false);
  };
  return (
    <>
      <div className="w-full block md:flex lg:block lg:w-1/3">
        <div className="relative container md:w-1/2 lg:w-auto">
          {selectedFile ? (
            <img
              className="w-40 h-40 rounded-full ring-4 ring-orangetext mx-auto"
              src={URL.createObjectURL(selectedFile)}
              alt="Ảnh đã chọn"
            />
          ) : (
            <img
              src={
                props.candidateRes?.avatar
                  ? props.candidateRes?.avatar
                  : "https://res.cloudinary.com/dcpatkvcu/image/upload/v1695807392/DoAnNganh/non-user_lctzz5.jpg"
              }
              alt="Ảnh cá nhân"
              className="w-40 h-40 rounded-full ring-4 ring-orangetext mx-auto"
            />
          )}
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept="image/*"
            onChange={handleFileInputChange}
          />
          <div className="flex justify-center mt-5">
            <button
              onClick={() => {
                const fileInput = document.getElementById("fileInput");
                if (fileInput) {
                  fileInput.click();
                }
              }}
              className="px-4 py-2 bg-orangetext text-white rounded cursor-pointer hover:bg-[#fe825c]"
            >
              Chọn Ảnh
            </button>
          </div>
          <div className="flex gap-3 absolute top-0 right-2">
            {selectedFile && (
              <>
                <button
                  onClick={() => {
                    setSelectedFile(null);
                  }}
                  className=" bg-white ring-2 ring-red-600 text-red-500 rounded-full cursor-pointer hover:bg-red-600 hover:text-white text-2xl"
                >
                  <AiOutlineClose />
                </button>
                <button
                  onClick={submitAvatar}
                  className=" bg-white ring-2 ring-blue-600 text-blue-500 rounded-full cursor-pointer hover:bg-blue-600 hover:text-white text-2xl"
                >
                  <AiOutlineCheck />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="mt-5 text-sm sm:text-base font-normal flex container md:w-1/2 lg:w-auto">
          <div className="w-[90%]">
            <div className="flex">
              <p className="w-[50%] xl:w-[40%]  font-semibold">Họ và Tên:</p>
              <p className="font-medium">
                {props.candidateRes?.firstName} {props.candidateRes?.lastName}{" "}
              </p>
            </div>
            <div className="flex">
              <p className="w-[50%] xl:w-[40%]  font-semibold">Ngày sinh:</p>
              <p className="font-medium">
                {props.candidateRes?.dateOfBirth &&
                  new Date(props.candidateRes.dateOfBirth).toLocaleDateString()}
              </p>
            </div>
            <div className="flex">
              <p className="w-[50%] xl:w-[40%]  font-semibold">Email:</p>
              <p className="font-medium">{props.candidateRes?.username}</p>
            </div>
            <div className="flex">
              <p className="w-[50%] xl:w-[40%]  font-semibold">Giới tính:</p>
              <p className="font-medium">{props.candidateRes?.sex}</p>
            </div>
          </div>
          <div className="ml-2">
            <button
              className="hover:text-orangetext"
              onClick={() => setShowBox(!showBox)}
            >
              <BsFillPencilFill />
            </button>
          </div>
        </div>
      </div>
      {showBox && localStorage.getItem("candidateToken") ? (
        <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-[75%] sm:w-[60%] md:w-1/2 xl:w-1/3 text-sm">
            <h1 className="text-base md:text-lg font-semibold w-full text-center mb-5">
              Cập nhật thông tin
            </h1>
            <div className="md:flex md:justify-between">
              <div className="md:w-1/2 w-full">
                <label className="font-semibold text-sm block text-gray-700">
                  Họ:
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 mb-3 text-sm w-full"
                  type="text"
                  onChange={(e) => setfirstName(e.target.value.trim())}
                />
              </div>
              <div className="md:ml-4 md:w-1/2 w-full">
                <label className="font-semibold text-sm block text-gray-700">
                  Tên:
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 mb-3 text-sm w-full"
                  type="text"
                  onChange={(e) => setLastName(e.target.value.trim())}
                />
              </div>
            </div>
            <div className="md:flex md:justify-between">
              <div className="md:w-1/2 w-full">
                <label className="font-semibold text-sm block text-gray-700">
                  Ngày sinh:
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 mb-3 text-sm w-full"
                  type="date"
                  onChange={(e) => {
                    setDateOfBirth(e.target.value);
                  }}
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="md:ml-4 md:w-1/2 w-full">
                <label className="font-semibold text-sm block text-gray-700">
                  Giới tính
                </label>
                <select
                  className="border rounded-lg px-3 py-2 mt-1 mb-3 text-sm w-full"
                  onChange={(e) => setSex(e.target.value)}
                >
                  <option>Nam</option>
                  <option>Nữ</option>
                  <option>Khác</option>
                </select>
              </div>
            </div>
            <label className="font-semibold text-sm block text-gray-700">
              Email{" "}
              <span className="text-red-500 font-normal">
                (không thể thay đổi)
              </span>
              :
            </label>
            <input
              type="email"
              className="border rounded-lg px-3 py-2 mt-1 mb-3 text-sm w-full"
              value={props.candidateRes?.username}
              readOnly
            />

            <div className="mb-3 flex gap-5 justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
                onClick={closedBox}
              >
                Hủy bỏ
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
                onClick={updateHandle}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default LeftPage;
