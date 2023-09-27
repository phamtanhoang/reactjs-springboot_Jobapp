import { useState } from "react";
import Swal from "sweetalert2";
import authsAPI from "../../../services/Auths";
import { Link } from "react-router-dom";

export const LoginEmployer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (email && password) {
      authsAPI
        .loginEmployer(email, password)
        .then((res) => {
          localStorage.setItem("employerToken", res.data);
          Swal.fire("Thành công!", "Đăng nhập thành công!", "success");
          localStorage.removeItem("candidateToken");
          window.location.reload();
        })
        .catch(() => {
          Swal.fire("Thất bại!", "Đăng nhập thất bại!", "error");
        });
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

          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form>
              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold text-xl md:text-2xl">
                  Đăng nhập nhà tuyển dụng
                </p>
              </div>

              <div className="relative" data-te-input-wrapper-init>
                <label className="font-semibold text-báe text-gray-600 pb-1 block">
                  Email:
                </label>
                <input
                  type="email"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-base w-full"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="font-semibold text-base text-gray-600 pb-1 block">
                  Mật khẩu:
                </label>
                <input
                  type="password"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-base w-full"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-center ">
                <button
                  type="button"
                  className="inline-block rounded bg-blue-400 hover:bg-blue-500 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  onClick={handleSubmit}
                >
                  Đăng nhập
                </button>

                <p className="mb-0 mt-4 pt-1 text-sm font-semibold">
                  Tôi không có tài khoản?
                  <Link
                    to={"/employer/register"}
                    className="transition duration-150 ease-in-out ml-2 hover:text-blue-500"
                  >
                    Đăng kí
                  </Link>
                </p>

                <Link
                  to={"/home"}
                  type="button"
                  className="mt-5 inline-block rounded bg-blue-200 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-gray-700 transition duration-150 ease-in-out hover:bg-blue-400 hover:text-white "
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
