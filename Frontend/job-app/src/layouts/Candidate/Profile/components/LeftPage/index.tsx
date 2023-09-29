/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import { CandidateResponseModel } from "../../../../../models/CandidateResponseModel";

const LeftPage: React.FC<{ candidateRes?: CandidateResponseModel }> = (
  props
) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showBox, setShowBox] = useState(false);

  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [sex, setSex] = useState("Nam");

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDateChange = (e: any) => {
    const inputDate = e.target.value;
    const dateObj = new Date(inputDate);

    if (!isNaN(dateObj.getTime())) {
      // Kiểm tra xem giá trị ngày hợp lệ
      const formattedDate = dateObj
        .toISOString()
        .split("T")[0]
        .replace(/-/g, "/");
      setDateOfBirth(formattedDate);
    } else {
      // Nếu giá trị ngày không hợp lệ, đặt lại thành rỗng
      setDateOfBirth("");
    }
  };
  return (
    <>
      <div className="w-full block md:flex lg:block lg:w-1/3">
        <div className="relative container md:w-1/2 lg:w-auto">
          {selectedFile ? (
            <img
              className="w-40 h-40 rounded-full ring-4 ring-blue-500 mx-auto"
              src={URL.createObjectURL(selectedFile)}
              alt="Ảnh đã chọn"
            />
          ) : (
            <img
              src={
                props.candidateRes
                  ? props.candidateRes.avatar
                  : "https://res.cloudinary.com/dcpatkvcu/image/upload/v1695807392/DoAnNganh/non-user_lctzz5.jpg"
              }
              alt="Ảnh cá nhân"
              className="w-40 h-40 rounded-full ring-4 ring-blue-500 mx-auto"
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
                  fileInput.click(); // Khi nút được nhấn, mở hộp thoại chọn tệp
                }
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
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
                  onClick={() => {
                    console.log("Tệp đã được xác nhận:", selectedFile);
                  }}
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
              <p className="w-[50%] xl:w-[40%]">Họ và Tên:</p>
              <p className="font-medium">
                {props.candidateRes?.firstName} {props.candidateRes?.lastName}{" "}
              </p>
            </div>
            <div className="flex">
              <p className="w-[50%] xl:w-[40%]">Ngày sinh:</p>
              <p className="font-medium">
                {props.candidateRes
                  ? new Date(
                      props.candidateRes.dateOfBirth
                    ).toLocaleDateString()
                  : ""}
              </p>
            </div>
            <div className="flex">
              <p className="w-[50%] xl:w-[40%]">Email:</p>
              <p className="font-medium">{props.candidateRes?.username}</p>
            </div>
            <div className="flex">
              <p className="w-[50%] xl:w-[40%]">Giới tính:</p>
              <p className="font-medium">{props.candidateRes?.sex}</p>
            </div>
          </div>
          <div className="ml-2">
            <button
              className="hover:text-blue-600"
              onClick={() => setShowBox(!showBox)}
            >
              <BsFillPencilFill />
            </button>
          </div>
        </div>
      </div>
      {showBox && localStorage.getItem("candidateToken") ? (
        <div className="fixed inset-0 flex items-center justify-center z-[999999999] bg-black bg-opacity-50">
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
                  onChange={(e) => setfirstName(e.target.value)}
                  value={props.candidateRes?.firstName}
                />
              </div>
              <div className="md:ml-4 md:w-1/2 w-full">
                <label className="font-semibold text-sm block text-gray-700">
                  Tên:
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 mb-3 text-sm w-full"
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  value={props.candidateRes?.lastName}
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
                  type="Date"
                  onChange={handleDateChange}
                  max={new Date().toISOString().split("T")[0]}
                  value={props.candidateRes?.dateOfBirth}
                />
              </div>
              <div className="md:ml-4 md:w-1/2 w-full">
                <label className="font-semibold text-sm block text-gray-700">
                  Giới tính
                </label>
                <select
                  className="border rounded-lg px-3 py-2 mt-1 mb-3 text-sm w-full"
                  onChange={(e) => setSex(e.target.value)}
                  value={props.candidateRes?.sex}
                >
                  <option>Nam</option>
                  <option>Nữ</option>
                  <option>Khác</option>
                </select>
              </div>
            </div>
            <label className="font-semibold text-sm block text-gray-700">
              Email <span className="text-red-500 font-normal">(không thể thay đổi)</span>:
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
                onClick={() => setShowBox(!showBox)}
              >
                Hủy bỏ
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded">
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
