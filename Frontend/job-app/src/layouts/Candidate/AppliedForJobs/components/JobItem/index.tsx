/* eslint-disable @typescript-eslint/no-explicit-any */
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { JobModel } from "../../../../../models/JobModel";
import { jobsAPI } from "../../../../../services";
import { ErrorBox, Spinner } from "../../../../../components";
import { ApplicationResponseModel } from "../../../../../models/ApplicationResponseModel";
import { DetailApplication } from "..";

const JobItem: React.FC<{
  application?: ApplicationResponseModel;
}> = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [job, setJob] = useState<JobModel>();

  const [showBoxDetail, setShowBoxDetail] = useState(false);

  useEffect(() => {
    const getJob = () => {
      setIsLoading(true);
      jobsAPI
        .getJobById(props.application?.jobId || "")
        .then((res) => {
          setJob(res.data);
        })
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    getJob();
  }, [props.application?.jobId]);

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
  const HandleDetail = () => {
    setShowBoxDetail(true);
  };

  return (
    <>
      <div className="max-full min-[480px]:pl-8 sm:pl-10 px-4 py-2 sm:px-10 sm:py-4 bg-white rounded-lg shadow-xl flex my-4 hover:bg-slate-50">
        <div className="w-1/4 sm:w-1/5 flex items-center">
          <img
            src={
              props.application?.image
                ? props.application?.image
                : "https://res.cloudinary.com/dcpatkvcu/image/upload/v1695807392/DoAnNganh/non-user_lctzz5.jpg"
            }
            alt="avatar"
            className="object-cover  md:p-4 w-[60px] h-[60px] min-[480px]:w-[80px] min-[480px]:h-[80px] sm:w-[90px] sm:h-[90px] md:w-[120px] md:h-[120px]  xl:w-[140px] xl:h-[140px]"
          />
        </div>

        <div className="w-3/4 sm:w-4/5">
          <div className="flex justify-between items-center">
            <span className="font-light text-xs md:text-sm text-neutral-500">
              Ứng tuyển:{" "}
              {props.application?.applyDate &&
                new Date(props.application?.applyDate).toLocaleDateString()}
            </span>
            <div>
              <AiFillEye
                className="text-xl sm:text-2xl md:text-3xl cursor-pointer text-neutral-500 hover:text-yellow-500"
                onClick={HandleDetail}
              />
            </div>
          </div>
          <div className="mt-1">
            <div>
              <Link
                to={`/home/job/${props.application?.jobId}`}
                className=" text-gray-700 font-bold hover:text-orangetext text-base md:text-lg "
              >
                {job?.title}
              </Link>
            </div>
            <div className="mt-1">
              <p className="text-gray-600 text-sm md:text-base truncate cursor-default">
                {props.application?.employerName}
              </p>
            </div>
            <div className="flex mt-2 sm:mt-4">
              <div className="bg-[#f4f5f5] text-xs md:text-sm text-gray-600 py-1 px-2 rounded-md cursor-default">
                {job?.salary}
              </div>
              <div className="bg-[#f4f5f5] text-xs md:text-sm text-gray-600 py-1 px-2 ml-4 rounded-md cursor-default">
                {job?.address}
              </div>
            </div>
            <hr className="mt-2 sm:mt-4"></hr>
            <div className="mt-2 text-sm sm:text-base">
              Trạng thái:
              {props.application?.state == "pending" ? (
                <span className=" text-yellow-500 font-medium ml-1 sm:ml-3">
                  Đang chờ xét duyệt
                </span>
              ) : props.application?.state == "approved" ? (
                <span className=" text-emerald-500 font-medium ml-1 sm:ml-3">
                  Hồ sơ hợp lệ
                </span>
              ) : (
                <span className=" text-red-500 font-medium ml-1 sm:ml-3">
                  Hồ sơ không phù hợp
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {showBoxDetail && localStorage.getItem("candidateToken") && (
        <DetailApplication
          setShowBoxDetail={setShowBoxDetail}
          application={props.application}
        />
      )}
    </>
  );
};
export default JobItem;
