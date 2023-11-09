/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import authsAPI from "../../../../../services/Auths";
import { EmployerModel } from "../../../../../models/EmployerModel";
import { ErrorBox, Spinner } from "../../../../../components";
import Swal from "sweetalert2";
import { employersAPI } from "../../../../../services";

/* eslint-disable @typescript-eslint/no-explicit-any */
const EditProfileEmployer: React.FC<{
  setShowChangeProfile: any;
}> = (props) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const [employer, setEmployer] = useState<EmployerModel>();

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const getEmployer = () => {
      authsAPI
        .currentEmployer(localStorage.getItem("employerToken") || "")
        .then((res) => setEmployer(res.data))
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    getEmployer();
    setName(employer?.name || "");
    setAddress(employer?.address || "");
    setDescription(employer?.description || "");
  }, [employer?.address, employer?.description, employer?.name]);

  if (isLoading) {
    return (
      <div className="flex-grow">
        <Spinner />
      </div>
    );
  }

  if (httpError) {
    return (
      <div className="flex-grow w-5/6 sm:w-3/4 mx-auto my-10">
        <ErrorBox text={httpError} />
      </div>
    );
  }

  const closedBox = () => {
    setName(employer?.name || "");
    setAddress(employer?.address || "");
    setDescription(employer?.description || "");
    props.setShowChangeProfile(false);
  };

  const handleEditProfile = (e: any) => {
    e.preventDefault();
    if (name && address && description) {
      Swal.fire({
        title: "Do you want to edit?",
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
          employersAPI
            .updateProfile(
              name.trim(),
              address.trim(),
              description.trim(),
              localStorage.getItem("employerToken") || ""
            )
            .then(() => {
              Swal.fire({
                title: "Update job success",
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
              Swal.fire("Error!", "Update candidate profile error!", "error");
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
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow relative w-[85%] sm:w-[70%] md:w-[50%] xl:w-[40%]">
        <div className="flex items-start justify-between p-2 sm:p-5 pl-5 border-b rounded-t">
          <h3 className="text-xl font-semibold">Edit Profile</h3>
          <button
            type="button"
            className="text-xl text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center"
            onClick={closedBox}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="p-2 sm:p-5 space-y-6">
          <form onSubmit={handleEditProfile}>
            <div className="mb-2">
              <label className="font-semibold text-sm text-gray-600 block">
                Tên:
              </label>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 mt-1  w-full text-sm"
                onChange={(e) => setName(e.target.value)}
                placeholder="Please enter employer name..."
                value={name}
                required
              />
            </div>
            <div className="mb-2">
              <label className="font-semibold text-sm text-gray-600  block">
                Địa chỉ:
              </label>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 mt-1  w-full text-sm"
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Please enter address..."
                value={address}
                required
              />
            </div>
            <div className="mb-2">
              <label className="font-semibold text-sm text-gray-600 block">
                Mô tả:
              </label>
              <textarea
                className="border rounded-lg px-3 py-1 mt-1  w-full text-sm h-[150px]"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please enter description..."
                value={description}
                required
              />
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="submit"
              >
                Change
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditProfileEmployer;
