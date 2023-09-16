/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, createContext, useState } from "react";
import { AiOutlineEnvironment, AiOutlineSearch } from "react-icons/ai";
import EmployerModel from "../../models/EmployerModel";
import CategoryModel from "../../models/CategoryModel";
import JobModel from "../../models/JobModel";
import { Spinner } from "../Utils/Spinner";
import { ErrorBox } from "../Utils/ErrorBox";
import { ReturnJobInJobsPage } from "./components/ReturnJobInJobsPage";
import { ReturnEmployerInJobPage } from "./components/ReturnEmployerInJobsPage";
import { Pagination } from "../Utils/Pagination";
import Select from "react-select";

interface JobContextType {
  allJob: JobModel[];
}
export const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobsPage = () => {
  const [selectedOption, setSelectedOption] = useState("Tất cả tỉnh/thành phố");
  const [employers, setEmployers] = useState<EmployerModel[]>([]);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [jobs, setJobs] = useState<JobModel[]>([]);
  const [allJob, setAllJob] = useState<JobModel[]>([]);
  const [uniqueAddresses, setUniqueAddresses] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(6);
  const [totalAmountOfJobs, setTotalAmountOfJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [searchTitle, setSearchTitle] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [searchUrl, setSearchUrl] = useState("");

  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
    setSearchAddress(selectedOption.value);
  };

  useEffect(() => {
    const fetchAllJob = async () => {
      const baseUrl: string = "http://localhost:8080/api/jobs";

      const response = await fetch(baseUrl);

      const responseJson = await response.json();
      const responseData = responseJson._embedded.jobs;

      const loadedJobs: JobModel[] = [];

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
          active: responseData[key].active,
        });
      }

      setAllJob(loadedJobs);
      setIsLoading(false);
    };

    fetchAllJob().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      const baseUrl: string = "http://localhost:8080/api/jobs";
      let url: string = "";

      if (searchUrl === "") {
        url = `${baseUrl}?page=${currentPage - 1}&size=${jobsPerPage}`;
      } else {
        url = baseUrl + searchUrl;
      }

      const response = await fetch(url);

      const responseJson = await response.json();

      const responseData = responseJson._embedded.jobs;

      setTotalAmountOfJobs(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPages);

      const loadedJobs: JobModel[] = [];

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
          active: responseData[key].active,
        });
      }

      setJobs(loadedJobs);
      setIsLoading(false);
    };

    fetchJobs().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });

    window.scrollTo(0, 0);
  }, [currentPage, jobsPerPage, searchUrl]);

  useEffect(() => {
    const fetchCategories = async () => {
      const baseUrl: string = "http://localhost:8080/api/categories";
      const response = await fetch(baseUrl);

      const responseJson = await response.json();
      const responseData = responseJson._embedded.categories;
      const loadedCategories: CategoryModel[] = [];

      for (const key in responseData) {
        loadedCategories.push({
          id: responseData[key].id,
          name: responseData[key].name,
        });
      }

      setCategories(loadedCategories);
      setIsLoading(false);
    };

    fetchCategories().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  useEffect(() => {
    const fetchEmployers = async () => {
      const baseUrl: string = "http://localhost:8080/api/employers";
      const response = await fetch(baseUrl);

      const responseJson = await response.json();
      const responseData = responseJson._embedded.employers;
      const loadedEmployers: EmployerModel[] = [];

      for (const key in responseData) {
        loadedEmployers.push({
          id: responseData[key].id,
          name: responseData[key].name,
          address: responseData[key].address,
          description: responseData[key].description,
          image: responseData[key].image,
          coverImage: responseData[key].coverImage,
          email: responseData[key].email,
          password: responseData[key].password,
          active: responseData[key].active,
        });
      }

      setEmployers(loadedEmployers);
      setIsLoading(false);
    };

    fetchEmployers().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  useEffect(() => {
    const addresses: string[] = allJob.map((job) => job.address);
    const uniqueAddresses: string[] = [...new Set(addresses)];
    setUniqueAddresses(uniqueAddresses);
  }, [allJob]);

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

  const options = [
    { value: "", label: "Tất cả tỉnh/thành phố" },
    ...uniqueAddresses.map((address) => ({ value: address, label: address })),
  ];

  const findEmployerById = (employerId: string) =>
    employers.find((emp) => emp.id === employerId);

  const countJobsByCategory = (categoryId: string) => {
    return allJob.filter((job: JobModel) => job.categoryId === categoryId)
      .length;
  };

  const searchHandleChange = () => {
    if (searchTitle === "") {
      setSearchUrl("");
    } else {
      setSearchUrl(
        `/search/findByTitleContainingAndAddress?title=${searchTitle}&address=${searchAddress}&page=0&size=${jobsPerPage}`
      );
    }
  };

  const categoryField = (value: string) => {
    setSearchUrl(
      value != "All"
        ? `/search/findByCategoryId?categoryId=${value}&page=0&size=${jobsPerPage}`
        : `?page=0&size=${jobsPerPage}`
    );
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <JobContext.Provider value={{ allJob }}>
      <section className="text-gray-700">
        <div className="px-6 py-10">
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
                        <a
                          href="#"
                          className="font-semibold mx-1 hover:text-orangetext text-sm"
                          onClick={() => categoryField(category.id)}
                        >
                          - {category.name}
                          <span className="text-gray-700 text-xs font-light inline-block pl-1">
                            ({countJobsByCategory(category.id)} công việc)
                          </span>
                        </a>
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
                  <ul className="">
                    {employers.map((employer) => (
                      <li key={employer.id} className="flex items-center py-4">
                        <ReturnEmployerInJobPage employer={employer} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-8/12">
              <div className="w-full ">
                <h1 className="text-xl font-bold md:text-2xl mb-5">
                  Danh sách việc làm
                </h1>
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
                    {jobs.map((job) => (
                      <ReturnJobInJobsPage
                        key={job.id}
                        job={job}
                        employer={findEmployerById(job.employerId)}
                      />
                    ))}
                  </div>
                  <div className="flex justify-center sm:justify-between mt-8">
                    <div className="font-medium hidden sm:block">
                      <p>Hiện {jobsPerPage} công việc trên 1 trang:</p>
                    </div>

                    {totalPages > 0 && (
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        paginate={paginate}
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
    </JobContext.Provider>
  );
};
