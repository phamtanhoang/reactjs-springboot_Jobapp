import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineExclamation,
} from "react-icons/ai";
import { EmployerResponseModel } from "../../../../../models/EmployerResponseModels";
import { useEffect, useRef } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
const DetailEmployer: React.FC<{
  setShowBoxDetail: any;
  employer?: EmployerResponseModel;
}> = (props) => {
  const bannerRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (bannerRef.current) {
      const width = bannerRef.current.offsetWidth;
      bannerRef.current.style.height = width / 2 + "px";
    }
  }, []);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50 text-black">
      <div className="bg-white rounded-lg shadow relative w-[95%] sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%]">
        <div className="flex items-start justify-between p-2 sm:p-5 pl-5 border-b rounded-t ">
          <h3 className="text-xl font-semibold">Employer Detail</h3>
          <button
            type="button"
            className="text-xl text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center"
            onClick={() => props.setShowBoxDetail(false)}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="rounded-lg p-4 md:p-5 overflow-y-auto max-h-[calc(100vh-150px)]">
          <div className="w-full bg-white text-gray-700">
            <div className="overflow-hidden">
              <img
                className="w-full"
                src={
                  props.employer?.banner
                    ? props.employer?.banner
                    : "https://res.cloudinary.com/dcpatkvcu/image/upload/v1695882546/light-gray-color-solid-background-1920x1080_kvwkxg.png"
                }
                alt="banner"
                ref={bannerRef}
              />
            </div>
            <div className="-mt-[11%] flex w-[95%] mx-auto">
              <div className="rounded-xl  sm:flex bg-white shadow-lg w-full">
                <div className="w-1/4 p-2 sm:p-5 mx-auto flex items-center">
                  <img
                    className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-xl p-2 border-2 "
                    src={
                      props.employer?.image
                        ? props.employer?.image
                        : "https://res.cloudinary.com/dcpatkvcu/image/upload/v1695807392/DoAnNganh/non-user_lctzz5.jpg"
                    }
                    alt="logo"
                  />
                </div>
                <div className="w-[85%] mx-auto sm:w-3/4  py-2 sm:py-5 flex flex-col justify-center sm:pr-5 text-center sm:text-left">
                  <div className="">
                    <p className="font-bold text-base md:text-xl cursor-default mr-2">
                      {props.employer?.name}
                      {props.employer?.state == "pending" ? (
                        <div className="ml-2 inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-yellow-500 bg-yellow-100/60 text-sm ">
                          <AiOutlineExclamation />
                          <h2 className="text-xs font-normal">Pending</h2>
                        </div>
                      ) : props.employer?.state == "active" ? (
                        <div className="ml-2 inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 text-sm">
                          <AiOutlineCheck />
                          <h2 className="text-xs font-normal">Active</h2>
                        </div>
                      ) : (
                        <div className="ml-2 inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-red-500 bg-red-100/60 text-sm">
                          <AiOutlineClose />
                          <h2 className="text-xs font-normal">Deny</h2>
                        </div>
                      )}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs md:text-sm cursor-default">
                      Address: {props.employer?.address}
                    </p>
                  </div>
                  <div className="mt-2">
                    <a href="#" className="text-xs md:text-sm">
                      Email: {props.employer?.username}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-3 pt-3">
              <h2 className="font-semibold block text-gray-700 mr-2">
                Decription:
              </h2>
              <div className="text-sm md:text-base">
                <p>{props.employer?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailEmployer;
