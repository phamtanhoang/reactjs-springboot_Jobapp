/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineExclamation,
} from "react-icons/ai";
import { GrFormNext } from "react-icons/gr";
import { EditJobPage } from "../JobsPageEmployer/components";
import { JobModel } from "../../../models/JobModel";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { categoriesAPI, jobsAPI } from "../../../services";
import { ErrorBox, Spinner } from "../../../components";
import authsAPI from "../../../services/Auths";
import { EmployerModel } from "../../../models/EmployerModel";
import { CategoryModel } from "../../../models/CategoryModel";
import { TableApplicationsOfJobPage } from "./components";

const JobDetailPageEmployer = () => {
  const [showBoxEditJob, setShowBoxEditJob] = useState(false);

  const jobId = window.location.pathname.split("/")[3];

  const [job, setJob] = useState<JobModel>();
  const [employer, setEmployer] = useState<EmployerModel>();
  const [category, setCategory] = useState<CategoryModel>();

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = () => {
      setIsLoading(true);
      jobsAPI
        .getJobByEmployerToken(
          jobId,
          localStorage.getItem("employerToken") || ""
        )
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
    fetchJob();

    const fetchEmployer = () => {
      setIsLoading(true);
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

    const fetchCategory = () => {
      setIsLoading(true);
      categoriesAPI
        .getCategoryByID(job?.categoryId || "")
        .then((res) => {
          setCategory(res.data);
        })
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchCategory();
  }, [job?.categoryId, jobId]);

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

  const DeleteJob = (job?: JobModel) => {
    Swal.fire({
      title: "Do you want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        jobsAPI
          .deleteJobByEmployerToken(
            job?.id || "",
            localStorage.getItem("employerToken") || ""
          )
          .then(() => {
            Swal.fire({
              title: "Delete job success",
              icon: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Yes",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/employer/jobs");
              }
            });
          })
          .catch(() => {
            Swal.fire("Error!", "Delete job error!", "error");
          });
      }
    });
  };

  return (
    <section className="flex-grow">
      <div className="p-6 block sm:flex items-center justify-between">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <nav aria-label="Breadcrumb" className="text-sm font-semibold mb-6">
              <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                  <Link
                    to="/employer"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Home
                  </Link>
                  <GrFormNext className="text-lg mx-2" />
                </li>
                <li className="flex items-center">
                  <Link
                    to="/employer/jobs"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Jobs
                  </Link>
                  <GrFormNext className="text-lg mx-2" />
                </li>
                <li className="flex items-center">
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Job Detail
                  </a>
                </li>
              </ol>
            </nav>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Job detail
            </h1>
          </div>
          <div className="flex flex-wrap justify-between mx-auto">
            <div className="w-full md:w-[68%]">
              <div className="job-meta mb-4">
                <span className="text-sm text-gray-500">
                  Posted{" "}
                  {job?.fromDate &&
                    new Date(job?.fromDate).toLocaleDateString()}{" "}
                  to {job?.toDate && new Date(job?.toDate).toLocaleDateString()}
                </span>

                <h1 className="text-3xl font-semibold mt-1 mb-2 flex">
                  <div className="mr-3">{job?.title}</div>
                  {job?.state == "pending" ? (
                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-yellow-500 bg-yellow-100/60 ">
                      <AiOutlineExclamation className="text-base font-medium" />
                      <h2 className="text-base font-medium">Pending</h2>
                    </div>
                  ) : job?.state == "active" ? (
                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 ">
                      <AiOutlineCheck className="text-base font-medium" />
                      <h2 className="text-base font-medium">Active</h2>
                    </div>
                  ) : (
                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-red-500 bg-red-100/60 ">
                      <AiOutlineClose className="text-base font-medium" />
                      <h2 className="text-base font-medium">Refused</h2>
                    </div>
                  )}
                </h1>

                <span className="bg-blue-500 text-white py-1 px-3 text-sm mr-3 ml-0 mt-2 inline-block">
                  {job?.salary}
                </span>
                <span className="bg-blue-500 text-white py-1 px-3 text-sm mr-3 ml- mt-2 inline-block">
                  {job?.address}
                </span>
                <span className="bg-blue-500 text-white py-1 px-3 text-sm mr-3 ml-0 mt-2 inline-block">
                  {category?.name}
                </span>
              </div>

              <div className="block md:hidden text-sm mb-4 border-t border-b py-2">
                <h5 className="text-gray-700 mb-3 text-lg">
                  Employer controls
                </h5>
                <div className="mb-2 flex text-base">
                  <p
                    className="border-2 text-blue-500 hover:text-white rounded border-blue-500 hover:bg-blue-500 px-3 py-1 mr-3 flex"
                    onClick={() => setShowBoxEditJob(true)}
                  >
                    <AiFillEdit className="text-xl mr-2" />
                    <span>Edit job</span>
                  </p>
                  <p
                    className="border-2 text-red-500 hover:text-white rounded border-red-500 hover:bg-red-500 px-3 py-1 flex"
                    onClick={() => DeleteJob(job)}
                  >
                    <AiFillDelete className="text-xl mr-2" />
                    <span>Delete job</span>
                  </p>
                </div>
              </div>

              <div className="job-description mb-4">
                <h3 className="text-lg font-medium mb-1">About job:</h3>
                <div
                  className="mb-2"
                  dangerouslySetInnerHTML={{
                    __html: job?.description || "",
                  }}
                />
              </div>
            </div>

            <div className="w-full hidden md:block md:w-[30%]">
              <div className="employer-info mb-5 text-center ">
                <img
                  className="h-40 w-40 inline-block rounded-lg ring-2"
                  src={
                    employer?.image
                      ? employer?.image
                      : "https://res.cloudinary.com/dcpatkvcu/image/upload/v1695807392/DoAnNganh/non-user_lctzz5.jpg"
                  }
                  alt=""
                />
              </div>

              <div className="text-center text-lg">
                <h5 className="text-gray-700 mb-3">Employer controls</h5>
                <div className="flex text-sm justify-center gap-2">
                  <p
                    className="border-2 text-blue-500 hover:text-white rounded border-blue-500 hover:bg-blue-500 px-2 py-1 flex cursor-pointer"
                    onClick={() => setShowBoxEditJob(true)}
                  >
                    <AiFillEdit className="text-lg mr-2" />
                    <span>Edit job</span>
                  </p>
                  <p
                    className="border-2 text-red-500 hover:text-white rounded border-red-500 hover:bg-red-500 px-2 py-1 flex cursor-pointer"
                    onClick={() => DeleteJob(job)}
                  >
                    <AiFillDelete className="text-lg mr-2" />
                    <span>Delete job</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showBoxEditJob && localStorage.getItem("employerToken") && (
        <EditJobPage setShowBoxEditJob={setShowBoxEditJob} job={job} />
      )}
      <TableApplicationsOfJobPage job={job} />
    </section>
  );
};
export default JobDetailPageEmployer;
