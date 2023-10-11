import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { EmployerResponseModel } from "../../../../../models/EmployerResponseModels";
import authsAPI from "../../../../../services/Auths";
import { ErrorBox, Spinner } from "../../../../../components";
import Swal from "sweetalert2";
import { employersAPI } from "../../../../../services";

/* eslint-disable @typescript-eslint/no-explicit-any */
const EditLogoEmployer: React.FC<{
  setShowChangeLogo: any;
}> = (props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [employer, setEmployer] = useState<EmployerResponseModel>();

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchEmployer = () => {
      authsAPI
        .currentEmployer(localStorage.getItem("employerToken") || "")
        .then((res) => {
          setEmployer(res.data);
        })
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchEmployer();
  }, []);

  if (isLoading) {
    return (
      <div className="flex-grow z-2000">
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
  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const changeLogo = (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("employerToken") || "";
    if (token) {
      if (selectedFile) {
        Swal.fire({
          title: "Confirm logo change?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Accept",
        }).then((result) => {
          if (result.isConfirmed) {
            setIsLoading(true);
            employersAPI
              .updateLogo(selectedFile, token)
              .then(() => {
                Swal.fire("Success!", "Change logo succsess!", "success").then(
                  (result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                  }
                );
              })
              .catch(() => {
                Swal.fire("Fail!", "Change logo fail!", "error");
              })
              .finally(() => {
                setIsLoading(false);
              });
          }
        });
      } else {
        Swal.fire("Fail!", "Please choose image!!!", "error");
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow relative">
        <div className="flex items-start justify-between p-2 sm:p-5 pl-5 border-b rounded-t">
          <h3 className="text-xl font-semibold">Change Logo</h3>
          <button
            type="button"
            className="text-xl text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center"
            onClick={() => props.setShowChangeLogo(false)}
          >
            <AiOutlineClose />
          </button>
        </div>
        <div className="p-2 pb-6 sm:p-6 space-y-6">
          <form onSubmit={changeLogo}>
            {selectedFile ? (
              <img
                className="w-[250px] h-[250px] sm:h-[300px] sm:w-[300px] mx-auto"
                src={URL.createObjectURL(selectedFile)}
                alt="Ảnh đã chọn"
              />
            ) : (
              <img
                src={
                  employer?.image
                    ? employer?.image
                    : "https://res.cloudinary.com/dcpatkvcu/image/upload/v1695807392/DoAnNganh/non-user_lctzz5.jpg"
                }
                alt="Ảnh cá nhân"
                className="w-[250px] h-[250px] sm:h-[300px] sm:w-[300px] mx-auto"
              />
            )}

            <div className="flex justify-center mt-2 sm:mt-5 gap-5">
              {!selectedFile ? (
                <>
                  <input
                    className="block w-[250px] sm:w-[300px] text-sm sm:text-base text-gray-900 border border-gray-400 rounded-sm cursor-pointer bg-gray-50"
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    onChange={handleFileInputChange}
                  ></input>
                </>
              ) : (
                <>
                  <a
                    className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer hover:bg-red-600"
                    onClick={() => setSelectedFile(null)}
                  >
                    Cancel
                  </a>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
                    type="submit"
                  >
                    Change
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditLogoEmployer;
