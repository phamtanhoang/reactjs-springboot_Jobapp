/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import EmployerModel from "../../models/EmployerModel";
import { Spinner } from "../Utils/Spinner";
import { ErrorBox } from "../Utils/ErrorBox";
import JobModel from "../../models/JobModel";
import { ReturnJobInEmployerProfilePage } from "./components/ReturnJobInEmployerProfilePage";
import { Pagination } from "../Utils/Pagination";

export const EmployerProfilePage = () => {
  const [employer, setEmPloyer] = useState<EmployerModel>();
  const [jobs, setJobs] = useState<JobModel[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [activeLink, setActiveLink] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalAmountOfItems, setTotalAmountOfItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const employerId = window.location.pathname.split("/")[3];

  useEffect(() => {
    const fetchEmployer = async () => {
      const baseUrl: string = `http://localhost:8080/api/employers/${employerId}`;

      const response = await fetch(baseUrl);

      const responseJson = await response.json();

      const loadedEmployer: EmployerModel = {
        id: responseJson.id,
        name: responseJson.name,
        address: responseJson.address,
        description: responseJson.description,
        image: responseJson.image,
        banner: responseJson.banner,
        accountId: responseJson.accountId,
      };

      setEmPloyer(loadedEmployer);
      setIsLoading(false);
    };
    fetchEmployer().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [employerId]);

  useEffect(() => {
    const fetchJobs = async () => {
      const baseUrl: string = `http://localhost:8080/api/jobs/search/findByEmployerId?employerId=${employerId}&page=${
        currentPage - 1
      }&size=${itemsPerPage}`;

      const response = await fetch(baseUrl);
      const responseJson = await response.json();
      const responseData = responseJson._embedded.jobs;
      const loadedJobs: JobModel[] = [];

      setTotalAmountOfItems(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPages);

      for (const key in responseData) {
        loadedJobs.push({
          id: responseData[key].id,
          title: responseData[key].title,
          description: responseData[key].description,
          salary: responseData[key].salary,
          fromDate: responseData[key].fromDate,
          toDate: responseData[key].toDate,
          address: responseData[key].address,
          categoryId: responseData[key].categoryId,
          employerId: responseData[key].employerId,
          state: responseData[key].state,
        });
      }

      setJobs(loadedJobs);
      setIsLoading(false);
    };

    fetchJobs().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [employerId, currentPage, itemsPerPage]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
    <section className="text-gray-[#333333]">
      <div className="px-6 py-8">
        <div className="w-full sm:w-[90%] lg:w-[95%] xl:w-[80%] mx-auto">
          <div className="flex-row lg:flex justify-between container mx-auto">
            <div className="w-full lg:w-[65%]">
              <div className="w-full bg-white">
                <div className="overflow-hidden">
                  <img className="w-full" src={employer?.banner} alt="banner" />
                </div>
                <div className="-mt-[11%] flex w-[95%] mx-auto">
                  <div className="rounded-xl  sm:flex bg-white shadow-lg">
                    <div className="w-1/4 p-2 sm:p-5 mx-auto flex items-center">
                      <img
                        className="w-full rounded-xl p-2 border-2 "
                        src={employer?.image}
                        alt="logo"
                      />
                    </div>
                    <div className="w-[85%] mx-auto sm:w-3/4  py-2 sm:py-5 flex flex-col justify-center sm:pr-5 text-center sm:text-left">
                      <div className="">
                        <p className="font-bold text-base md:text-xl cursor-default">
                          {employer?.name}
                        </p>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs md:text-sm cursor-default">
                          Địa chỉ: {employer?.address}
                        </p>
                      </div>
                      <div className="mt-2">
                        <a href="#" className="text-xs md:text-sm">
                          Email: goole@gmail.com.vn
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" w-[90%] mx-auto py-10">
                  <h2 className="mb-3 text-base md:text-lg font-bold text-[#333333]">
                    Mô tả
                  </h2>
                  <div className="text-sm md:text-base ">
                    <p>{employer?.description}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:-mx-8 w-full lg:w-[35%]">
              <div className="">
                <div className="text-sm font-medium text-center text-[#333333] border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                  <ul className="flex flex-wrap -mb-px text-lg font-semibold">
                    <li className="mr-2">
                      <a
                        href="#"
                        className={`inline-block p-4  border-b-2 rounded-t-lg  ${
                          activeLink
                            ? "text-orangetext border-orangetext"
                            : "border-transparent hover:text-gray-600 hover:border-gray-300"
                        } `}
                        aria-current="page"
                        onClick={() => setActiveLink(true)}
                      >
                        Tuyển dụng
                      </a>
                    </li>
                    <li className="mr-2">
                      <a
                        href="#"
                        className={`inline-block p-4  border-b-2 rounded-t-lg  ${
                          !activeLink
                            ? "text-orangetext border-orangetext"
                            : "border-transparent hover:text-gray-600 hover:border-gray-300"
                        } `}
                        onClick={() => setActiveLink(false)}
                      >
                        Blog
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col bg-white w-full px-8 py-2 rounded-b-lg shadow-md">
                  {activeLink ? (
                    <ul className="-mx-4 text-[#333333]">
                      {jobs.map((job) => (
                        <li
                          key={job.id}
                          className="flex items-center my-2 bg-[#fff4e9] rounded-lg p-3 border-2 border-orangebackground"
                        >
                          <ReturnJobInEmployerProfilePage job={job} />
                        </li>
                      ))}
                      <div className="flex justify-center m-2">
                        {totalPages > 0 ? (
                          <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            paginate={paginate}
                            type={false}
                          />
                        ) : (
                          <ErrorBox text="Không có thông tin tuyển dụng" />
                        )}
                      </div>
                    </ul>
                  ) : (
                    <>hihi</>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
