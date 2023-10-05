/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Swal from "sweetalert2";
import authsAPI from "../../../services/Auths";
import { Link, useNavigate } from "react-router-dom";
import { accountsAPI } from "../../../services";

export const RegisterEmployer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      email &&
      password &&
      name &&
      address &&
      description &&
      confirmPassword
    ) {
      if (password === confirmPassword) {
        accountsAPI
          .getAccountByUserName(email)
          .then(() => {
            Swal.fire("Thất bại!", "Email đã tồn tại!", "error");
          })
          .catch(() => {
            authsAPI
              .registerEmployer(
                email,
                password,
                name,
                address,
                "",
                "",
                description
              )
              .then(() => {
                Swal.fire("Đăng kí thành công!!! Chờ ban quản trị xác nhận.");
                navigate("/employer/login");
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
    <section className="h-screen container mx-auto">
      <div className="h-full">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>

          <div className="mb-12 w-[95%] sm:w-[90%] md:w-8/12 lg:w-5/12 ring-1 ring-neutral-300 rounded-3xl bg-white shadow-2xl items-center">
            <form onSubmit={handleSubmit}>
              <div className="my-7 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold text-xl md:text-2xl">
                  Đăng kí nhà tuyển dụng
                </p>
              </div>

              <div className="relative text-sm px-7">
                <div className="flex flex-wrap -mx-3">
                  <div className="w-full md:w-1/2 px-3 mb-2">
                    <label className="font-semibold text-sm text-gray-600 block">
                      Tên:
                    </label>
                    <input
                      type="text"
                      className="border rounded-lg px-3 py-2 mt-1  w-full"
                      onChange={(e) => setName(e.target.value.trim())}
                      placeholder="Nhập tên nhà tuyển dụng..."
                      value={name}
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-2">
                    <label className="font-semibold text-sm text-gray-600  block">
                      Địa chỉ:
                    </label>
                    <input
                      type="text"
                      className="border rounded-lg px-3 py-2 mt-1  w-full"
                      onChange={(e) => setAddress(e.target.value.trim())}
                      placeholder="Nhập địa chỉ..."
                      value={address}
                      required
                    />
                  </div>
                </div>

                <div className="mb-2">
                  <label className="font-semibold text-sm text-gray-600 block">
                    Mô tả:
                  </label>
                  <textarea
                    className="border rounded-lg px-3 py-4 mt-1  w-full"
                    onChange={(e) => setDescription(e.target.value.trim())}
                    placeholder="Nhập mô tả..."
                    value={description}
                    required
                  />
                </div>

                <label className="font-semibold text-sm text-gray-600 block ">
                  Email:
                </label>
                <input
                  type="email"
                  className="border rounded-lg px-3 py-2 mt-1 w-full mb-2"
                  onChange={(e) => setEmail(e.target.value.trim())}
                  placeholder="Nhập Email..."
                  value={email}
                  required
                />

                <label className="font-semibold text-sm text-gray-600 block">
                  Mật khẩu:
                </label>
                <input
                  type="password"
                  className="border rounded-lg px-3 py-2 mt-1  w-full mb-2"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu..."
                  value={password}
                  required
                />
                <label className="font-semibold text-sm text-gray-600 block">
                  Nhập lại mật khẩu:
                </label>
                <input
                  type="password"
                  className="border rounded-lg px-3 py-2 mt-1   w-full"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu..."
                  value={confirmPassword}
                  required
                />
              </div>

              <div className="text-center mt-5">
                <button
                  type="submit"
                  className="inline-block rounded bg-blue-600 hover:bg-blue-700 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  Đăng kí
                </button>

                <p className="mt-4 text-sm font-semibold">
                  Tôi đã có tài khoản?
                  <Link
                    to={"/employer/login"}
                    className="transition duration-150 ease-in-out ml-2 hover:text-blue-500"
                  >
                    Đăng nhập
                  </Link>
                </p>
                <Link
                  to={"/home"}
                  type="button"
                  className="my-5 inline-block rounded bg-blue-300 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-gray-500 transition duration-150 ease-in-out hover:bg-blue-500 hover:text-white "
                >
                  Quay lại trang tìm việc
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
