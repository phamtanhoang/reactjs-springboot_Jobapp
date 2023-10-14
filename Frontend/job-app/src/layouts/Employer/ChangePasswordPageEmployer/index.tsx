/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import authsAPI from "../../../services/Auths";
import Swal from "sweetalert2";
import { AiOutlineClose } from "react-icons/ai";

const ChangePasswordPageEmployer: React.FC<{ setShowBox?: any }> = (
  props
) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [comfirmNewPassword, setComfirmNewPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (currentPassword && newPassword && comfirmNewPassword) {
      Swal.fire({
        title: "Do you want change password?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          authsAPI
            .changePassword(
              currentPassword,
              newPassword,
              comfirmNewPassword,
              localStorage.getItem("employerToken") || ""
            )
            .then(() => {
              Swal.fire({
                title: "Please login again!!!",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Yes",
              }).then((result) => {
                if (result.isConfirmed) {
                  localStorage.removeItem("employerToken");
                  window.location.reload();
                }
              });
            })
            .catch((error: any) => {
              Swal.fire("Error!", error.response.data, "error");
            });
        }
      });
    } else {
      Swal.fire("Error", "Please enter complete information!", "error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow relative w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%]">
        <div className="flex items-start justify-between p-2 sm:p-5 pl-5 border-b rounded-t">
          <h3 className="text-xl font-semibold">Change Password</h3>
          <button
            type="button"
            className="text-xl text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center"
            onClick={() => props.setShowBox(false)}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="rounded-lg p-3 md:p-5 overflow-y-auto max-h-[calc(100vh-150px)]">
          <form onSubmit={handleSubmit}>
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Current Password:
            </label>
            <input
              type="password"
              value={currentPassword}
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              placeholder="********"
            />
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              New Password:
            </label>
            <input
              type="password"
              value={newPassword}
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="********"
            />
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Comfirm New Password:
            </label>
            <input
              type="password"
              value={comfirmNewPassword}
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              onChange={(e) => setComfirmNewPassword(e.target.value)}
              required
              placeholder="********"
            />
            <button
              type="submit"
              className="transition duration-200 bg-blue-500 hover:bg-blue-600 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block mb-3"
            >
              <span className="inline-block mr-2">Change</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ChangePasswordPageEmployer
