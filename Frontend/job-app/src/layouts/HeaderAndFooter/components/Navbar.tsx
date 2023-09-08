import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

export const NavBar = () => {
  const [sticky, setSticky] = useState(false);
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 0 ? setSticky(true) : setSticky(false);
    });
  }, []);
  return (
    <nav
      className={`w-full ${
        sticky ? "bg-white text-gray-800 shadow-lg shadow-gray-300/30 fixed left-0 top-0 z-[999]" : ""
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
              <a href="#home">Trang chủ</a>
            </li>
            <li className="px-6 hover:text-orangetext">
              <a href="#jobs">Việc làm</a>
            </li>
            <li className="px-6 hover:text-orangetext">
              <a href="#jobs">Công ty</a>
            </li>
            <li className="px-6 hover:text-orangetext">
              <a href="#jobs">Liên hệ</a>
            </li>
          </ul>
        </div>
        <div className="flex">
          <div className="flex items-center relative md:mx-10 py-3.5">
            {/* <button
              type="button"
              className="flex mr-3 rounded-full md:mr-0"
              onClick={() => setOpenInfo(!openInfo)}
            >
              <img
                className="w-8 h-8 p-1 rounded-full ring-2 ring-orangetext "
                src="https://res.cloudinary.com/dcpatkvcu/image/upload/v1692603729/samples/people/boy-snow-hoodie.jpg"
                alt="user photo"
              />
              <p className="hidden text-xs px-2 pt-1 sm:block">
                Chào <span className="text-sm text-orangetext">Hoàng</span>
                !!!
              </p>
            </button> */}
            <button className="text-white px-5 py-2 rounded-full font-semibold bg-orangetext">
              Đăng nhập
            </button>
            <div
              className={`top-9 -right-8 z-50 absolute my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-2xl ${
                !openInfo ? "hidden" : ""
              }`}
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 ">Phạm Hoàng</span>
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
                  >
                    Đăng xuất
                  </a>
                </li>
              </ul>
            </div>
          </div>
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
                    px-7 py-14 font-medium bg-white top-20  duration-500 ${
                      open ? "left-0" : "-left-full"
                    }`}
        >
          <ul className="flex flex-col justify-center h-full gap-10 text-lg text-center font-medium">
            <li className="px-5 hover:text-orangetext">
              <a href="#home">Trang chủ</a>
            </li>
            <li className="px-5 hover:text-orangetext">
              <a href="#jobs">Việc làm</a>
            </li>
            <li className="px-5 hover:text-orangetext">
              <a href="#home">Công ty</a>
            </li>
            <li className="px-5 hover:text-orangetext">
              <a href="#home">Liên hệ</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
