/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import authsAPI from "../../../services/Auths";
import Swal from "sweetalert2";

function LoginPageAdmin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      authsAPI
        .loginAdmin(username.trim(), password.trim())
        .then((res) => {
          localStorage.setItem("adminToken", res.data);
          localStorage.removeItem("candidateToken");
          localStorage.removeItem("employerToken");
          window.location.reload();
          Swal.fire("Success!", "Login success!", "success");
        })
        .catch(() => {
          Swal.fire("Error!", "Login fail!", "error");
        });
    } else {
      Swal.fire("Error!", "Please enter complete information!", "error");
    }
  };

  return (
    <div className="flex flex-wrap content-center justify-center h-screen py-10 sm:w-[95%] md:w-4/5 lg:w-3/5  sm:mx-auto">
      <div className="flex shadow-md">
        <div className="hidden sm:flex flex-wrap content-center justify-center rounded-l-md w-1/2">
          <img
            className="w-full h-full bg-center bg-no-repeat bg-cover rounded-l-md"
            src="https://res.cloudinary.com/dcpatkvcu/image/upload/v1696784020/DoAnNganh/Host_And_Admin_Marketing_Job_Vacancies_Vector_Recruitment_Open_Job_Office_Girls_PNG_and_Vector_with_Transparent_Background_for_Free_Download_unyj7i.jpg"
          />
        </div>
        <div className="flex flex-wrap content-center justify-center rounded-md sm:rounded-r-md bg-white p-7 sm:p-5 w-full sm:w-1/2">
          <div className="w-72">
            <h1 className="text-2xl font-semibold">Welcome back</h1>
            <small className="text-gray-400 text-sm">
              Welcome back! Please enter your details
            </small>

            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="mb-2 block text-base font-semibold">
                  Username:
                </label>
                <input
                  type="text"
                  placeholder="Enter your username..."
                  className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-2 px-3 text-gray-500 text-sm"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  value={username}
                />
              </div>

              <div className="mb-3">
                <label className="mb-2 block text-base font-semibold">
                  Password:
                </label>
                <input
                  type="password"
                  placeholder="********"
                  className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-2 px-3 text-gray-500 text-sm"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  value={password}
                />
              </div>

              <div className="mt-7">
                <button className="mb-1.5 block w-full text-center text-white bg-purple-500 hover:bg-purple-700 px-2 py-1.5 rounded-md">
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPageAdmin;
