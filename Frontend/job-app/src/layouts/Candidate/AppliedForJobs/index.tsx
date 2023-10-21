/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { EmployerModel } from "../../../models/EmployerModel";
import { ErrorBox, Pagination, Spinner } from "../../../components";
import { applicationsAPI, employersAPI } from "../../../services";
import { EmployerItem } from "../JobsPage/components";
import { ApplicationResponseModel } from "../../../models/ApplicationResponseModel";
import { JobItem } from "./components";

const AppliedForJob = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [state, setState] = useState("");

  const [employers, setEmployers] = useState<EmployerModel[]>([]);

  const [applications, setApplications] = useState<ApplicationResponseModel[]>(
    []
  );

  const [currentEmployerPage, setCurrentEmployerPage] = useState(1);
  const [employersPerPage] = useState(6);
  const [totalAmountOfEmployers, setTotalAmountOfEmployers] = useState(0);
  const [totalEmployerPages, setTotalEmployerPages] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [totalAmountOfItems, setTotalAmountOfItems] = useState(0);
  const [totalItemPages, setTotalItemPages] = useState(0);

  // //Get EmployerVIP
  useEffect(() => {
    const getEmployers = () => {
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
    getEmployers();
  }, [currentEmployerPage, employersPerPage]);
  console.log(applications);
  // Get Job in local
  useEffect(() => {
    const getApplications = () => {
      setIsLoading(true);
      applicationsAPI
        .getApplicationByCandidateToken(
          state,
          currentPage - 1,
          itemsPerPage,
          localStorage.getItem("candidateToken") || ""
        )
        .then((res) => {
          setApplications(res.data.content);
          setTotalAmountOfItems(res.data.totalElements);
          setTotalItemPages(res.data.totalPages);
        })
        .catch((error: any) => setHttpError(error.message))
        .finally(() => {
          setIsLoading(false);
        });
    };

    getApplications();
  }, [currentPage, itemsPerPage, state]);

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

  const paginateEmployer = (pageNumber: number) =>
    setCurrentEmployerPage(pageNumber);

  const paginates = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <section className="text-gray-700">
        <div className="px-3 py-6 sm:px-6 sm:py-10 ">
          <div className="flex justify-between w-full md:w-[95%] lg:w-full xl:w-[85%] mx-auto">
            <div className="w-full lg:w-8/12">
              <div className="w-full flex-row sm:flex lg:justify-between py-3 pl-5 bg-white rounded-lg shadow-md ">
                <h1 className="text-lg sm:text-xl font-semibold md:text-2xl  uppercase">
                  Công việc đã ứng tuyển:
                </h1>
              </div>
              <div className="bg-white px-3 py-3 sm:px-5 sm:py-5 mt-5 rounded-b-lg">
                <div className="border-b border-b-gray-300" >
                  <ul className="flex items-center gap-2 xl:gap-4 font-medium">
                    <li className="flex-1">
                      <a
                        href="#"
                        className={`text-sm md:text-base flex items-center justify-center gap-2 px-1 py-3 pt-0 text-gray-700 hover:text-orangetext ${
                          state == "" &&
                          "text-orangetext  relative  after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-orangetext "
                        }`}
                        onClick={() => setState("")}
                      >
                        Tất cả
                      </a>
                    </li>
                    <li className="flex-1">
                      <a
                        href="#"
                        className={`text-sm md:text-base flex items-center justify-center gap-2 px-1 py-3 pt-0 text-gray-700 hover:text-orangetext ${
                          state == "pending" &&
                          "text-orangetext  relative  after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-orangetext "
                        }`}
                        onClick={() => setState("pending")}
                      >
                        Chờ xét duyệt
                      </a>
                    </li>
                    <li className="flex-1">
                      <a
                        href="#"
                        className={`text-sm md:text-base flex items-center justify-center gap-2 px-1 py-3 pt-0 text-gray-700 hover:text-orangetext ${
                          state == "approved" &&
                          "text-orangetext  relative  after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-orangetext "
                        }`}
                        onClick={() => setState("approved")}
                      >
                        Phù hợp
                      </a>
                    </li>
                    <li className="flex-1">
                      <a
                        href="#"
                        className={`text-sm md:text-base flex items-center justify-center gap-2 px-1 py-3 pt-0 text-gray-700 hover:text-orangetext ${
                          state == "refused" &&
                          "text-orangetext  relative  after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-orangetext "
                        }`}
                        onClick={() => setState("refused")}
                      >
                        Chưa phù hợp
                      </a>
                    </li>
                  </ul>
                </div>
                {totalAmountOfItems > 0 ? (
                  <>
                    <ul className="">
                      {applications.map((application) => (
                        <JobItem
                          key={application.id}
                          application={application}
                        />
                      ))}
                    </ul>
                    <div className="flex justify-center sm:justify-between mt-8">
                      <div className="font-medium hidden sm:block">
                        <p>
                          Hiện tối đa {itemsPerPage} công việc trên 1 trang:
                        </p>
                      </div>
                      {totalItemPages > 0 && (
                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalItemPages}
                          paginate={paginates}
                          type={true}
                        />
                      )}
                    </div>
                  </>
                ) : (
                  <div className="mt-5">
                    <ErrorBox text="Không có công việc nào!!!" />
                  </div>
                )}
              </div>
            </div>
            <div className="-mx-8 w-4/12 hidden lg:block">
              <div className="px-8">
                <h1 className="mb-5 text-xl font-semibold py-3 pl-5 bg-white rounded-lg shadow-md ">
                  Một số nhà tuyển dụng nổi bật:
                </h1>
                <div className="flex flex-col bg-white px-8 py-2 mx-auto rounded-lg shadow-lg w-full">
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
          </div>
        </div>
      </section>
    </>
  );
};
export default AppliedForJob;
