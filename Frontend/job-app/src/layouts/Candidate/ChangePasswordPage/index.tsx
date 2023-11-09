/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import authsAPI from "../../../services/Auths";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AiOutlineClose } from "react-icons/ai";

const ChangePasswordPage: React.FC<{ showBox: any; setShowBox: any }> = (
  props
) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [comfirmNewPassword, setComfirmNewPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (currentPassword && newPassword && comfirmNewPassword) {
      authsAPI
        .changePassword(
          currentPassword,
          newPassword,
          comfirmNewPassword,
          localStorage.getItem("candidateToken") || ""
        )
        .then((res) => {
          props.setShowBox(false);
          localStorage.removeItem("candidateToken");
          
          Swal.fire({
            title: `${res.data}!!! Vui lòng đăng nhập lại`,
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Yes",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        })
        .catch((error: any) => {
          Swal.fire("Thất bại!", error.response.data, "error");
        });
    } else {
      Swal.fire("Thất bại!", "Vui lòng nhập đầy đủ thông tin!", "error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg w-[90%] sm:w-[60%] md:w-1/2 xl:w-1/3 text-sm relative">
        <h1 className="text-lg md:text-lg font-semibold w-full text-center mb-5 uppercase">
          Đổi mật khẩu
        </h1>
        <form onSubmit={handleSubmit}>
          <label className="font-semibold text-sm text-gray-600 pb-1 block">
            Mật khẩu hiện tại:
          </label>
          <input
            type="password"
            value={currentPassword}
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            placeholder="Nhập mật khẩu hiện tại..."
          />
          <label className="font-semibold text-sm text-gray-600 pb-1 block">
            Mật khẩu mới:
          </label>
          <input
            type="password"
            value={newPassword}
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            onChange={(e) => setNewPassword(e.target.value)}
            required
            placeholder="Nhập mật khẩu mới"
          />
          <label className="font-semibold text-sm text-gray-600 pb-1 block">
            Nhập lại mật khẩu:
          </label>
          <input
            type="password"
            value={comfirmNewPassword}
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            onChange={(e) => setComfirmNewPassword(e.target.value)}
            required
            placeholder="Nhập lại mật khẩu mới..."
          />
          <button
            type="submit"
            className="transition duration-200 bg-orangetext hover:bg-[#fe825c] text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block mb-3"
          >
            <span className="inline-block mr-2">Xác nhận</span>
          </button>
        </form>
        <button
          type="button"
          className="text-xl rounded-full bg-white p-2 inline-flex items-center justify-center hover:text-orangetext hover:bg-gray-100  absolute top-0 right-0"
          onClick={() => props.setShowBox(!props.showBox)}
        >
          <AiOutlineClose />
        </button>
      </div>
    </div>
  );
};
export default ChangePasswordPage;
