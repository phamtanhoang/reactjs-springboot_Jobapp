/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import authsAPI from "../../../services/Auths";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (email && password) {
      authsAPI
        .loginCandidate(email, password)
        .then((res) => {
          Swal.fire("Thành công!", "Đăng nhập thành công!", "success");
          localStorage.setItem("candidateToken", res.data);
          localStorage.removeItem("employerToken");
          navigate("/");
        })
        .catch(() => {
          Swal.fire("Thất bại!", "Đăng nhập thất bại!", "error");
        });
    } else {
      Swal.fire("Thất bại!", "Vui lòng nhập đầy đủ thông tin!", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="py-10 px-5 sm:px-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">
          Đăng nhập tài khoản
        </h1>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <div className="px-5 pt-7 pb-5">
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Email:
            </label>
            <input
              type="email"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Mật khẩu:
            </label>
            <input
              type="password"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="transition duration-200 bg-orangetext hover:bg-[#fe825c] text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block mb-3"
              onClick={handleSubmit}
            >
              <span className="inline-block mr-2">Đăng nhập</span>
            </button>
            <Link
              to="/home/register"
              className="font-normal text-sm rounded-lg text-gray-500 italic hover:text-orangetext"
            >
              Tôi chưa có tài khoản!!!
            </Link>
          </div>

          <div className="py-5">
            <div className="text-center whitespace-nowrap">
              <Link
                to="/employer/login"
                className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
              >
                <span className="inline-block ml-1">
                  Đăng nhập dành cho nhà tuyển dụng
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
