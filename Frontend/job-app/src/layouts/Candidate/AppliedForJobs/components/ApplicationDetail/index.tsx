import { useEffect, useState } from "react";
import { ApplicationResponseModel } from "../../../../../models/ApplicationResponseModel";
import { ApplicationModel } from "../../../../../models/ApplicationModel";
import { applicationsAPI } from "../../../../../services";
import { ErrorBox, Spinner } from "../../../../../components";
import { AiOutlineClose } from "react-icons/ai";
import { openCV } from "../../../../../utils";
import { Link } from "react-router-dom";

/* eslint-disable @typescript-eslint/no-explicit-any */
const DetailApplication: React.FC<{
  setShowBoxDetail: any;
  application?: ApplicationResponseModel;
}> = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [application, setApplication] = useState<ApplicationModel>();

  useEffect(() => {
    const fetchApplication = () => {
      applicationsAPI
        .getApplicationByApplicatonIDAndCandidateToken(
          props.application?.id || "",
          localStorage.getItem("candidateToken") || ""
        )
        .then((res) => {
          setApplication(res.data);
        })
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchApplication();
  }, [props.application?.id]);

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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow relative w-[90%] sm:w-[70%] md:w-[60%] lg:w-[53%] xl:w-[45%]">
        <div className="flex items-start justify-between p-2 sm:p-5 pl-5 border-b rounded-t">
          <h3 className="text-lg sm:text-xl font-semibold text-center">
            Ứng tuyển vị trí  <Link to={`/home/job/${props.application?.jobId}`} className="hover:text-orangetext">{props.application?.title}</Link>
          </h3>
          <button
            type="button"
            className="text-xl text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center"
            onClick={() => props.setShowBoxDetail(false)}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="rounded-lg py-3 overflow-y-auto max-h-[calc(100vh-180px)]">
          <div className="pb-2 px-5 text-xs sm:text-sm">
            <div className="min-[450px]:flex gap-5 mt-2">
              <label className="block min-[450px]:w-[60%] mb-5">
                <span className="font-semibold">Họ và tên: </span>
                <p className="mt-2">{application?.name}</p>
              </label>

              <label className="block min-[450px]:w-[40%] mb-5">
                <span className="font-semibold">Ngày ứng tuyển: </span>
                <p className="mt-2">
                  {application?.applyDate &&
                    new Date(application?.applyDate).toLocaleDateString()}
                </p>
              </label>
            </div>

            <div className="min-[450px]:flex gap-5 ">
              <label className="block  min-[450px]:w-[60%] mb-5">
                <span className="font-semibold">Email: </span>
                <p className="mt-2">{application?.email}</p>
              </label>

              <label className="block min-[450px]:w-[40%] mb-5">
                <span className="font-semibold">Số điện thoại: </span>
                <p className="mt-2">{application?.phoneNumber}</p>
              </label>
            </div>

            <label className="block mb-5">
              <span className="font-semibold">Thư giới thiệu:</span>
              <div
                className="mt-2 ring-1 px-3 py-2 rounded-lg ring-gray-300 text-xs sm:text-sm"
                dangerouslySetInnerHTML={{
                  __html: application?.letter || "",
                }}
              />
            </label>
            <label className="block mb-5">
              <span className="font-semibold">CV: </span>
              <a
                className="hover:text-blue-600 ml-1 cursor-pointer"
                onClick={() => openCV(application?.cv || "")}
              >
                Xem chi tiết
              </a>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailApplication;
