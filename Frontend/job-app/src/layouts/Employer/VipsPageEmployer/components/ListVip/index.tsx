/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { VipDetail } from "..";
import { VipModel } from "../../../../../models/VipModel";
import { employersAPI } from "../../../../../services";
import { ErrorBox, Spinner } from "../../../../../components";
import { BsTelephoneForward } from "react-icons/bs";
import { FaCcVisa } from "react-icons/fa";
const ListVipEmployer = () => {
  const [vips, setVips] = useState<VipModel[]>([]);
  const [selectedVip, setSelectedVip] = useState<VipModel>();

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchVips = () => {
      employersAPI
        .getAllVipOfEmployer(localStorage.getItem("employerToken") || "")
        .then((res) => {
          setVips(res.data);
          setSelectedVip(res.data[0]);
        })
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchVips();
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
      <div className="flex-grow px-6 mx-auto">
        <ErrorBox text={httpError} />
      </div>
    );
  }

  return (
    <div className="m-auto px-6  md:px-12 lg:px-20">
      <div className="mt-12 m-auto -space-y-4 items-center justify-center flex flex-col-reverse  md:flex-row md:space-y-0 md:-space-x-4 xl:w-10/12">
        <div className="relative group w-[90%] min-[550px]:w-[70%]  md:w-7/12 mx-5 md:mx-0">
          <div
            aria-hidden="true"
            className="absolute top-0 w-full h-full rounded-lg rounded-t-none md:rounded-t-lg bg-white shadow-lg"
          ></div>
          <div className="relative p-10">
            <div className="space-x-2 text-blue-600">
              <h3 className="font-semibold lg:text-lg">
                Choose a pricing plan:
              </h3>
            </div>
            <div className="flex flex-wrap my-5 justify-center">
              {vips.map((vip) => (
                <div key={vip.id} className="m-1">
                  <button
                    type="button"
                    className={`uppercase w-[100px]  tracking-wide  font-bold rounded border-2  hover:border-blue-500 hover:bg-blue-500 hover:text-white shadow-md py-2 ${
                      vip == selectedVip
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "bg-white text-gray-700 border-blue-500"
                    }`}
                    onClick={() => setSelectedVip(vip)}
                  >
                    <span className="mx-auto">{vip.name}</span>
                  </button>
                </div>
              ))}
            </div>
            <div className="">
              <div className="text-gray-600 font-normal text-sm lg:text-base flex mb-2">
                <span>Allow payment:</span>
                <a className="flex space-x-2 items-center text-blue-600 group ml-3">
                  <img
                    src="https://res.cloudinary.com/dcpatkvcu/image/upload/v1697614563/DoAnNganh/780370_tshezr.png"
                    alt="pay"
                    className="h-[20px] lg:h-[25px]"
                  />
                </a>
              </div>
              <div className="text-gray-600 font-normal text-sm lg:text-base flex">
                <span>Call us at:</span>
                <a
                  href="tel:+0123456789"
                  className="flex space-x-2 items-center text-blue-600 group ml-3"
                >
                  <BsTelephoneForward className="text-lg" />
                  <span className="font-semibold group-hover:underline">
                    + 0123456789
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <VipDetail vip={selectedVip} />
      </div>
    </div>
  );
};
export default ListVipEmployer;
