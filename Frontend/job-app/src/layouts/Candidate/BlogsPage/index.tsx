/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BlogResponseModel } from "../../../models/BlogResponseModel";
import { ErrorBox, Pagination, Spinner } from "../../../components";
import { blogsAPI, employersAPI } from "../../../services";
import { BlogItem, TopBlogItem } from "./components";

import { EmployerModel } from "../../../models/EmployerModel";

const BlogsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [blogs, setBlogs] = useState<BlogResponseModel[]>([]);
  const [topBlogs, setTopBlogs] = useState<BlogResponseModel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalAmountOfItems, setTotalAmountOfItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [employers, setEmployers] = useState<EmployerModel[]>([]);

  const [currentEmployerPage, setCurrentEmployerPage] = useState(1);
  const [employersPerPage] = useState(6);
  const [totalAmountOfEmployers, setTotalAmountOfEmployers] = useState(0);
  const [totalEmployerPages, setTotalEmployerPages] = useState(0);

  useEffect(() => {
    const getBlogs = () => {
      blogsAPI
        .getBlogs("", currentPage - 1, itemsPerPage)
        .then((res) => {
          setBlogs(res.data.content);
          setTotalAmountOfItems(res.data.totalElements);
          setTotalPages(res.data.totalPages);
        })
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    getBlogs();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    const getBlogs = () => {
      setIsLoading(true);
      blogsAPI
        .getTopBlogs()
        .then((res) => {
          setTopBlogs(res.data.content);
        })
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    getBlogs();
  }, [currentPage, itemsPerPage]);

  //Get EmployerVIP
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

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const paginateEmployer = (pageNumber: number) =>
    setCurrentEmployerPage(pageNumber);

  return (
    <>
      <div className="px-6 py-8">
        <div className="flex justify-between container mx-auto">
          <div className="w-full lg:w-8/12">
            <div className="w-full flex-row sm:flex  lg:justify-between py-3 pl-5 bg-white rounded-lg shadow-md ">
              <h1 className="text-lg sm:text-xl font-bold md:text-2xl  uppercase">
                Danh sách bài đăng:
              </h1>
            </div>
            {totalAmountOfItems > 0 ? (
              <>
                {blogs.map((blog, i) => (
                  <BlogItem blog={blog} key={i} />
                ))}
                <div className="flex justify-center sm:justify-between mt-8">
                  <div className="font-medium hidden sm:block">
                    <p>Hiện tối đa {itemsPerPage} blog trên 1 trang:</p>
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
              <ErrorBox text="Không có Blog nào!" />
            )}
          </div>
          <div className="-mx-8 w-4/12 hidden lg:block">
            <div className="px-8">
              <h1 className="mb-5 text-xl font-bold py-3 pl-5 bg-white rounded-lg shadow-md">
                Một số tác giả nổi bật:
              </h1>
              <div className="flex flex-col bg-white px-8 py-2 mx-auto rounded-lg shadow-lg">
                <ul className="-mx-4">
                  {totalAmountOfEmployers > 0 ? (
                    <>
                      <ul className="">
                        {employers.map((employer) => (
                          <li className="flex items-center p-4">
                            <div className="w-1/5 items-center mr-2">
                              <img
                                src={
                                  employer.image
                                    ? employer.image
                                    : "https://res.cloudinary.com/dcpatkvcu/image/upload/v1695807392/DoAnNganh/non-user_lctzz5.jpg"
                                }
                                alt="avatar"
                                className="w-[30px] h-[30px] xl:w-[40px] xl:h-[40px] rounded-sm "
                              />
                            </div>
                            <div className="w-4/5">
                              <Link
                                to={`/home/employer/${employer.id}`}
                                className="text-gray-700 font-semibold hover:text-orangetext text-sm"
                              >
                                {employer.name}
                              </Link>
                            </div>
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
                    <ErrorBox text="Không có tác giả nổi bật nào" />
                  )}
                </ul>
              </div>
            </div>
            <div className="mt-10 px-8">
              <h1 className="mb-5 text-xl font-bold py-3 pl-5 bg-white rounded-lg shadow-md">
                Một số bài đăng nổi bật:
              </h1>
              <div className="flex flex-col bg-white px-4 xl:px-6 py-4 max-w-sm mx-auto rounded-lg shadow-md">
                {topBlogs.length > 0 ? (
                  <>
                    {topBlogs.map((blog, i) => (
                      <TopBlogItem blog={blog} key={i} />
                    ))}
                  </>
                ) : (
                  <ErrorBox text="Không có Blog nào!" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BlogsPage;
