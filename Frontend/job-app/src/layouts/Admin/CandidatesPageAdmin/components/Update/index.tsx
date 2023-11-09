/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Swal from "sweetalert2";
import { CandidateResponseModel } from "../../../../../models/CandidateResponseModel";
import { accountsAPI, candidatesAPI } from "../../../../../services";
import { AiOutlineClose } from "react-icons/ai";
import ReactQuill from "react-quill";
import { formattedDate } from "../../../../../utils";

const UpdateCandidateAdmin: React.FC<{
  setShowBoxUpdate: any;
  candidate?: CandidateResponseModel;
}> = (props) => {
  const [firstName, setFirstName] = useState(props.candidate?.firstName || "");
  const [lastName, setLastName] = useState(props.candidate?.lastName || "");
  const [dateOfBirth, setDateOfBirth] = useState(
    props.candidate?.dateOfBirth || ""
  );
  const [sex, setSex] = useState(props.candidate?.sex || "");
  const [state, setState] = useState(props.candidate?.state || "");
  const [skill, setSkill] = useState(props.candidate?.skill || "");
  const [experience, setExperience] = useState(
    props.candidate?.experience || ""
  );
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      firstName.trim() &&
      lastName.trim() &&
      dateOfBirth.trim() &&
      sex.trim()
    ) {
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
          candidatesAPI
            .updateCandidateByAdminToken(
              props.candidate?.candidateId || "",
              firstName,
              lastName,
              state,
              dateOfBirth,
              sex,
              skill,
              experience,
              avatar || undefined,
              localStorage.getItem("adminToken") || ""
            )
            .then(() => {
              Swal.fire({
                title: "Update candidate success",
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
            }).finally(() => {
              waitingPopup.close();
            });
        }
      });
    } else {
      Swal.fire("Error!", "Please enter complete information!", "error");
    }
  };

  const changePassword = (e: any) => {
    e.preventDefault();
    Swal.fire({
      title: "Change Password",
      input: "password",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Change",
      showLoaderOnConfirm: true,
      preConfirm: (password) => {
        return accountsAPI
          .changePasswordAccountByAdminToken(
            props.candidate?.accountId || "",
            password,
            localStorage.getItem("adminToken") || ""
          )
          .catch((error: any) => {
            Swal.showValidationMessage(`Request failed: ${error.message}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Change password success",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50 text-black">
      <div className="bg-white rounded-lg shadow relative w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]">
        <div className="flex items-start justify-between p-2 sm:p-5 pl-5 border-b rounded-t ">
          <h3 className="text-xl font-semibold">Update Candidate</h3>
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
            <div className="grid grid-cols-6 gap-3">
              <div className="col-span-6 sm:col-span-3">
                <label className="font-semibold text-sm block text-gray-700">
                  First Name:
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Please fill in first name..."
                  value={firstName}
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
                  value={lastName}
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="font-semibold text-sm block text-gray-700">
                  Email <span className="text-red-500">(Disable)</span>:
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                  type="text"
                  value={props.candidate?.username}
                  disabled
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="font-semibold text-sm block text-gray-700">
                  State:
                </label>
                <select
                  className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value={"active"}>Active</option>
                  <option value={"deny"}>Deny</option>
                </select>
              </div>
              <div className="col-span-6 sm:col-span-2">
                <label className="font-semibold text-sm block text-gray-700">
                  Date of Birth:
                </label>
                <input
                  className="border rounded-lg px-3 py-1 mt-1 mb-3 text-sm w-full"
                  type="Date"
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                  required
                  value={formattedDate(dateOfBirth)}
                />
              </div>
              <div className="col-span-6 sm:col-span-2">
                <label className="font-semibold text-sm block text-gray-700">
                  Sex:
                </label>
                <select
                  className="border rounded-lg px-3 py-2 mt-1 mb-3 text-sm w-full"
                  onChange={(e) => setSex(e.target.value)}
                  value={sex}
                  required
                >
                  <option>Nam</option>
                  <option>Nữ</option>
                  <option>Khác</option>
                </select>
              </div>
              <div className="col-span-6 sm:col-span-2">
                <label className="font-semibold text-sm block text-gray-700">
                  Avatar:
                </label>
                <input
                  className="border rounded-lg p-1 mt-1 text-sm w-full"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files && event.target.files[0];
                    if (file) {
                      setAvatar(file);
                    }
                  }}
                ></input>
              </div>
              <div className="col-span-full">
                <label className="font-semibold text-sm block text-gray-700 mb-1">
                  Skill:
                </label>
                <ReactQuill
                  theme="snow"
                  value={skill}
                  onChange={(e) => setSkill(e)}
                  className="max-h-[40vh] overflow-y-auto"
                />
              </div>
              <div className="col-span-full">
                <label className="font-semibold text-sm block text-gray-700 mb-1">
                  Experience:
                </label>
                <ReactQuill
                  theme="snow"
                  value={experience}
                  onChange={(e) => setExperience(e)}
                  className="max-h-[40vh] overflow-y-auto"
                />
              </div>
            </div>

            <div className="mt-3 flex justify-between gap-2">
              <div
                className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-200 font-medium rounded-lg text-sm px-5 py-2 text-center"
                onClick={changePassword}
              >
                Change Password
              </div>
              <button
                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2 text-center"
                type="submit"
              >
                Update Candidate
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default UpdateCandidateAdmin;
