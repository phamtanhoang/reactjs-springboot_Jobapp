/* eslint-disable @typescript-eslint/no-explicit-any */

import { AiFillHome } from "react-icons/ai";
import { BiSolidCategory, BiSolidMessageAltDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FaUserEdit, FaUserGraduate, FaUserTie } from "react-icons/fa";
import { MdCategory, MdContactPage } from "react-icons/md";

import { useState } from "react";
import { ChangePasswordPageAdmin } from "../../..";

const NavBarAdmin = () => {
  const [showBox, setShowBox] = useState(false);
  return (
    <aside className="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 h-full text-white transition-all duration-300 z-10 bg-purple-500">
      <div className="flex justify-center">
        <hr className="mb-1 w-full"></hr>
      </div>
      <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          <li className="px-5 hidden md:block">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm tracking-wide uppercase font-semibold">
                Main
              </div>
            </div>
          </li>
          <li>
            <Link
              to="/admin/home"
              className="relative flex flex-row items-center h-11 focus:outline-none  hover:text-purple-600 hover:bg-purple-100 border-x-4 border-transparent hover:border-purple-600 pr-6 rounded-md"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <AiFillHome className="text-xl" />
              </span>
              <span className="ml-2 text-base tracking-wide truncate">
                Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/categories"
              className="relative flex flex-row items-center h-11 focus:outline-none  hover:text-purple-600 hover:bg-purple-100 border-x-4 border-transparent hover:border-purple-600 pr-6 rounded-md"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <MdCategory className="text-xl" />
              </span>
              <span className="ml-2 text-base tracking-wide truncate">
                Categories
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/jobs"
              className="relative flex flex-row items-center h-11 focus:outline-none  hover:text-purple-600 hover:bg-purple-100 border-x-4 border-transparent hover:border-purple-600 pr-6 rounded-md"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <BiSolidCategory className="text-xl" />
              </span>
              <span className="ml-2 text-base tracking-wide truncate">
                Jobs
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/applications"
              className="relative flex flex-row items-center h-11 focus:outline-none  hover:text-purple-600 hover:bg-purple-100 border-x-4 border-transparent hover:border-purple-600 pr-6 rounded-md"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <MdContactPage className="text-xl" />
              </span>
              <span className="ml-2 text-base tracking-wide truncate">
                Applications
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/employers"
              className="relative flex flex-row items-center h-11 focus:outline-none  hover:text-purple-600 hover:bg-purple-100 border-x-4 border-transparent hover:border-purple-600 pr-6 rounded-md"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <FaUserTie className="text-xl" />
              </span>
              <span className="ml-2 text-base tracking-wide truncate">
                Employers
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/candidates"
              className="relative flex flex-row items-center h-11 focus:outline-none  hover:text-purple-600 hover:bg-purple-100 border-x-4 border-transparent hover:border-purple-600 pr-6 rounded-md"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <FaUserGraduate className="text-xl" />
              </span>
              <span className="ml-2 text-base tracking-wide truncate">
                Candidates
              </span>
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="relative flex flex-row items-center h-11 focus:outline-none  hover:text-purple-600 hover:bg-purple-100 border-x-4 border-transparent hover:border-purple-600 pr-6 rounded-md"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <BiSolidMessageAltDetail className="text-xl" />
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
              <div className="text-sm font-semibold tracking-wide uppercase">
                Settings
              </div>
            </div>
          </li>
          <li>
            <a
              href="#"
              className="relative flex flex-row items-center h-11 focus:outline-none  hover:text-purple-600 hover:bg-purple-100 border-x-4 border-transparent hover:border-purple-600 pr-6 rounded-md"
              onClick={() => setShowBox(true)}
            >
              <span className="inline-flex justify-center items-center ml-4">
                <FaUserEdit className="text-xl" />
              </span>
              <span className="ml-2 text-base tracking-wide truncate">
                Change Password
              </span>
            </a>
            {showBox && localStorage.getItem("adminToken") && (
              <ChangePasswordPageAdmin setShowBox={setShowBox} />
            )}
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
