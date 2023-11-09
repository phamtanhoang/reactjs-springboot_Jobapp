/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineCloudUpload } from "react-icons/ai";
import { ErrorBox, Spinner } from "../../../../../components";
import authsAPI from "../../../../../services/Auths";
import { EmployerResponseModel } from "../../../../../models/EmployerResponseModels";
import Swal from "sweetalert2";
import { employersAPI } from "../../../../../services";

const EditBannerEmployer: React.FC<{
  setShowChangeBanner: any;
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

  const changeBanner = (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("employerToken") || "";
    if (token) {
      if (selectedFile) {
        Swal.fire({
          title: "Confirm banner change?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Accept",
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
              .updateBanner(selectedFile, token)
              .then(() => {
                Swal.fire(
                  "Success!",
                  "Change banner succsess!",
                  "success"
                ).then((result) => {
                  if (result.isConfirmed) {
                    window.location.reload();
                  }
                });
              })
              .catch(() => {
                Swal.fire("Fail!", "Change banner fail!", "error");
              })
              .finally(() => {
                waitingPopup.close();
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
      <div className="bg-white rounded-lg shadow relative ">
        <div className="flex items-start justify-between p-2 sm:p-5 pl-5 border-b rounded-t">
          <h3 className="text-xl font-semibold">Change Banner</h3>
          <button
            type="button"
            className="text-xl text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center"
            onClick={() => props.setShowChangeBanner(false)}
          >
            <AiOutlineClose />
          </button>
        </div>
        <div className="p-2 pb-6 sm:p-6 space-y-6">
          <form onSubmit={changeBanner}>
            {selectedFile ? (
              <img
                className="h-[150px] w-[300px] sm:h-[250px] sm:w-[500px] mx-auto"
                src={URL.createObjectURL(selectedFile)}
                alt="Ảnh đã chọn"
              />
            ) : (
              <img
                src={
                  employer?.banner
                    ? employer?.banner
                    : "https://res.cloudinary.com/dcpatkvcu/image/upload/v1695882546/light-gray-color-solid-background-1920x1080_kvwkxg.png"
                }
                alt="Ảnh cá nhân"
                className="h-[150px] w-[300px] sm:h-[250px] sm:w-[500px] mx-auto"
              />
            )}

            <div className="flex justify-center mt-2 sm:mt-5 gap-5">
              {!selectedFile ? (
                <>
                  <div className="flex w-full items-center justify-center">
                    <label className="w-full flex flex-col justify-center items-center py-2 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border-2 border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
                      <AiOutlineCloudUpload className="text-3xl" />
                      <span className="text-base font-medium">
                        Select a file
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        id="fileInput"
                        accept="image/*"
                        onChange={handleFileInputChange}
                      />
                    </label>
                  </div>
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
export default EditBannerEmployer;
