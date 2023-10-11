/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ErrorBox, Spinner } from "../../../components";
import authsAPI from "../../../services/Auths";
import { EmployerResponseModel } from "../../../models/EmployerResponseModels";
import { BsFillCameraFill } from "react-icons/bs";
import {
  EditBannerEmployer,
  EditLogoEmployer,
  EditProfileEmployer,
} from "./components";

const ProfilePageEmployer = () => {
  const [employer, setEmployer] = useState<EmployerResponseModel>();

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [showBoxChangeBanner, setShowBoxChangeBanner] = useState(false);
  const [showBoxChangeLogo, setShowBoxChangeLogo] = useState(false);
  const [showBoxChangeProfile, setShowBoxChangeProfile] = useState(false);

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
    <>
      <div className="w-[360px] min-[400px]:w-[394px] min-[500px]:w-[480px] sm:w-[600px] md:w-[700px] lg:w-[750px] xl:w-[900px] px-4 mx-auto">
        {showBoxChangeBanner && localStorage.getItem("employerToken") && (
          <EditBannerEmployer setShowChangeBanner={setShowBoxChangeBanner} />
        )}
        {showBoxChangeProfile && localStorage.getItem("employerToken") && (
          <EditProfileEmployer setShowChangeProfile={setShowBoxChangeProfile} />
        )}
        {showBoxChangeLogo && localStorage.getItem("employerToken") && (
          <EditLogoEmployer setShowChangeLogo={setShowBoxChangeLogo} />
        )}
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-xl rounded-lg my-10">
          <div className="overflow-hidden">
            <img
              className="w-[360px] h-[180px] min-[400px]:w-[394px] min-[400px]:h-[197px] min-[500px]:w-[480px] min-[500px]:h-[240px] sm:w-[600px] sm:h-[300px] md:w-[700px] md:h-[350px] lg:w-[750px] lg:h-[375px] xl:w-[900px] xl:h-[450px]"
              src={
                employer?.banner
                  ? employer?.banner
                  : "https://res.cloudinary.com/dcpatkvcu/image/upload/v1695882546/light-gray-color-solid-background-1920x1080_kvwkxg.png"
              }
              alt="banner"
            />
            <div
              className="absolute right-[10px] top-[10px] cursor-pointer flex p-2 sm:p-0 sm:px-5 sm:py-2 rounded-full sm:rounded-xl bg-white text-base sm:text-sm font-semibold"
              onClick={() => setShowBoxChangeBanner(true)}
            >
              <BsFillCameraFill className="sm:mr-2 text-lg " />
              <span className="hidden sm:block">Add cover photo</span>
            </div>
          </div>
          <div className="-mt-[16%] sm:-mt-[14%] md:-mt-[12%]  lg:-mt-[10%] flex mx-auto">
            <div className="rounded-xl sm:flex bg-white shadow-lg">
              <div className="p-2 sm:p-4 mx-auto flex items-center relative">
                <img
                  className="sm:w-[150px] sm:h-[150px] min-[400px]:w-[120px] min-[400px]:h-[120px] w-[100px] h-[100px] border-2"
                  src={
                    employer?.image
                      ? employer?.image
                      : "https://res.cloudinary.com/dcpatkvcu/image/upload/v1695807392/DoAnNganh/non-user_lctzz5.jpg"
                  }
                  alt="logo"
                />
                <div
                  className="absolute right-0 bottom-0 sm:right-1 sm:bottom-1 cursor-pointer flex p-2 rounded-full bg-[#333333] text-sm sm:text-base text-white"
                  onClick={() => setShowBoxChangeLogo(true)}
                >
                  <BsFillCameraFill className="text-lg " />
                </div>
              </div>
            </div>
          </div>
          <div className="px-6">
            <div className="text-center mt-5 md:mt-10">
              <h3 className="text-2xl font-semibold leading-normal mb-2 ">
                {employer?.name}
              </h3>
              <p className="text-sm leading-normal mt-2 mb-3 font-semibold flex justify-center">
                <span>Email: {employer?.username}</span>
              </p>
              <p className="text-sm leading-normal mt-0 mb-2 font-semibold flex justify-center">
                <span>Address: {employer?.address}</span>
              </p>
            </div>
            <div className="mt-5 py-5 mb-7 border-t border-gray-300 text-center">
              <div className="flex justify-center">
                <div className="w-full lg:w-9/12 px-4">
                  <p className="mb-7 text-lg leading-relaxed text-gray-600">
                    {employer?.description}
                  </p>
                  <a
                    className="font-normal px-5 py-2 rounded-lg text-white cursor-pointer bg-blue-500 hover:bg-blue-600"
                    onClick={() => setShowBoxChangeProfile(true)}
                  >
                    Edit Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfilePageEmployer;
