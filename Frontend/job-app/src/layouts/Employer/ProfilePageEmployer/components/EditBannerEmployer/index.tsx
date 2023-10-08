/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
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

  const bannerRef = useRef<HTMLImageElement>(null);

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
    if (bannerRef.current) {
      const width = bannerRef.current.offsetWidth;
      bannerRef.current.style.height = width / 2 + "px";
    }
  }, []);

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
  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const changeBanner = () => {
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
            setIsLoading(true);
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
      <div className="bg-white rounded-lg shadow relative w-[95%] sm:w-[85%] md:w-[70%] xl:w-1/2">
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
                className="w-full"
                src={URL.createObjectURL(selectedFile)}
                alt="Ảnh đã chọn"
                ref={bannerRef}
              />
            ) : (
              <img
                src={
                  employer?.banner
                    ? employer?.banner
                    : "https://res.cloudinary.com/dcpatkvcu/image/upload/v1695882546/light-gray-color-solid-background-1920x1080_kvwkxg.png"
                }
                alt="Ảnh cá nhân"
                className="w-full"
                ref={bannerRef}
              />
            )}

            <div className="flex justify-center mt-5 gap-5">
              {!selectedFile ? (
                <>
                  <input
                    className="block w-[80%] sm:w-[50%] text-base text-gray-900 border border-gray-400 rounded-sm cursor-pointer bg-gray-50"
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
export default EditBannerEmployer;
