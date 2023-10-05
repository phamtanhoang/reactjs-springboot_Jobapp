/* eslint-disable @typescript-eslint/no-explicit-any */
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Header: React.FC<{ isNavBarVisible: any; setIsNavBarVisible: any }> = (
  props
) => {
  return (
    <div className="sticky top-0 z-40">
      <div className="w-full h-20 px-6 bg-white border-b flex items-center justify-between">
        <div className="flex">
          <div className="lg:hidden flex items-center mr-4">
            <button
              className="hover:text-blue-500 hover:border-white focus:outline-none navbar-burger"
              onClick={() => props.setIsNavBarVisible(!props.isNavBarVisible)}
            >
              {!props.isNavBarVisible ? (
                <AiOutlineMenu className="h-full text-2xl " />
              ) : (
                <AiOutlineClose className="h-full text-2xl" />
              )}
            </button>
          </div>
          <div className="w-full h-20 border-b flex items-center lg:hidden">
            <p className="font-bold text-3xl text-blue-500 text-center">
              JOBS EMP
            </p>
          </div>
        </div>

        <div className="flex items-center relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            className="fill-current mr-3 hover:text-blue-500"
          >
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"></path>
          </svg>
          <img
            src="https://a7sas.net/wp-content/uploads/2019/07/4060.jpeg"
            className="w-12 h-12 rounded-full shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};
export default Header;
