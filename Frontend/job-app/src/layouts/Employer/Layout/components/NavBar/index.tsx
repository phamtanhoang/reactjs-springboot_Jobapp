/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from "sweetalert2";
import { GiCutDiamond } from "react-icons/gi";
import { BiLogOut, BiSolidDashboard } from "react-icons/bi";
import {
  HiDocumentText,
  HiClipboardList,
  HiInformationCircle,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import { useState } from "react";
import { ChangePasswordPageEmployer } from "../../..";

const NavBar: React.FC<{ isNavBarVisible: any }> = (props) => {
  const [showBox, setShowBox] = useState(false);

  const LogoutHandle = () => {
    Swal.fire({
      title: "Do you want to log out??",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("employerToken");
        window.location.reload();
      }
    });
  };
  return (
    <aside
      className={`fixed top-20 lg:top-0 md:left-0 h-screen lg:block bg-white  border-r z-50  ${
        props.isNavBarVisible ? "block" : "hidden "
      }`}
    >
      <div className="w-full h-20 border-b hidden lg:flex items-center justify-center pr-6 ">
        <p className="font-bold text-3xl text-blue-500 pl-4 text-center">
          JOBS EMP
        </p>
      </div>
      <div className="h-full flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75">
        <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex-1 px-3 bg-white divide-y space-y-1">
              <ul className="space-y-2 pb-5">
                <li>
                  <Link
                    to="/employer/home"
                    className="text-base text-gray-900 rounded-lg flex items-center p-2 hover:bg-gray-100 group"
                  >
                    <BiSolidDashboard className="text-2xl text-gray-500 group-hover:text-blue-600" />
                    <span className="ml-3 group-hover:text-blue-600">
                      Dashboard
                    </span>
                  </Link>
                </li>
                <hr></hr>
                <li>
                  <Link
                    to="/employer/jobs"
                    className="text-base text-gray-900 rounded-lg flex items-center p-2 hover:bg-gray-100 group"
                  >
                    <HiDocumentText className="text-2xl text-gray-500 group-hover:text-blue-600" />
                    <span className="ml-3 group-hover:text-blue-600">
                      All jobs
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/employer/applications"
                    className="text-base text-gray-900 rounded-lg flex items-center p-2 hover:bg-gray-100 group"
                  >
                    <HiClipboardList className="text-2xl text-gray-500 group-hover:text-blue-600" />
                    <span className="ml-3 group-hover:text-blue-600">
                      Aplication
                    </span>
                  </Link>
                </li>
                <hr></hr>
                <li>
                  <Link
                    to="/employer/profile"
                    className="text-base text-gray-900 rounded-lg flex items-center p-2 hover:bg-gray-100 group"
                  >
                    <HiInformationCircle className="text-2xl text-gray-500 group-hover:text-blue-600" />
                    <span className="ml-3 group-hover:text-blue-600">
                      Information
                    </span>
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-900 rounded-lg flex items-center p-2 hover:bg-gray-100 group"
                    onClick={() => setShowBox(true)}
                  >
                    <AiFillSetting className="text-2xl text-gray-500 group-hover:text-blue-600" />
                    <span className="ml-3 group-hover:text-blue-600">
                      Change Password
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="text-base text-gray-900 rounded-lg flex items-center p-2 hover:bg-gray-100 group cursor-pointer"
                    onClick={LogoutHandle}
                  >
                    <BiLogOut className="text-2xl text-gray-500 group-hover:text-blue-600" />
                    <span className="ml-3 group-hover:text-blue-600">
                      Log out
                    </span>
                  </a>
                </li>
              </ul>
              <div className="space-y-2 pt-5 flex justify-center">
                <a className="text-white  w-full bg-blue-500 hover:bg-blue-600 font-medium rounded-lg px-5 py-2.5 text-center flex">
                  <GiCutDiamond className="text-2xl mr-2" />
                  <span>Upgrade to Pro</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showBox && localStorage.getItem("employerToken") && (
        <ChangePasswordPageEmployer setShowBox={setShowBox} />
      )}
    </aside>
  );
};
export default NavBar;
