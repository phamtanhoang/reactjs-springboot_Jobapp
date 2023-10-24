/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ErrorBox, Pagination } from "../../../../../components";
import { EmployerModel } from "../../../../../models/EmployerModel";
import { JobModel } from "../../../../../models/JobModel";
import { blogsAPI, jobsAPI } from "../../../../../services";
import { BlogResponseModel } from "../../../../../models/BlogResponseModel";
import { JobItem } from "..";
import BlogItem from "../BlogItem";

export const RightPage: React.FC<{
  employer?: EmployerModel;
}> = (props) => {
  const [activeLink, setActiveLink] = useState(true);

  const [jobs, setJobs] = useState<JobModel[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [totalAmountOfItems, setTotalAmountOfItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [blogs, setBlogs] = useState<BlogResponseModel[]>([]);

  const [currentBlogPage, setCurrentBlogPage] = useState(1);
  const [blogsPerPage] = useState(5);
  const [totalAmountOfBlogs, setTotalAmountOfBlogs] = useState(0);
  const [totalBlogPages, setTotalBlogPages] = useState(0);

  useEffect(() => {
    const fetchJobs = () => {
      jobsAPI
        .getJobsByEmployerId(
          props.employer?.id || "",
          currentPage - 1,
          itemsPerPage
        )
        .then((res) => {
          setJobs(res.data._embedded.jobs);
          setTotalAmountOfItems(res.data.page.totalElements);
          setTotalPages(res.data.page.totalPages);
        })
        .catch((error: any) => console.log(error));
    };
    fetchJobs();
  }, [currentPage, itemsPerPage, props.employer?.id]);

  useEffect(() => {
    const fetchBlogs = () => {
      blogsAPI
        .getBlogsByEmployerId(
          props.employer?.id || "",
          currentBlogPage - 1,
          blogsPerPage
        )
        .then((res) => {
          setBlogs(res.data.content);
          setTotalAmountOfBlogs(res.data.totalElements);
          setTotalBlogPages(res.data.totalPages);
        })
        .catch((error: any) => console.log(error));
    };
    fetchBlogs();
  }, [blogsPerPage, currentBlogPage, props.employer?.id]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const paginateEmployers = (pageNumber: number) =>
    setCurrentBlogPage(pageNumber);
  return (
    <div className="lg:-mx-8 w-full lg:w-[35%]">
      <div className="">
        <div className="text-sm font-medium text-center text-[#333333] border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px text-lg font-semibold">
            <li className="mr-2">
              <button
                className={`inline-block p-4  border-b-2 rounded-t-lg  ${
                  activeLink
                    ? "text-orangetext border-orangetext"
                    : "border-transparent hover:text-gray-600 hover:border-gray-300"
                } `}
                aria-current="page"
                onClick={() => setActiveLink(true)}
              >
                Tuyển dụng
              </button>
            </li>
            <li className="mr-2">
              <button
                className={`inline-block p-4  border-b-2 rounded-t-lg  ${
                  !activeLink
                    ? "text-orangetext border-orangetext"
                    : "border-transparent hover:text-gray-600 hover:border-gray-300"
                } `}
                onClick={() => setActiveLink(false)}
              >
                Blog
              </button>
            </li>
          </ul>
        </div>
        <div className="flex flex-col bg-white w-full px-8 py-2 rounded-b-lg shadow-md">
          {activeLink ? (
            <ul className="-mx-4 text-[#333333]">
              {totalAmountOfItems > 0 ? (
                <>
                  {jobs.map((job) => (
                    <li
                      key={job.id}
                      className="flex items-center my-2 bg-[#fff4e9] rounded-lg p-3 border-2 border-orangebackground"
                    >
                      <JobItem job={job} />
                    </li>
                  ))}
                  <div className="flex justify-center m-2">
                    {totalPages > 0 && (
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        paginate={paginate}
                        type={false}
                      />
                    )}
                  </div>
                </>
              ) : (
                <ErrorBox text="Không có thông tin tuyển dụng" />
              )}
            </ul>
          ) : (
            <ul className="-mx-4 text-[#333333]">
              {totalAmountOfBlogs > 0 ? (
                <>
                  {blogs.map((blog, i) => (
                    <li
                      key={i}
                      className="flex items-center my-2 bg-[#fff4e9] rounded-lg p-3 border-2 border-orangebackground"
                    >
                      <BlogItem blog={blog} key={i} />
                    </li>
                  ))}
                  <div className="flex justify-center m-2">
                    {totalBlogPages > 0 && (
                      <Pagination
                        currentPage={currentBlogPage}
                        totalPages={totalBlogPages}
                        paginate={paginateEmployers}
                        type={false}
                      />
                    )}
                  </div>
                </>
              ) : (
                <ErrorBox text="Không có blog nào được đăng" />
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
