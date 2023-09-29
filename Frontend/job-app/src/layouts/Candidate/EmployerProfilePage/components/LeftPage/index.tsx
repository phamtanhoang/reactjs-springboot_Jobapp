import { useEffect, useState } from "react";
import { EmployerModel } from "../../../../../models/EmployerModel";
import { AccountModel } from "../../../../../models/AccountModel";
import { accountsAPI } from "../../../../../services";

export const LeftPage: React.FC<{
  employer?: EmployerModel;
}> = (props) => {
  const [account, setAccount] = useState<AccountModel>();

  useEffect(() => {
    const getAccountById = () => {
      if (props.employer?.accountId) {
        accountsAPI.getAccountByID(props.employer?.accountId).then((res) => {
          setAccount(res.data);
        });
      }
    };
    getAccountById();
  }, [props.employer?.accountId]);

  return (
    <div className="w-full lg:w-[65%]">
      <div className="w-full bg-white">
        <div className="overflow-hidden">
          <img
            className="w-full"
            src={
              props.employer?.banner
                ? props.employer?.banner
                : "https://res.cloudinary.com/dcpatkvcu/image/upload/v1695882546/light-gray-color-solid-background-1920x1080_kvwkxg.png"
            }
            alt="banner"
          />
        </div>
        <div className="-mt-[11%] flex w-[95%] mx-auto">
          <div className="rounded-xl  sm:flex bg-white shadow-lg">
            <div className="w-1/4 p-2 sm:p-5 mx-auto flex items-center">
              <img
                className="w-full rounded-xl p-2 border-2 "
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
                <p className="font-bold text-base md:text-xl cursor-default">
                  {props.employer?.name}
                </p>
              </div>
              <div className="mt-2">
                <p className="text-xs md:text-sm cursor-default">
                  Địa chỉ: {props.employer?.address}
                </p>
              </div>
              <div className="mt-2">
                <a href="#" className="text-xs md:text-sm">
                  Email: {account?.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className=" w-[90%] mx-auto py-10">
          <h2 className="mb-3 text-base md:text-lg font-bold text-[#333333]">
            Mô tả
          </h2>
          <div className="text-sm md:text-base ">
            <p>{props.employer?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
