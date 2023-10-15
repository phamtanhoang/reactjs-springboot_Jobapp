/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { EmployerResponseModel } from "../../../../../models/EmployerResponseModels";
import Swal from "sweetalert2";
import { accountsAPI, employersAPI } from "../../../../../services";

const UpdateEmployer: React.FC<{
  setShowBoxUpdate: any;
  employer?: EmployerResponseModel;
}> = (props) => {
  const [state, setState] = useState(props.employer?.state || "");
  const [name, setName] = useState(props.employer?.name || "");
  const [address, setAddress] = useState(props.employer?.address || "");
  const [description, setDescription] = useState(
    props.employer?.description || ""
  );

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (name.trim() && description.trim() && address.trim() && state.trim()) {
      Swal.fire({
        title: "Do you want to update?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          employersAPI
            .updateEmployerByAdminToken(
              props.employer?.employerId || "",
              state.trim(),
              address.trim(),
              description.trim(),
              name.trim(),
              logoFile || undefined,
              bannerFile || undefined,
              localStorage.getItem("adminToken") || ""
            )
            .then(() => {
              Swal.fire({
                title: "Update employer success",
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
              Swal.fire("Error!", "Update eployer fail!", "error");
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
            props.employer?.accountId || "",
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
      <div className="bg-white rounded-lg shadow relative w-[95%] sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%]">
        <div className="flex items-start justify-between p-2 sm:p-5 pl-5 border-b rounded-t ">
          <h3 className="text-xl font-semibold">Update Employer</h3>
          <button
            type="button"
            className="text-xl text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center"
            onClick={() => props.setShowBoxUpdate(false)}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="rounded-lg p-3 md:p-5 md:py-3 overflow-y-auto max-h-[calc(100vh-150px)]">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-6 gap-4">
              <div className="col-span-6 sm:col-span-3">
                <label className="font-semibold text-sm block text-gray-700">
                  Employer Name:
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Please fill in employer's name..."
                  value={name}
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="font-semibold text-sm block text-gray-700">
                  Email <span className="text-red-500">(Disabled)</span>:
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                  type="text"
                  value={props.employer?.username}
                  disabled
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="font-semibold text-sm block text-gray-700">
                  Address:
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Please fill in employer's address..."
                  value={address}
                  required
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
                  <option value={"pending"}>Pending</option>
                  <option value={"active"}>Active</option>
                  <option value={"refused"}>Denied</option>
                </select>
              </div>
              <div className="col-span-full">
                <label className="font-semibold text-sm block text-gray-700">
                  Description:
                </label>
                <textarea
                  className="border rounded-lg px-3 py-2 mt-1 text-sm w-full h-36"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Decription..."
                  value={description}
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="font-semibold text-sm block text-gray-700">
                  Logo{" "}
                  <span className="text-blue-500 font-normal">(optional)</span>:
                </label>

                <input
                  className="border rounded-lg p-1 mt-1 text-sm w-full"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files && event.target.files[0];
                    if (file) {
                      setLogoFile(file);
                    }
                  }}
                ></input>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="font-semibold text-sm block text-gray-700">
                  Banner{" "}
                  <span className="text-blue-500 font-normal">(optional)</span>:
                </label>
                <input
                  className="border rounded-lg p-1 mt-1 text-sm w-full"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files && event.target.files[0];
                    if (file) {
                      setBannerFile(file);
                    }
                  }}
                ></input>
              </div>
            </div>

            <div className="mt-6 flex justify-between gap-2">
              <div
                className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={changePassword}
              >
                Change Password
              </div>
              <button
                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default UpdateEmployer;
