import { AiOutlineArrowRight } from "react-icons/ai";
import { VipModel } from "../../../../../models/VipModel";
import { useState } from "react";
import { Payment } from "..";

const VipDetail: React.FC<{ vip?: VipModel }> = (props) => {
  const [showBox, setShowBox] = useState(false);
  return (
    <>
      <div className="relative z-10 group w-full min-[550px]:w-[80%] md:w-5/12 ">
        <div
          aria-hidden="true"
          className="absolute top-0 w-full h-full rounded-2xl bg-white shadow-xl transition duration-500 group-hover:scale-105 lg:group-hover:scale-110"
        ></div>
        <div className="relative p-6  min-[400px]:p-14 md:p-10 space-y-6 ">
          <h3 className="text-4xl text-gray-700 font-bold text-center">
            {props.vip?.name}
          </h3>
          <div className="text-center">
            <p className="text-3xl text-red-500 font-bold ">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(props.vip?.price || 0)}
            </p>
          </div>
          <div className="text-center mt-2">
            <div className="text-gray-600 font-semibold italic text-lg">
              {props.vip?.amount} month(s)
            </div>
          </div>

          <p className="flex items-center justify-center space-x-4 text-gray-500 text-center text-sm">
          This vip will start to apply on 6/9/2024 and end on 6/12/2024.
          </p>
          <button
            type="button"
            className="w-full py-3 px-6 text-center rounded-xl transition text-white bg-gradient-to-r from-blue-400  to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg font-medium text-sm flex justify-center gap-2"
            onClick={() => {
              setShowBox(true);
            }}
          >
            <span className="text-white font-semibold">Check out</span>
            <AiOutlineArrowRight className="text-base" />
          </button>
        </div>
      </div>
      {showBox && localStorage.getItem("employerToken") && (
        <Payment setShowBox={setShowBox} vip={props.vip} />
      )}
    </>
  );
};
export default VipDetail;
