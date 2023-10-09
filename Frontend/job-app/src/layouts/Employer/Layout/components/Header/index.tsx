/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { EmployerModel } from "../../../../../models/EmployerModel";
import authsAPI from "../../../../../services/Auths";
import { ErrorBox, Spinner } from "../../../../../components";

const Header: React.FC<{ isNavBarVisible: any; setIsNavBarVisible: any }> = (
  props
) => {
  const [employer, setEmployer] = useState<EmployerModel>();

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchEmployer = () => {
      authsAPI
        .currentEmployer(localStorage.getItem("employerToken") || "")
        .then((res) => {
          setEmployer(res.data);
        })
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchEmployer();
  }, []);

  if (isLoading) {
    return (
      <div className="flex-grow">
        <Spinner />
      </div>
    );
  }

  if (httpError) {
    return (
      <div className="flex-grow w-5/6 sm:w-3/4 mx-auto my-10">
        <ErrorBox text={httpError} />
      </div>
    );
  }

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
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            className="fill-current mr-3 hover:text-blue-500"
          >
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"></path>
          </svg> */}
          <Link to="/employer/profile">
            <img
              src={
                employer?.image
                  ? employer?.image
                  : "https://res.cloudinary.com/dcpatkvcu/image/upload/v1695807392/DoAnNganh/non-user_lctzz5.jpg"
              }
              className="w-10 h-10 rounded-lg ring-2 ring-blue-500"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Header;
