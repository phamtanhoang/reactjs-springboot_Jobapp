/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import authsAPI from "../../../../../services/Auths";
import { CandidateResponseModel } from "../../../../../models/CandidateResponseModel";
import { ChangePasswordPage } from "../../..";

const NavBar = () => {
  const [sticky, setSticky] = useState(false);
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [candidateToken, setCandidateToken] = useState("");
  const [showBox, setShowBox] = useState(false);

  const [candidateRes, setCandidateRes] = useState<CandidateResponseModel>();

  useEffect(() => {
    setCandidateToken(localStorage.getItem("candidateToken") || "");

    window.addEventListener("scroll", () => {
      window.scrollY > 0 ? setSticky(true) : setSticky(false);
    });

    if (candidateToken) {
      authsAPI
        .currentCandidate(candidateToken)
        .then((res) => {
          setCandidateRes(res.data);
        })
        .catch((error: any) => {
          console.log(error.message);
        });
    }
  }, [candidateToken, localStorage.getItem("candidateToken")]);

  const LogoutHandle = () => {
    Swal.fire({
      title: "Bạn có muốn đăng xuất?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("candidateToken");
        window.location.reload();
      }
    });
  };

  return (
    <>
      <nav
        className={`w-full  bg-white ${
          sticky
            ? " shadow-lg shadow-gray-300/30 z-[999] fixed left-0 top-0"
            : ""
        }`}
      >
        <div className="flex item-center justify-between">
          <div className="mx-10 py-3.5">
            <a href="#home">
              <img
                src="https://res.cloudinary.com/dcpatkvcu/image/upload/v1692603983/DoAnNganh/logo_afswhb.png"
                alt="logo"
                className="h-9"
              />
            </a>
          </div>
          <div
            className={`text-gray-800 lg:block hidden px-7 py-2.5 ${
              sticky ? "bg-white" : ""
            }`}
          >
            <ul className="flex item-center gap-1 py-2 text-lg font-medium">
              <li className="px-6 hover:text-orangetext">
                <NavLink className="nav-link" to="/home">
                  Trang chủ
                </NavLink>
              </li>
              <li className="px-6 hover:text-orangetext">
                <NavLink className="nav-link" to="/home/jobs">
                  Việc làm
                </NavLink>
              </li>
              <li className="px-6 hover:text-orangetext">
                <NavLink className="nav-link" to="/home/employers">
                  Nhà tuyển dụng
                </NavLink>
              </li>
              <li className="px-6 hover:text-orangetext">
                <NavLink className="nav-link" to="/home/blogs">
                  Blog
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="flex">
            {candidateToken ? (
              <>
                <div className="flex items-center relative md:mx-10 py-3.5 ">
                  <button
                    type="button"
                    className="flex mr-3 rounded-full md:mr-0 group"
                    onClick={() => setOpenInfo(!openInfo)}
                  >
                    {candidateRes?.avatar ? (
                      <>
                        <img
                          className="w-8 h-8 rounded-full ring-2 ring-orangetext group-hover:ring-[#fe825c]"
                          src={candidateRes.avatar}
                          alt="user photo"
                        />
                      </>
                    ) : (
                      <>
                        <img
                          className="w-8 h-8 rounded-full ring-2 ring-orangetext group-hover:ring-[#fe825c]"
                          src="https://res.cloudinary.com/dcpatkvcu/image/upload/v1695807392/DoAnNganh/non-user_lctzz5.jpg"
                          alt="user photo"
                        />
                      </>
                    )}

                    <p className="hidden text-xs px-2 pt-1 sm:block">
                      Chào{" "}
                      <span className="text-sm text-orangetext group-hover:text-[#fe825c]">
                        {candidateRes?.lastName}
                      </span>
                      !!!
                    </p>
                  </button>
                  <div
                    className={`top-9 -right-8 absolute my-4 text-base list-none  bg-[#fffefe] divide-y divide-gray-200 rounded-lg shadow-2xl z-[999] ${
                      !openInfo ? "hidden" : ""
                    }`}
                    id="user-dropdown"
                  >
                    <div className="px-4 py-3">
                      <span className="block text-sm text-gray-900 ">
                        {candidateRes?.firstName} {candidateRes?.lastName}
                      </span>
                      <span className="block text-xs text-gray-500 truncate ">
                        {candidateRes?.username}
                      </span>
                    </div>
                    <ul className="py-2 w-[200px]">
                      <li>
                        <Link
                          to="/home/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orangetext"
                        >
                          Quản lý hồ sơ
                        </Link>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orangetext"
                        >
                          Công việc đã ứng tuyển
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orangetext"
                          onClick={() => setShowBox(!showBox)}
                        >
                          Đổi mật khẩu
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orangetext"
                          onClick={LogoutHandle}
                        >
                          Đăng xuất
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <Link
                to="/home/login"
                className="text-white my-3 px-5 py-2 lg:mx-10 rounded-lg font-semibold bg-orangetext hover:bg-[#fe825c] hover:ring-1 hover:ring-[#fe825c]"
              >
                Đăng nhập
              </Link>
            )}
            <div
              onClick={() => setOpen(!open)}
              className={`z-[999] text-3xl lg:hidden text-orangetext m-5 md:mr-10`}
            >
              {!open ? (
                <AiOutlineMenu className="h-full text-2xl " />
              ) : (
                <AiOutlineClose className="h-full text-2xl" />
              )}
            </div>
          </div>

          <div
            className={`lg:hidden text-gray-700 absolute w-full 
                    px-7 py-14 font-medium bg-white top-20  duration-500 z-[99999] ${
                      open ? "left-0" : "-left-full"
                    }`}
          >
            <ul className="flex flex-col justify-center h-full gap-10 text-lg text-center font-medium">
              <li className="px-5 hover:text-orangetext">
                <NavLink className="nav-link" to="/home">
                  Trang chủ
                </NavLink>
              </li>
              <li className="px-5 hover:text-orangetext">
                <NavLink className="nav-link" to="/home/jobs">
                  Công việc
                </NavLink>
              </li>
              <li className="px-5 hover:text-orangetext">
                <NavLink className="nav-link" to="/home/employers">
                  Nhà tuyển dụng
                </NavLink>
              </li>
              <li className="px-5 hover:text-orangetext">
                <NavLink className="nav-link" to="/home/blogs">
                  Blog
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {showBox && localStorage.getItem("candidateToken") && (
        <>
          <ChangePasswordPage showBox={showBox} setShowBox={setShowBox} />
        </>
      )}
    </>
  );
};
export default NavBar;
