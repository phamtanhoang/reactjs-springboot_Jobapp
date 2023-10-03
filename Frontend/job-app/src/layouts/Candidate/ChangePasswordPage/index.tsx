/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import authsAPI from "../../../services/Auths";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [comfirmNewPassword, setComfirmNewPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (currentPassword && newPassword && comfirmNewPassword) {
      // authsAPI
      //   .then((res) => {
      //     Swal.fire("Thành công!", "Đăng nhập thành công!", "success");
      //     localStorage.setItem("candidateToken", res.data);
      //     localStorage.removeItem("employerToken");
      //     navigate("/home/login");
      //   })
      //   .catch(() => {
      //     Swal.fire("Thất bại!", "Đăng nhập thất bại!", "error");
      //   });
    } else {
      Swal.fire("Thất bại!", "Vui lòng nhập đầy đủ thông tin!", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="py-10 px-5 sm:px-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">Đổi mật khẩu</h1>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <div className="px-5 pt-7 pb-5">
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Mật khẩu hiện tại:
            </label>
            <input
              type="password"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Mật khẩu mới:
            </label>
            <input
              type="password"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Nhập lại mật khẩu:
            </label>
            <input
              type="password"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              onChange={(e) => setComfirmNewPassword(e.target.value)}
            />
            <button
              type="button"
              className="transition duration-200 bg-orangetext hover:bg-[#fe825c] text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block mb-3"
              onClick={handleSubmit}
            >
              <span className="inline-block mr-2">Xác nhận</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
