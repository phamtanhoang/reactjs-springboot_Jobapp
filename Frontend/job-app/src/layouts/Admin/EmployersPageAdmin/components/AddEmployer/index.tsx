  /* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Swal from "sweetalert2";
import { categoriesAPI, employersAPI, jobsAPI } from "../../../../../services";
import ReactQuill from "react-quill";
import { ErrorBox, Spinner } from "../../../../../components";

const AddEmployer: React.FC<{ setShowBoxAdd: any }> = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");



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

  const handleDescriptionChange = (content: string) => {
    setDescription(content);
  };


  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      username.trim() &&
      password.trim() &&
      address.trim() &&
      description.trim()
    ) {
      Swal.fire({
        title: "Do you want to add?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed&& password.trim()==confirmpPassword.trim()) {
          employersAPI
            .addEmployerByAdminToken(
              username.trim(),
              password.trim(),
              name.trim(),
              address.trim(),
              description.trim(),
              localStorage.getItem("adminToken") || ""
            )
            .then(() => {
              Swal.fire({
                title: "Add new employer success",
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
              Swal.fire("Error!", "Add new employer error!", "error");
            });
        }
      });
    } else {
      Swal.fire("Error!", "Please enter complete information!", "error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50 text-black">
      <div className="bg-white rounded-lg shadow relative w-[95%] sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%]">
        <div className="flex items-start justify-between p-2 sm:p-5 pl-5 border-b rounded-t ">
          <h3 className="text-xl font-semibold">Add Job</h3>
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
              <div className="col-span-6 sm:col-span-3">
                <label className="font-semibold text-sm block text-gray-700">
                  Employer Name
                </label>
                <input
                    className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Please fill in employer's name..."
                    required
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label className="font-semibold text-sm block text-gray-700">
                  Address
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Please fill in employer's address..."
                  required
                />
              </div>

              <div className="col-span-full">
                <label className="font-semibold text-sm block text-gray-700">
                  Description:
                </label>
                <ReactQuill
                  theme="snow"
                  onChange={handleDescriptionChange}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="submit"
              >
                Add Employer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  return(<h1>2</h1>)
};
export default AddEmployer;
