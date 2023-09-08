/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeEvent,
  useEffect,
  createContext,
  useState,
} from "react";
import { AiOutlineEnvironment, AiOutlineSearch } from "react-icons/ai";
import EmployerModel from "../../models/EmployerModel";
import CategoryModel from "../../models/CategoryModel";
import JobModel from "../../models/JobModel";
import { Spinner } from "../../Utils/Spinner";
import { ErrorBox } from "../../Utils/ErrorBox";
import { ReturnJobInJobsPage } from "./components/ReturnJobInJobsPage";
import { ReturnEmployerInJobPage } from "./components/ReturnEmployerInJobsPage";
export const AppContext = createContext({});

export const JobsPage = () => {
  const [selectedOption, setSelectedOption] = useState("ALL");
  const [employers, setEmployers] = useState<EmployerModel[]>([]);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [jobs, setJobs] = useState<JobModel[]>([]);

  const [isLoadingEmployers, setisLoadingEmployers] = useState(true);
  const [isLoadingCategories, setisLoadingCategories] = useState(true);
  const [isLoadingJobs, setisLoadingJobs] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const fetchEmployers = async () => {
    const baseUrl: string = "http://localhost:8080/api/employers";

    const response = await fetch(baseUrl);

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

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
        email: responseData[key].email,
        password: responseData[key].password,
        active: responseData[key].active,
      });
    }

    setEmployers(loadedEmployers);
    setisLoadingEmployers(false);
  };

  const fetchCategories = async () => {
    const baseUrl: string = "http://localhost:8080/api/categories";

    const response = await fetch(baseUrl);

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const responseJson = await response.json();

    const responseData = responseJson._embedded.categories;

    const loadedCategories: CategoryModel[] = [];

    for (const key in responseData) {
      loadedCategories.push({
        id: responseData[key].id,
        name: responseData[key].name,
        image: responseData[key].image,
      });
    }

    setCategories(loadedCategories);
    setisLoadingCategories(false);
  };

  const fetchJobs = async () => {
    const baseUrl: string = "http://localhost:8080/api/jobs";

    const response = await fetch(baseUrl);

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

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
    setJobs(loadedJobs);
    setisLoadingJobs(false);
  };

  useEffect(() => {
    fetchEmployers().catch((error: any) => {
      setisLoadingEmployers(false);
      setHttpError(error.message);
    });

    fetchCategories().catch((error: any) => {
      setisLoadingCategories(false);
      setHttpError(error.message);
    });

    fetchJobs().catch((error: any) => {
      setisLoadingJobs(false);
      setHttpError(error.message);
    });
    window.scrollTo(0, 0);
  }, []);

  if (isLoadingEmployers || isLoadingCategories || isLoadingJobs) {
    return <Spinner />;
  }

  if (httpError) {
    return <ErrorBox text={httpError} />;
  }

  const findEmployerById = (employerId: string) =>
    employers.find((emp) => emp.id === employerId);

  return (
    <AppContext.Provider value={{ employers, categories, jobs }}>
      <section className="mt-5">
        <div className="px-6 py-8">
          <div className="flex justify-between container mx-auto">
            <div className="-mx-8 w-4/12 hidden lg:block">
              <div className="px-8">
                <h1 className="mb-4 text-base font-semibold text-black">
                  Một số nhà tuyển dụng nổi bật:
                </h1>
                <div className="flex flex-col bg-white max-w-sm px-6 py-4 mx-auto rounded-lg">
                  <ul className="">
                    {employers.map((employer) => (
                      <li key={employer.id} className="flex items-center py-4">
                        <ReturnEmployerInJobPage  employer={employer} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-10 px-8">
                <h1 className="mb-4 text-base font-semibold text-black">
                  Loại hình công việc:
                </h1>
                <div className="flex flex-col bg-white px-4 py-6 max-w-sm mx-auto rounded-lg">
                  <ul>
                    {categories.map((category) => (
                      <li className="flex items-center py-4">
                        <div className="w-1/4 items-center">
                          <img
                            src={category.image}
                            alt="avatar"
                            className="w-5/12 object-cover mx-auto"
                          />
                        </div>
                        <div className="w-3/4">
                          <a
                            href="#"
                            className="text-gray-700 font-medium hover:text-orangetext text-sm"
                          >
                            {category.name}
                            <span className="text-gray-700 text-xs font-light">
                              (10 jobs)
                            </span>
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-8/12">
              <div className="w-full ">
                <h1 className="text-xl font-semibold text-black md:text-2xl mb-5">
                  Danh sách việc làm
                </h1>
              </div>
              <div className="flex-row w-full  bg-white px-4 py-2 justify-between rounded-2xl md:rounded-full md:flex">
                <div className="flex gap-4 mx-1 my-4 md:m-0">
                  <div className="text-orangetext">
                    <AiOutlineSearch className="h-full text-2xl" />
                  </div>
                  <input
                    className=" placeholder:text-slate-400 block bg-white w-full  py-1 px-3 focus:outline-none focus:border-orangetext focus:ring-orangetext focus:ring-1 sm:text-sm rounded"
                    placeholder="Vị trí tuyển dụng..."
                    type="text"
                    name="job"
                  />
                </div>
                <div className="flex gap-4 text-lg mx-1 my-5 md:m-0">
                  <div className="text-orangetext">
                    <AiOutlineEnvironment className="h-full text-2xl" />
                  </div>
                  <select
                    className="text-gray-900 block w-full py-1 px-3 focus:outline-none focus:border-orangetext focus:ring-orangetext focus:ring-1 text-sm rounded"
                    onChange={handleChange}
                    value={selectedOption}
                  >
                    <option
                      value="ALL"
                      className={
                        selectedOption === "ALL" ? "text-orangetext" : ""
                      }
                    >
                      Tất cả tỉnh/thành phố
                    </option>
                    <option
                      value="US"
                      className={
                        selectedOption === "US" ? "text-orangetext" : ""
                      }
                    >
                      United States
                    </option>
                    <option
                      value="CA"
                      className={
                        selectedOption === "CA" ? "text-orangetext" : ""
                      }
                    >
                      Canada
                    </option>
                    <option
                      value="FR"
                      className={
                        selectedOption === "FR" ? "text-orangetext" : ""
                      }
                    >
                      France
                    </option>
                    <option
                      value="DE"
                      className={
                        selectedOption === "DE" ? "text-orangetext" : ""
                      }
                    >
                      Germany
                    </option>
                  </select>
                </div>
                <div className="">
                  <button className="text-white px-8 py-2 rounded-full font-semibold bg-orangetext hover:outline-none hover:ring hover:ring-orangebackground  my-2 md:m-0">
                    Tìm kiếm
                  </button>
                </div>
              </div>
              <div className="mt-5">
                {jobs.map((job) => (
                  <ReturnJobInJobsPage
                    key={job.id}
                    job={job}
                    employer={findEmployerById(job.employerId)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppContext.Provider>
  );
};
