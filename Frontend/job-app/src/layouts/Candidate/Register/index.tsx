/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import authsAPI from "../../../services/Auths";
import { useState } from "react";
import Swal from "sweetalert2";
import { accountsAPI } from "../../../services";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [sex, setSex] = useState("Nam");

  const navigate = useNavigate();

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

  const handleSubmit = () => {
    if (
      email &&
      password &&
      confirmPassword &&
      firstName &&
      lastName &&
      dateOfBirth &&
      sex
    ) {
      if (password === confirmPassword) {
        accountsAPI
          .getAccountByUserName(email)
          .then(() => {
            Swal.fire("Thất bại!", "Email đã tồn tại!", "error");
          })
          .catch(() => {
            authsAPI
              .registerCandidate(
                firstName,
                lastName,
                "",
                dateOfBirth,
                sex,
                email,
                password
              )
              .then(() => {
                Swal.fire("Thành công!", "Đăng kí thành công!", "success");
                navigate("/home/login");
              })
              .catch(() => {
                Swal.fire("Thất bại!", "Đăng kí thất bại!", "error");
              });
          });
      } else {
        Swal.fire("Thất bại!", "Mật khẩu không khớp!", "error");
      }
    } else {
      Swal.fire("Thất bại!", "Vui lòng nhập đầy đủ thông tin!", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <div className="py-10 px-5 sm:px-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">
          Đăng kí tài khoản
        </h1>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <div className="px-5 pt-7 pb-5">
            <div className="md:flex md:justify-between">
              <div className="">
                <label className="font-semibold text-sm block text-gray-700">
                  Họ:
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 mb-3 text-sm w-full"
                  type="text"
                  onChange={(e) => setfirstName(e.target.value)}
                />
              </div>
              <div className="md:ml-2">
                <label className="font-semibold text-sm block text-gray-700">
                  Tên:
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 mb-3 text-sm w-full"
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
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
              Email:
            </label>
            <input
              type="email"
              className="border rounded-lg px-3 py-2 mt-1 mb-3 text-sm w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="font-semibold text-sm block text-gray-700">
              Mật khẩu:
            </label>
            <input
              type="password"
              className="border rounded-lg px-3 py-2 mt-1 mb-3 text-sm w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="font-semibold text-sm block text-gray-700">
              Nhập lại mật khẩu:
            </label>
            <input
              type="password"
              className="border rounded-lg px-3 py-2 mt-1 mb-3 text-sm w-full"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="transition duration-200 bg-orangetext hover:bg-[#fe825c] text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block mb-3"
              onClick={handleSubmit}
            >
              <span className="inline-block mr-2">Đăng kí</span>
            </button>
            <Link
              to="/home/login"
              className="font-normal text-sm rounded-lg text-gray-500 italic"
            >
              Tôi đã có tài khoản!!!
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
