/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import authsAPI from "../../../../../services/Auths";
import Swal from "sweetalert2";

const NavBar = () => {
  const [sticky, setSticky] = useState(false);
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [candidateToken, setCandidateToken] = useState("");
  useEffect(() => {
    setCandidateToken(localStorage.getItem("candidateToken") || "");

    window.addEventListener("scroll", () => {
      window.scrollY > 0 ? setSticky(true) : setSticky(false);
    });

    if (candidateToken) {
      const fetchUserReviewBook = async () => {
        const url = "http://localhost:8080/api/candidates/profile";
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `${candidateToken}`,
            "Content-Type": "application/json",
          },
        };
        const userReview = await fetch(url, requestOptions);
        if (!userReview.ok) {
          throw new Error("Something went wrong");
        }
        // const userReviewResponseJson = await userReview.json();
        console.log(userReview);
      };
      fetchUserReviewBook().catch((error: any) => {
        console.log(error.message);
      });

      // fetch("http://localhost:8080/api/candidates/profile", {
      //   headers: {
      //     Authorization: `Bearer ${candidateToken}`,
      //   },
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     console.log(data);
      //   })
      //   .catch((error) => {
      //     console.error("Lỗi khi lấy hồ sơ ứng viên:", error);
      //   });
    }
  }, [candidateToken, localStorage.getItem("candidateToken")]);

  const LogoutHandle = () => {
    // authsAPI
    //   .logout(candidateToken)
    //   .then((res) => console.log(res))
    //   .catch((error: any) => console.log(error.message));

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
    <nav
      className={`w-full  bg-white ${
        sticky ? " shadow-lg shadow-gray-300/30 z-[999] fixed left-0 top-0" : ""
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
                  <img
                    className="w-8 h-8 p-1 rounded-full ring-2 ring-orangetext group-hover:ring-[#fe825c]"
                    src="https://res.cloudinary.com/dcpatkvcu/image/upload/v1692603729/samples/people/boy-snow-hoodie.jpg"
                    alt="user photo"
                  />
                  <p className="hidden text-xs px-2 pt-1 sm:block">
                    Chào{" "}
                    <span className="text-sm text-orangetext group-hover:text-[#fe825c]">
                      Hoàng
                    </span>
                    !!!
                  </p>
                </button>
                <div
                  className={`top-9 -right-8 z-50 absolute my-4 text-base list-none bg-[#fffefe] divide-y divide-gray-200 rounded-lg shadow-2xl ${
                    !openInfo ? "hidden" : ""
                  }`}
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 ">
                      Phạm Hoàng
                    </span>
                    <span className="block text-xs text-gray-500 truncate ">
                      phamtanhoang@gmail.com
                    </span>
                  </div>
                  <ul className="py-2">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orangetext"
                      >
                        Quản lý hồ sơ
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
  );
};
export default NavBar;
