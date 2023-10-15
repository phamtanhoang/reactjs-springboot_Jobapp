import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Swal from "sweetalert2";
import { candidatesAPI } from "../../../../../services";

/* eslint-disable @typescript-eslint/no-explicit-any */
const AddCandidateAdmin: React.FC<{ setShowBoxAdd: any }> = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [sex, setSex] = useState("Nam");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      username.trim() &&
      password.trim() &&
      confirmpPassword.trim() &&
      firstName.trim() &&
      lastName.trim() &&
      dateOfBirth.trim() &&
      sex.trim()
    ) {
      Swal.fire({
        title: "Do you want to add?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          if (password.trim() == confirmpPassword.trim()) {
            candidatesAPI
              .addCandidateByAdminToken(
                username.trim(),
                password.trim(),
                firstName.trim(),
                lastName.trim(),
                dateOfBirth.trim(),
                sex.trim(),
                localStorage.getItem("adminToken") || ""
              )
              .then(() => {
                Swal.fire({
                  title: "Add new candidate success",
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
                Swal.fire("Error!", error.response.data, "error");
              });
          } else {
            Swal.fire("Error!", "Confirm password is incorrect!", "error");
          }
        }
      });
    } else {
      Swal.fire("Error!", "Please enter complete information!", "error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50 text-black">
      <div className="bg-white rounded-lg shadow relative w-[90%] sm:w-[75%] md:w-[65%] lg:w-[50%] xl:w-[40%]">
        <div className="flex items-start justify-between p-2 sm:p-5 pl-5 border-b rounded-t ">
          <h3 className="text-xl font-semibold">Add Employer</h3>
          <button
            type="button"
            className="text-xl text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center"
            onClick={() => props.setShowBoxAdd(false)}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="rounded-lg p-3 md:p-5 overflow-y-auto max-h-[calc(100vh-150px)]">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-6 gap-4">
              <div className="col-span-6 sm:col-span-3">
                <label className="font-semibold text-sm block text-gray-700">
                  First Name:
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Please fill in first name..."
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="font-semibold text-sm block text-gray-700">
                  Last Name:
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Please fill in last name..."
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="font-semibold text-sm block text-gray-700">
                  Date of Birth:
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 mb-3 text-sm w-full"
                  type="Date"
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="font-semibold text-sm block text-gray-700">
                  Sex:
                </label>
                <select
                  className="border rounded-lg px-3 py-2 mt-1 mb-3 text-sm w-full"
                  onChange={(e) => setSex(e.target.value)}
                  required
                >
                  <option>Nam</option>
                  <option>Nữ</option>
                  <option>Khác</option>
                </select>
              </div>
              <div className="col-span-full">
                <label className="font-semibold text-sm block text-gray-700">
                  Username:
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                  type="email"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Please fill in username ..."
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="font-semibold text-sm block text-gray-700">
                  Password:
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Please fill in password ..."
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="font-semibold text-sm block text-gray-700">
                  Confirm Password:
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Please fill in confirm password ..."
                  required
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="submit"
              >
                Add Candidate
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddCandidateAdmin;
