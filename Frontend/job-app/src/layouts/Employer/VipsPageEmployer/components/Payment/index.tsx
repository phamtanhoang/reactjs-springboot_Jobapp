/* eslint-disable @typescript-eslint/no-explicit-any */
import { VipModel } from "../../../../../models/VipModel";
import { paymentsAPI } from "../../../../../services";

const Payment: React.FC<{ setShowBox: any; vip?: VipModel }> = (props) => {
  const handleSubmit = () => {
    paymentsAPI
      .payment(props.vip?.id || "", localStorage.getItem("employerToken") || "")
      .then((res) => (window.location.href = res.data));
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow relative w-[90%] sm:w-[70%] md:w-[48%] lg:w-[40%] xl:w-[35%]">
        <header className="text-center px-5 pb-3">
          <img
            src="https://res.cloudinary.com/dcpatkvcu/image/upload/v1697614562/DoAnNganh/Wallet_kiyuuh.jpg"
            alt="logo"
            className="inline-flex -mt-9 w-[72px] h-[72px] fill-current rounded-full border-4 border-white box-content shadow mb-3"
          />
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            Invoice from JOBS.
          </h3>
          <div className="text-sm font-medium text-gray-500">
            Invoice #00224
          </div>
        </header>

        <div className="bg-gray-100 px-6 pt-4 pb-6">
          <div className="text-lg mb-5 text-center">
            Price:
            <strong className="font-semibold text-red-500">
              {" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(props.vip?.price || 0)}
            </strong>
          </div>
          <form className="space-y-3">
            <div className="mb-2">
              <label className="font-semibold text-base ml-1">Bank name:</label>
              <div>
                <select className="form-select w-full px-3 py-2 mt-1 text-sm border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors cursor-pointer">
                  <option value="ACB">ACB</option>
                  <option value="Techcombank">Techcombank</option>
                </select>
              </div>
            </div>
            <div className="mb-2">
              <label className="font-semibold text-base ml-1">
                Content payment:
              </label>
              <div>
                <textarea
                  className="h-[100px] w-full px-3 py-2 mt-1 text-sm border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-600 transition-colors"
                  placeholder="Content payment..."
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => props.setShowBox(false)}
                className="font-semibold text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow transition duration-150 ease-in-out w-full bg-red-500 hover:bg-red-600 text-white focus:outline-none focus-visible:ring-2"
              >
                Cancel
              </button>
              <a
                href="#"
                className="font-semibold text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow transition duration-150 ease-in-out w-full bg-blue-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2"
                onClick={handleSubmit}
              >
                Pay Now
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Payment;
