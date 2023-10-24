/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { AiFillCrown, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { EmployerModel } from "../../../../../models/EmployerModel";
import authsAPI from "../../../../../services/Auths";
import { ErrorBox, Spinner } from "../../../../../components";
import { employersAPI } from "../../../../../services";

const Header: React.FC<{ isNavBarVisible: any; setIsNavBarVisible: any }> = (
  props
) => {
  const [employer, setEmployer] = useState<EmployerModel>();
  const [isVip, setIsVip] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
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

    const checkVip = () => {
      setIsLoading(true);
      employersAPI
        .isEmployerVip(localStorage.getItem("employerToken") || "")
        .then((res) => setIsVip(res.data))
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    checkVip();
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
    <div className="sticky top-0 z-[49]">
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
          <Link to="/employer/profile">
            <img
              src={
                employer?.image
                  ? employer?.image
                  : "https://res.cloudinary.com/dcpatkvcu/image/upload/v1695807392/DoAnNganh/non-user_lctzz5.jpg"
              }
              className="w-10 h-10 rounded-lg ring-2"
            />
          </Link>
          {isVip && (
            <AiFillCrown className="absolute -right-3 -top-3 text-xl transform rotate-45 text-yellow-500" />
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
