import { useEffect, useState } from "react";
import { blogsAPI } from "../../../../../services";
import { ErrorBox, PaginationAdmin, Spinner } from "../../../../../components";
import {
  AiFillDelete,
  AiFillEdit,
  AiFillEye,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { EditPage } from "..";
import { BlogResponseModel } from "../../../../../models/BlogResponseModel";

/* eslint-disable @typescript-eslint/no-explicit-any */
const TablePage: React.FC<{ title: any }> = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [blogs, setBlogs] = useState<BlogResponseModel[]>([]);

  const [editBlog, setEditBlog] = useState<BlogResponseModel>();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [totalAmountOfItems, setTotalAmountOfItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [showBoxEdit, setShowBoxEdit] = useState(false);

  useEffect(() => {
    const fetchBlogs = () => {
      blogsAPI
        .getAllBlogsByAdminToken(
          props.title,
          currentPage - 1,
          itemsPerPage,
          localStorage.getItem("adminToken") || ""
        )
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
    fetchBlogs();
  }, [currentPage, itemsPerPage, props.title]);

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

  const EditHandle = (x: BlogResponseModel) => {
    setShowBoxEdit(true);
    setEditBlog(x);
  };

  const DeleteHandle = (x: BlogResponseModel) => {
    Swal.fire({
      title: "Do you want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        const waitingPopup: any = Swal.fire({
          title: "Waiting...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        blogsAPI
          .deleteBlogByAdminToken(
            x.blogId,
            localStorage.getItem("adminToken") || ""
          )
          .then(() => {
            Swal.fire({
              title: "Delete success",
              icon: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Yes",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          })
          .catch(() => {
            Swal.fire("Error!", "Delete fail!", "error");
          })
          .finally(() => {
            waitingPopup.close();
          });
      }
    });
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="px-3 md:px-6 mx-auto">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full lign-middle">
              <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 cursor-default">
                  <thead className="bg-gray-50 ">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-600 "
                      >
                        S.No
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-600 "
                      >
                        Title
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-600 "
                      >
                        State
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-600 "
                      >
                        Created at
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-600 "
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 ">
                    {totalAmountOfItems > 0 ? (
                      <>
                        {blogs.map((blog, i) => (
                          <tr key={i}>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 ">
                              <div className="inline-flex items-center gap-x-3">
                                <span>#{i}</span>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-600 ">
                              {blog.title}
                            </td>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              {blog.state == "active" ? (
                                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 ">
                                  <AiOutlineCheck />
                                  <h2 className="text-sm font-normal">
                                    Active
                                  </h2>
                                </div>
                              ) : (
                                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-red-500 bg-red-100/60 ">
                                  <AiOutlineClose />
                                  <h2 className="text-sm font-normal">
                                    InActive
                                  </h2>
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-600 ">
                              {blog.createdAt &&
                                new Date(blog.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center gap-x-6 text-2xl text-gray-600">
                                <Link to={`/admin/blog/${blog.blogId}`}>
                                  <AiFillEye className=" cursor-pointer hover:text-yellow-500" />
                                </Link>

                                <AiFillEdit
                                  className=" cursor-pointer hover:text-blue-500"
                                  onClick={() => {
                                    EditHandle(blog);
                                  }}
                                />

                                <AiFillDelete
                                  className=" cursor-pointer hover:text-red-500"
                                  onClick={() => DeleteHandle(blog)}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td colSpan={6}>
                          <div className="w-full p-5">
                            <ErrorBox text="There are no blog!!!" />
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {totalPages > 0 && (
          <PaginationAdmin
            paginate={paginate}
            currentPage={currentPage}
            totalPages={totalPages}
            type={false}
          />
        )}
      </div>
      {showBoxEdit && localStorage.getItem("adminToken") && (
        <EditPage setShowBoxEdit={setShowBoxEdit} blog={editBlog} />
      )}
    </>
  );
};
export default TablePage;
