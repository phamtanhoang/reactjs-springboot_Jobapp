/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { BiGroup, BiShoppingBag } from "react-icons/bi";
import { BsCurrencyDollar } from "react-icons/bs";
import { RiPagesLine } from "react-icons/ri";
import { ErrorBox, Spinner } from "../../../../../components";
import { blogsAPI, employersAPI, jobsAPI } from "../../../../../services";
import vipsAPI from "../../../../../services/Vips";

const Statistic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);

  const [countAllJob, setCountAllJob] = useState(0);
  const [countAllEmployer, setCountAllEmployer] = useState(0);
  const [countAllBlog, setCountAllBlog] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const alljobs = () => {
      setIsLoading(true);
      jobsAPI
        .getJobCountByAdminToken(localStorage.getItem("adminToken")||"")
        .then((res) => {
          setCountAllJob(res.data);
        })
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    alljobs();

    const allEmployers = () => {
      setIsLoading(true);
      employersAPI
        .getEmployerCountByAdminToken(localStorage.getItem("adminToken")||"")
        .then((res) => {
          setCountAllEmployer(res.data);
        })
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    allEmployers();

    const allBlogs = () => {
      setIsLoading(true);
      blogsAPI
        .getBlogCountByAdminToken(localStorage.getItem("adminToken")||"")
        .then((res) => {
          setCountAllBlog(res.data);
        })
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    allBlogs();

    const money = () => {
      setIsLoading(true);
      vipsAPI
        .getVipRevenueByAdminToken(localStorage.getItem("adminToken") || "")
        .then((res) => {
          setPrice(res.data);
        })
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    money();
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
      <div className="flex-grow px-6 mx-auto">
        <ErrorBox text={httpError} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-6 gap-4">
      <div className="bg-purple-500 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-purple-600 text-white font-medium group">
        <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
          <BiGroup className="stroke-current text-purple-600 transform transition-transform duration-500 ease-in-out text-3xl" />
        </div>
        <div className="text-right">
          <p className="text-2xl">{countAllEmployer}</p>
          <p>Employers</p>
        </div>
      </div>
      <div className="bg-purple-500 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-purple-600 text-white font-medium group">
        <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
          <BiShoppingBag className="stroke-current text-purple-600 transform transition-transform duration-500 ease-in-out text-3xl" />
        </div>
        <div className="text-right">
          <p className="text-2xl">{countAllJob}</p>
          <p>Jobs</p>
        </div>
      </div>
      <div className="bg-purple-500 rounded-md flex items-center justify-between p-3 border-b-4 border-purple-600 text-white font-medium group">
        <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
          <RiPagesLine className="stroke-current text-purple-600 transform transition-transform duration-500 ease-in-out text-3xl" />
        </div>
        <div className="text-right">
          <p className="text-2xl">{countAllBlog}</p>
          <p>Blogs</p>
        </div>
      </div>
      <div className="bg-purple-500 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-purple-600 text-white font-medium group">
        <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
          <BsCurrencyDollar className="stroke-current text-purple-600 transform transition-transform duration-500 ease-in-out text-3xl" />
        </div>
        <div className="text-right">
          <p className="text-2xl">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(price)}
          </p>
          <p>Sales</p>
        </div>
      </div>
    </div>
  );
};
export default Statistic;
