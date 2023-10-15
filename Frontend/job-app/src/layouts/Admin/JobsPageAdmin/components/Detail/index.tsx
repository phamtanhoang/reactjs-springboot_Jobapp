import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineExclamation,
} from "react-icons/ai";
import { JobModel } from "../../../../../models/JobModel";
import { useEffect, useState } from "react";
import { ErrorBox, Spinner } from "../../../../../components";
import { jobsAPI } from "../../../../../services";
import { JobResponseModel } from "../../../../../models/JobResponseModel";

/* eslint-disable @typescript-eslint/no-explicit-any */
const JobDetail: React.FC<{
  setShowBoxDetail: any;
  job?: JobModel;
}> = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [job, setJob] = useState<JobResponseModel>();

  useEffect(() => {
    const getJob = () => {
      jobsAPI
        .detailJobByAdminToken(
          props.job?.id || "",
          localStorage.getItem("adminToken") || ""
        )
        .then((res) => {
          console.log(res.data);
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
  }, [props.job?.id]);

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
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50 text-black">
      <div className="bg-white rounded-lg shadow relative w-[95%] sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%]">
        <div className="flex items-start justify-between p-2 sm:p-5 pl-5 border-b rounded-t ">
          <h3 className="text-xl font-semibold">Job Detail</h3>
          <button
            type="button"
            className="text-xl text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center"
            onClick={() => props.setShowBoxDetail(false)}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="rounded-lg p-4 md:p-5 overflow-y-auto max-h-[calc(100vh-150px)]">
          <div className="text-base font-medium">
            <div className="grid grid-cols-6 gap-5">
              <div className="col-span-full flex">
                <label className="font-semibold  block text-gray-700 mr-2 w-[25%] sm:w-[15%]">
                  Title:
                </label>
                <p className="w-[75%] sm:w-[85%]">{job?.title}</p>
              </div>
              <div className="col-span-full flex">
                <label className="font-semibold block text-gray-700 mr-2 w-[25%] sm:w-[15%]">
                  Employer:
                </label>
                <p className="w-[75%] sm:w-[85%]">{job?.employerName}</p>
              </div>
              <div className="col-span-6 sm:col-span-3 flex">
                <label className="font-semibold block text-gray-700 mr-2 w-[25%] sm:w-[32%]">
                  Category:
                </label>
                <p className="w-[75%] sm:w-[68%]">{job?.categoryName}</p>
              </div>
              <div className="col-span-6 sm:col-span-3 flex">
                <label className="font-semibold block text-gray-700 mr-2 w-[25%] sm:w-[30%]">
                  State:
                </label>
                {job?.state == "pending" ? (
                  <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-yellow-500 bg-yellow-100/60">
                    <AiOutlineExclamation />
                    <h2 className="text-sm font-normal">Pending</h2>
                  </div>
                ) : job?.state == "active" ? (
                  <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60">
                    <AiOutlineCheck />
                    <h2 className="text-sm font-normal">Active</h2>
                  </div>
                ) : (
                  <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-red-500 bg-red-100/60">
                    <AiOutlineClose />
                    <h2 className="text-sm font-normal">Refused</h2>
                  </div>
                )}
              </div>
              <div className="col-span-6 sm:col-span-3 flex">
                <label className="font-semibold block text-gray-700 mr-2 w-[25%] sm:w-[32%]">
                  From Date:
                </label>
                <p className="w-[75%] sm:w-[68%]">
                  {job?.fromDate &&
                    new Date(job?.fromDate).toLocaleDateString()}
                </p>
              </div>
              <div className="col-span-6 sm:col-span-3 flex">
                <label className="font-semibold block text-gray-700 mr-2 w-[25%] sm:w-[30%]">
                  To Date:
                </label>
                <p className="w-[75%] sm:w-[70%]">
                  {job?.toDate && new Date(job?.toDate).toLocaleDateString()}
                </p>
              </div>

              <div className="col-span-6 sm:col-span-3 flex">
                <label className="font-semibold block text-gray-700 mr-2 w-[25%] sm:w-[32%]">
                  Salary:
                </label>
                <p className="w-[75%] sm:w-[68%]">{job?.salary}</p>
              </div>
              <div className="col-span-6 sm:col-span-3 flex">
                <label className="font-semibold block text-gray-700 mr-2 w-[25%] sm:w-[30%]">
                  Address:
                </label>
                <p className="w-[75%] sm:w-[70%]">{job?.address}</p>
              </div>

              <div className="col-span-full">
                <label className="font-semibold block text-gray-700">
                  Description:
                </label>
                <div
                  className="mt-2 ring-1 px-3 py-2 rounded-lg ring-gray-300 text-sm"
                  dangerouslySetInnerHTML={{
                    __html: job?.description || "",
                  }}
                />
              </div>
            </div>

          
          </div>
        </div>
      </div>
    </div>
  );
};
export default JobDetail;
