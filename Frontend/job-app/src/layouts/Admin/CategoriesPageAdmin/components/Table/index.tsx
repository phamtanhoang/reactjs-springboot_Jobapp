/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ErrorBox, PaginationAdmin, Spinner } from "../../../../../components";
import { CategoryModel } from "../../../../../models/CategoryModel";
import { categoriesAPI } from "../../../../../services";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { UpdateCategoryPage } from "..";
import Swal from "sweetalert2";

const TablePage: React.FC<{ title: string }> = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [categories, setCategories] = useState<CategoryModel[]>([]);

  const [category, setCategory] = useState<CategoryModel>();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [totalAmountOfItems, setTotalAmountOfItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [showBoxUpdateCategory, setShowBoxUpdateCategory] = useState(false);
  const [previousTitle, setPreviousTitle] = useState("");

  useEffect(() => {
    const fetchApplications = () => {
      categoriesAPI
        .getCategoryByNameAndAdminToken(
          props.title,
          currentPage - 1,
          itemsPerPage,
          localStorage.getItem("adminToken") || ""
        )
        .then((res) => {
          setCategories(res.data.content);
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

    if (props.title != previousTitle) {
      setCurrentPage(1);
      setPreviousTitle(props.title);
    }

    fetchApplications();
  }, [currentPage, itemsPerPage, previousTitle, props.title]);

  if (isLoading) {
    return (
      <div className="flex-grow">
        <Spinner />
      </div>
    );
  }

  if (httpError) {
    return (
      <div className="flex-grow px-6 mx-auto ">
        <ErrorBox text={httpError} />
      </div>
    );
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const UpdateCategory = (cate: CategoryModel) => {
    setShowBoxUpdateCategory(true);
    setCategory(cate);
  };

  const DeleteCategory = (cate: CategoryModel) => {
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
        categoriesAPI
          .deleteCategoryByAdminToken(
            cate.id,
            localStorage.getItem("adminToken") || ""
          )
          .then(() => {
            Swal.fire({
              title: "Delete category success",
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
            Swal.fire("Error!", "Delete category error!", "error");
          })
          .finally(() => {
            waitingPopup.close();
          });
      }
    });
  };
  return (
    <>
      <div className="px-3 lg:px-6 mx-auto">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full lign-middle">
              <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 cursor-default">
                  <thead className="bg-gray-50 ">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-semibold text-left rtl:text-right text-gray-600 "
                      >
                        S.No
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-semibold text-left rtl:text-right text-gray-600 "
                      >
                        Category Name
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-semibold text-left rtl:text-right text-gray-600 "
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 ">
                    {totalAmountOfItems > 0 ? (
                      <>
                        {categories.map((category, i) => (
                          <tr key={i}>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 ">
                              <div className="inline-flex items-center gap-x-3">
                                <span>#{i}</span>
                              </div>
                            </td>

                            <td className="px-4 py-4 text-sm text-gray-600 ">
                              {category.name}
                            </td>

                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center gap-x-6 text-2xl text-gray-600">
                                <AiFillEdit
                                  className=" cursor-pointer hover:text-blue-500"
                                  onClick={() => UpdateCategory(category)}
                                />
                                <AiFillDelete
                                  className=" cursor-pointer hover:text-red-500"
                                  onClick={() => DeleteCategory(category)}
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
                            <ErrorBox text="There are no categories!!!" />
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
      {showBoxUpdateCategory && localStorage.getItem("adminToken") && (
        <UpdateCategoryPage
          setShowBoxUpdateCategory={setShowBoxUpdateCategory}
          cate={category}
        />
      )}
    </>
  );
};
export default TablePage;
