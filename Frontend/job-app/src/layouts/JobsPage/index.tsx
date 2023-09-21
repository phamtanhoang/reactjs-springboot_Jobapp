/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { AiOutlineEnvironment, AiOutlineSearch } from "react-icons/ai";
import Select from "react-select";
import { TopEmployers } from "../HomePage/components/TopEmployers";
import { JobModel } from "../../models/JobModel";
import { EmployerModel } from "../../models/EmployerModel";
import { CategoryModel } from "../../models/CategoryModel";
import { ErrorBox, Pagination, Spinner } from "../../components";
import { categoriesAPI, employersAPI, jobsAPI } from "../../services";
import CategoryItem from "./components/CategoryItem";
import EmployerItem from "./components/EmployerItem";

export const JobsPage = () => {
  const [employers, setEmployers] = useState<EmployerModel[]>([]);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [allJob, setAllJob] = useState<JobModel[]>([]);
  const [jobs, setJobs] = useState<JobModel[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(6);
  const [totalAmountOfJobs, setTotalAmountOfJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [currentEmployerPage, setCurrentEmployerPage] = useState(1);
  const [employersPerPage] = useState(6);
  const [totalAmountOfEmployers, setTotalAmountOfEmployers] = useState(0);
  const [totalEmployerPages, setTotalEmployerPages] = useState(0);

  const [searchTitle, setSearchTitle] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [searchUrl, setSearchUrl] = useState("");

  const [selectedOption, setSelectedOption] = useState("Tất cả tỉnh/thành phố");
  const [uniqueAddresses, setUniqueAddresses] = useState<string[]>([]);

  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
    setSearchAddress(selectedOption.value);
  };

  const getJobAddresses = (jobs: JobModel[]) => {
    const addresses: string[] = jobs.map((job) => job.address);
    const uniqueAddresses: string[] = [...new Set(addresses)];
    setUniqueAddresses(uniqueAddresses);
  };

  const options: any = [
    { value: "", label: "Tất cả tỉnh/thành phố" },
    ...uniqueAddresses.map((address) => ({ value: address, label: address })),
  ];

  // const mapResponseToJobs = (responseData: any) => {
  //   return responseData.map((item: any) => ({
  //     id: item.id,
  //     title: item.title,
  //     description: item.description,
  //     salary: item.salary,
  //     fromDate: item.fromDate,
  //     toDate: item.toDate,
  //     address: item.address,
  //     categoryId: item.categoryId,
  //     employerId: item.employerId,
  //     state: item.state,
  //   }));
  // };

  useEffect(() => {
    const getAllCategories = () => {
      categoriesAPI
        .getCategories()
        .then((res) => {
          setCategories(res.data._embedded.categories);
        })
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    const getAllJobs = () => {
      jobsAPI
        .getJobs()
        .then((res) => {
          setAllJob(res.data._embedded.jobs);
          getJobAddresses(res.data._embedded.jobs);
        })
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    getAllCategories();
    getAllJobs();
  }, []);

  useEffect(() => {
    const getVipEmployers = () => {
      employersAPI
        .getVipEmployers(currentEmployerPage - 1, employersPerPage)
        .then((res) => {
          setEmployers(res.data._embedded.employers);
          setTotalAmountOfEmployers(res.data.page.totalElements);
          setTotalEmployerPages(res.data.page.totalPages);
        })
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    getVipEmployers();
  }, [currentEmployerPage, employersPerPage]);

  useEffect(() => {
    const getJobs = () => {
      jobsAPI.getJobs(currentPage - 1, jobsPerPage).then((res) => {
        setJobs(res.data._embedded.jobs);
      }).catch((error:any)=>z)
    };
  });

  // useEffect(() => {
  //   const fetchJobs = async () => {
  //     const baseUrl: string = "http://localhost:8080/api/jobs";
  //     let url: string = "";

  //     if (searchUrl === "") {
  //       url = `${baseUrl}?page=${currentPage - 1}&size=${jobsPerPage}`;
  //     } else {
  //       url = baseUrl + searchUrl + ``;
  //     }

  //     const response = await fetch(url);

  //     const responseJson = await response.json();

  //     const responseData = responseJson._embedded.jobs;

  //     setTotalAmountOfJobs(responseJson.page.totalElements);
  //     setTotalPages(responseJson.page.totalPages);

  //     const loadedJobs = mapResponseToJobs(responseData);

  //     setJobs(loadedJobs);
  //     setIsLoading(false);
  //   };

  //   fetchJobs().catch((error: any) => {
  //     setIsLoading(false);
  //     setHttpError(error.message);
  //   });

  //   window.scrollTo(0, 0);
  // }, [currentPage, jobsPerPage, searchUrl]);

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

  const searchHandleChange = () => {
    if (searchTitle === "" && searchAddress === "") {
      setSearchUrl("");
    } else {
      setSearchUrl(
        `/search/findByTitleContainingAndAddress?title=${searchTitle}&address=${searchAddress}&page=0&size=${jobsPerPage}`
      );
    }
    setCurrentPage(1);
  };

  const categoryField = (value: string) => {
    setSearchUrl(
      value != "All"
        ? `/search/findByCategoryId?categoryId=${value}&page=0&size=${jobsPerPage}`
        : `?page=0&size=${jobsPerPage}`
    );
    setCurrentPage(1);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const paginateEmployer = (pageNumber: number) =>
    setCurrentEmployerPage(pageNumber);

  return (
    <>
      <section className="text-gray-700">
        <div className="px-6 pt-10 pb-0 lg:pb-10">
          <div className="flex justify-between w-full md:w-[95%] lg:w-full xl:w-[85%] mx-auto">
            <div className="-mx-8 w-4/12 hidden lg:block">
              <div className="px-8">
                <h1 className="mb-4 mt-2 text-xl font-bold">
                  Loại hình công việc:
                </h1>
                <div className="flex flex-col bg-white max-w-sm px-6 py-4 mx-auto rounded-lg shadow-lg">
                  <ul>
                    <li className="flex items-center py-2">
                      <a
                        href="#"
                        className="font-semibold mx-1 hover:text-orangetext text-sm"
                        onClick={() => categoryField("All")}
                      >
                        - Tất cả
                        <span className="text-gray-700 text-xs font-light inline-block pl-1">
                          ({allJob.length} công việc)
                        </span>
                      </a>
                    </li>
                    {categories.map((category) => (
                      <li key={category.id} className="flex items-center py-2">
                        <CategoryItem category={category} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-10 px-8">
                <h1 className="mb-4 mt-2 text-xl font-bold">
                  Một số nhà tuyển dụng nổi bật:
                </h1>
                <div className="flex flex-col bg-white max-w-sm px-8 py-2 mx-auto rounded-lg shadow-lg">
                  {totalAmountOfEmployers > 0 ? (
                    <>
                      <ul className="">
                        {employers.map((employer) => (
                          <li
                            key={employer.id}
                            className="flex items-center py-4"
                          >
                            <EmployerItem employer={employer} />
                          </li>
                        ))}
                      </ul>
                      <div className="flex justify-center m-2">
                        {totalEmployerPages > 0 && (
                          <Pagination
                            currentPage={currentEmployerPage}
                            totalPages={totalEmployerPages}
                            paginate={paginateEmployer}
                            type={false}
                          />
                        )}
                      </div>
                    </>
                  ) : (
                    <ErrorBox text="Không có nhà tuyển dụng nổi bật nào" />
                  )}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-8/12">
              <div className="w-full flex-row sm:flex text-center sm:justify-between ">
                <h1 className="text-lg sm:text-xl font-bold md:text-2xl mb-5 uppercase">
                  Danh sách việc làm
                </h1>
                <div className="">
                  <select
                    className="lg:hidden block px-1 rounded-lg w-full py-1 border-2 mb-2"
                    onChange={(e) => categoryField(e.target.value)}
                  >
                    <option value={"All"}>Tất cả</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex-row w-full  bg-white px-4 py-2 justify-between rounded-2xl md:rounded-full md:flex">
                <div className="flex gap-4 mx-1 my-4 md:m-0">
                  <div className="text-orangetext">
                    <AiOutlineSearch className="h-full text-2xl" />
                  </div>
                  <input
                    className="w-full md:w-[210px] placeholder:text-slate-400 block bg-white py-2 md:py-1 px-3 border border-gray-300 focus:outline-none focus:border-2 focus:border-blue-500  sm:text-sm rounded"
                    placeholder="Vị trí tuyển dụng..."
                    type="text"
                    name="job"
                    onChange={(e) => setSearchTitle(e.target.value)}
                  />
                </div>
                <div className="flex gap-4 text-lg mx-1 my-5 md:m-0">
                  <div className="text-orangetext">
                    <AiOutlineEnvironment className="h-full text-2xl" />
                  </div>
                  <Select
                    value={selectedOption}
                    onChange={handleChange}
                    options={options}
                    isSearchable
                    placeholder={selectedOption}
                    className="text-gray-900 block text-sm w-full md:w-[210px]"
                  />
                </div>
                <div className="">
                  <button
                    className="text-white px-8 py-2 rounded-full font-semibold bg-orangetext hover:outline-none hover:ring hover:ring-orangebackground  my-2 md:m-0"
                    onClick={() => searchHandleChange()}
                  >
                    Tìm kiếm
                  </button>
                </div>
              </div>
              {totalAmountOfJobs > 0 ? (
                <>
                  <div className="mt-5 w-full">
                    {/* {jobs.map((job) => (
                      <JobItem key={job.id} job={job} />
                    ))} */}
                  </div>
                  <div className="flex justify-center sm:justify-between mt-8">
                    <div className="font-medium hidden sm:block">
                      <p>Hiện tối đa {jobsPerPage} công việc trên 1 trang:</p>
                    </div>

                    {totalPages > 0 && (
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        paginate={paginate}
                        type={true}
                      />
                    )}
                  </div>
                </>
              ) : (
                <div className="mt-5">
                  <ErrorBox text="Không tìm thấy công việc phù hợp" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="lg:hidden block">
        <TopEmployers employers={employers} />
      </section>
    </>
  );
};
