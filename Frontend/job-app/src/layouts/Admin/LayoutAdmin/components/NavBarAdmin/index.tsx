/* eslint-disable @typescript-eslint/no-explicit-any */

import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import { Link } from "react-router-dom";

const NavBarAdmin = () => {
  return (
    <aside className="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-white h-full text-black transition-all duration-300 z-10">
      <div className="flex justify-center">
        <hr className="mb-1 w-full"></hr>
      </div>
      <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          <li className="px-5 hidden md:block">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
                Main
              </div>
            </div>
          </li>
          <li>
            <Link
              to="/admin/home"
              className="relative flex flex-row items-center h-11 focus:outline-none  hover:text-purple-600 hover:bg-purple-50 border-l-4 border-transparent hover:border-purple-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <AiOutlineHome className="text-xl" />
              </span>
              <span className="ml-2 text-base tracking-wide truncate">
                Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/jobs"
              className="relative flex flex-row items-center h-11 focus:outline-none  hover:text-purple-600 hover:bg-purple-50 border-l-4 border-transparent hover:border-purple-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <AiOutlineHome className="text-xl" />
              </span>
              <span className="ml-2 text-base tracking-wide truncate">
                Jobs
              </span>
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="relative flex flex-row items-center h-11 focus:outline-none  hover:text-purple-600 hover:bg-purple-50 border-l-4 border-transparent hover:border-purple-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <BiMessageDetail className="text-xl" />
              </span>
              <span className="ml-2 text-base tracking-wide truncate">
                Messages
              </span>
              <span className="hidden md:block px-2 py-0.5 ml-auto text-sm font-medium tracking-wide text-red-500 bg-red-50 rounded-full">
                1.2k
              </span>
            </a>
          </li>

          <li className="px-5 hidden md:block">
            <div className="flex flex-row items-center mt-5 h-8">
              <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
                Settings
              </div>
            </div>
          </li>
          <li>
            <a
              href="#"
              className="relative flex flex-row items-center h-11 focus:outline-none  hover:text-purple-600 hover:bg-purple-50 border-l-4 border-transparent hover:border-purple-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <AiOutlineUser className="text-xl" />
              </span>
              <span className="ml-2 text-base tracking-wide truncate">
                Profile
              </span>
            </a>
          </li>
        </ul>
        <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">
          Copyright @2023
        </p>
      </div>
    </aside>
  );
};
export default NavBarAdmin;
