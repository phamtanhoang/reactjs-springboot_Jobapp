/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

function LoginPageAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.style.setProperty(
      "--dark-mode",
      isDark ? "0" : "1"
    );
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Thực hiện xử lý đăng nhập tại đây, ví dụ kiểm tra email, mật khẩu, và ghi nhớ tùy chọn
  };

  return (
    // <div className={`app ${isDark ? "dark" : ""}`}>
    //   {!isLoading && (
    //     <div className="fixed inset-0 z-50 flex items-center justify-center text-2xl font-semibold text-white bg-[#0e7490]-darker">
    //       Loading.....
    //     </div>
    //   )}
    //   <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4 antialiased text-gray-900 bg-gray-100 dark:bg-dark dark:text-white">
    //     <h1 className="inline-block mb-6 text-3xl font-bold tracking-wider uppercase text-[#0e7490] dark:text-light">
    //       JOBS-ADMIN
    //     </h1>
    //     <main>
    //       <div className="w-full max-w-sm px-4 py-6 space-y-6 bg-white rounded-md dark:bg-darker">
    //         <h1 className="text-xl font-semibold text-center">Login</h1>
    //         <form onSubmit={handleSubmit} className="space-y-6">
    //           <input
    //             type="email"
    //             className="w-full px-4 py-2 border rounded-md dark:bg-darker dark:border-gray-700 focus:outline-none focus:ring focus:ring-primary-100 dark:focus:ring-primary-darker"
    //             placeholder="Email address"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //             required
    //           />
    //           <input
    //             type="password"
    //             className="w-full px-4 py-2 border rounded-md dark:bg-darker dark:border-gray-700 focus:outline-none focus:ring focus:ring-primary-100 dark:focus:ring-primary-darker"
    //             placeholder="Password"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //             required
    //           />

    //           <div>
    //             <button
    //               type="submit"
    //               className="w-full px-4 py-2 font-medium text-center text-white transition-colors duration-200 rounded-md bg-[#0e7490] hover:bg-[#0e7490]-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 dark:focus:ring-offset-darker"
    //             >
    //               Login
    //             </button>
    //           </div>
    //         </form>
    //       </div>
    //     </main>
    //   </div>
    //   <div className="fixed bottom-5 left-5">
    //     <button
    //       onClick={toggleTheme}
    //       className="p-2 transition-colors duration-200 rounded-full shadow-md bg-[#0e7490] hover:bg-[#0e7490]-darker focus:outline-none focus:ring focus:ring-primary"
    //     >
    //       {isDark ? (
    //         <svg
    //           x-show="isDark"
    //           className="w-8 h-8 text-white"
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           stroke="currentColor"
    //         >
    //           <path
    //             stroke-linecap="round"
    //             stroke-linejoin="round"
    //             stroke-width="2"
    //             d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    //           />
    //         </svg>
    //       ) : (
    //         <svg
    //           x-show="!isDark"
    //           className="w-8 h-8 text-white"
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           stroke="currentColor"
    //         >
    //           <path
    //             stroke-linecap="round"
    //             stroke-linejoin="round"
    //             stroke-width="2"
    //             d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    //           />
    //         </svg>
    //       )}
    //     </button>
    //   </div>
    // </div>
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

            <form className="mt-4">
              <div className="mb-3">
                <label className="mb-2 block text-base font-semibold">
                  Email:
                </label>
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-2 px-3 text-gray-500 text-sm"
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
