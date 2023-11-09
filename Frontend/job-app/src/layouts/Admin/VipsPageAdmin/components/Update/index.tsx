import { useState } from "react";
import { VipModel } from "../../../../../models/VipModel";
import { AiOutlineClose } from "react-icons/ai";
import Swal from "sweetalert2";
import vipsAPI from "../../../../../services/Vips";

/* eslint-disable @typescript-eslint/no-explicit-any */
const UpdateVipAdmin: React.FC<{ setShowBoxUpdate: any; vip?: VipModel }> = (
  props
) => {
  const [name, setName] = useState(props.vip?.name || "");
  const [amount, setAmount] = useState(props.vip?.amount || 1);
  const [price, setPrice] = useState(props.vip?.price || 0);
  const [state, setState] = useState(props.vip?.state || "");

  const handleAmountChange = (event: any) => {
    const inputAmount: number = parseInt(event.target.value, 10); // Chuyển đổi thành số nguyên
    if (!isNaN(inputAmount)) {
      setAmount(inputAmount);
    }
  };

  const handlePriceChange = (event: any) => {
    const inputPrice: number = parseInt(event.target.value, 10); // Chuyển đổi thành số nguyên
    if (!isNaN(inputPrice)) {
      setPrice(inputPrice);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (name.trim() && amount && price && state.trim()) {
      Swal.fire({
        title: "Do you want to update?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          const waitingPopup: any = Swal.fire({
            title: "Waiting...",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
          vipsAPI
            .updateVipByAdminToken(
              props.vip?.id || "",
              name.trim(),
              amount,
              price,
              state.trim(),
              localStorage.getItem("adminToken") || ""
            )
            .then(() => {
              Swal.fire({
                title: "Update vip success",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Yes",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            })
            .catch(() => {
              Swal.fire("Error!", "Update vip fail!", "error");
            })
            .finally(() => {
              waitingPopup.close();
            });
        }
      });
    } else {
      Swal.fire("Error!", "Please enter complete information!", "error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50 text-black">
      <div className="bg-white rounded-lg shadow relative w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%]">
        <div className="flex items-start justify-between p-2 sm:p-5 pl-5 border-b rounded-t ">
          <h3 className="text-xl font-semibold">Update Vip</h3>
          <button
            type="button"
            className="text-xl text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center"
            onClick={() => props.setShowBoxUpdate(false)}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="rounded-lg p-3 md:p-5 overflow-y-auto max-h-[calc(100vh-150px)]">
          <form onSubmit={handleSubmit}>
            <div className="col-span-6 sm:col-span-3">
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Vip name:
              </label>
              <input
                type="text"
                value={name}
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter name..."
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Amount (Month):
              </label>
              <input
                type="number"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={amount}
                onInput={handleAmountChange}
                min="1"
                step="1"
                placeholder="Enter amount..."
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Price (VNĐ):
              </label>
              <input
                type="number"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={price}
                onInput={handlePriceChange}
                min="0"
                step="1000"
                placeholder="Enter price..."
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label className="font-semibold text-sm block text-gray-700">
                State:
              </label>
              <select
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value={"active"}>Active</option>
                <option value={"inactive"}>Inactive</option>
              </select>
            </div>
            <button
              type="submit"
              className="mt-2 transition duration-200 bg-purple-500 hover:bg-purple-600 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block mb-3"
            >
              <span className="inline-block mr-2">Update Vip</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default UpdateVipAdmin;
