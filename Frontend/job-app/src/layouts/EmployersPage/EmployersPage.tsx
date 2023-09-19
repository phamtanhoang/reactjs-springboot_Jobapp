/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import EmployerModel from "../../models/EmployerModel";
import { Spinner } from "../Utils/Spinner";
import { ErrorBox } from "../Utils/ErrorBox";
import { ReturnEmployerInEmployersPage } from "./components/ReturnEmployerInEmployersPage";
import { Pagination } from "../Utils/Pagination";
import { TopEmployers } from "../HomePage/components/TopEmployers";

export const EmployersPage = () => {
  const [employers, setEmployers] = useState<EmployerModel[]>([]);
  const [employerVips, setEmployerVips] = useState<EmployerModel[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [employersPerPage, setEmployersPerPage] = useState(9);
  const [totalAmountOfEmployers, setTotalAmountOfEmployers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [searchUrl, setSearchUrl] = useState("");

  useEffect(() => {
    const fetchEmployers = async () => {
      const baseUrl: string = "http://localhost:8080/api/employers";

      let url: string = "";

      if (searchUrl === "") {
        url = `${baseUrl}?page=${currentPage - 1}&size=${employersPerPage}`;
      } else {
        url = baseUrl + searchUrl;
      }

      const response = await fetch(url);

      const responseJson = await response.json();
      const responseData = responseJson._embedded.employers;
      const loadedEmployers: EmployerModel[] = [];

      setTotalAmountOfEmployers(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPages);

      for (const key in responseData) {
        loadedEmployers.push({
          id: responseData[key].id,
          name: responseData[key].name,
          address: responseData[key].address,
          description: responseData[key].description,
          image: responseData[key].image,
          banner: responseData[key].banner,
          accountId: responseData[key].accountId,
        });
      }

      setEmployers(loadedEmployers);
      setIsLoading(false);
    };

    fetchEmployers().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });

    window.scrollTo(0, 0);
  }, [currentPage, employersPerPage, searchUrl]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setEmployersPerPage(5);
      } else if (window.innerWidth < 1024) {
        setEmployersPerPage(6);
      } else {
        setEmployersPerPage(9);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchEmployers = async () => {
      const baseUrl: string = `http://localhost:8080/api/employers/search/findVipEmployers`;
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
          banner: responseData[key].banner,
          accountId: responseData[key].accountId,
        });
      }

      setEmployerVips(loadedEmployers);
      setIsLoading(false);
    };

    fetchEmployers().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
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

  const searchChange = (value: any) => {
    if (value === "") {
      setSearchUrl("");
    } else {
      setSearchUrl(
        `/search/findByNameContaining?name=${value}&page=0&size=${employersPerPage}`
      );
    }
    setCurrentPage(1);
  };
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <section className="text-gray-700">
        <div className="px-6 pt-10 ">
          <div className="w-full md:w-[95%] lg:w-full xl:w-[85%] mx-auto">
            <div className="w-full">
              <h1 className="text-lg sm:text-xl font-bold md:text-2xl text-center uppercase">
                Danh sách nhà tuyển dụng
              </h1>
            </div>
            <div className="w-full my-7">
              <form>
                <div className="relative w-full lg:w-[80%] mx-auto text-sm sm:text-base">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                    <AiOutlineSearch className="w-6 h-6" />
                  </div>
                  <input
                    type="search"
                    className="block w-full  p-4 pl-14 text-gray-900 border-2 border-gray-200 rounded-lg bg-white focus:ring-orangetext focus:border-orangetext focus:outline-none"
                    placeholder="Nhập tên nhà tuyển dụng...."
                    onChange={(e) => searchChange(e.target.value)}
                  />
                </div>
              </form>
            </div>
            {totalAmountOfEmployers > 0 ? (
              <>
                <div className="w-full grid gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                  {employers.map((employer) => (
                    <ReturnEmployerInEmployersPage
                      employer={employer}
                      key={employer.id}
                    />
                  ))}
                </div>
                <div className="flex justify-center mt-8">
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
              <ErrorBox text="Không tìm thấy nhà tuyển dụng phù hợp" />
            )}
          </div>
        </div>
      </section>
      <TopEmployers employers={employerVips} />
    </>
  );
};
