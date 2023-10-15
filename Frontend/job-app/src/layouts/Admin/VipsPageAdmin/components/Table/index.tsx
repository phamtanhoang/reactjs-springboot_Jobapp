/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { VipModel } from "../../../../../models/VipModel";
import { ErrorBox, PaginationAdmin, Spinner } from "../../../../../components";
import vipsAPI from "../../../../../services/Vips";
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import { UpdateVipAdmin } from "..";
import Swal from "sweetalert2";

const TablePageAdmin: React.FC<{ title: string }> = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [vips, setVips] = useState<VipModel[]>([]);

  const [vip, setVip] = useState<VipModel>();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [totalAmountOfItems, setTotalAmountOfItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [showBoxUpdate, setShowBoxUpdate] = useState(false);
  const [previousTitle, setPreviousTitle] = useState("");

  useEffect(() => {
    const fetchVips = () => {
      vipsAPI
        .getVipsByTitleAndAdminToken(
          props.title,
          currentPage - 1,
          itemsPerPage,
          localStorage.getItem("adminToken") || ""
        )
        .then((res) => {
          setVips(res.data.content);
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

    fetchVips();
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

  const UpdateVip = (vip: VipModel) => {
    setShowBoxUpdate(true);
    setVip(vip);
  };

  const DeleteVip = (vip: VipModel) => {
    Swal.fire({
      title: "Do you want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        vipsAPI
          .deleteVipByAdminToken(
            vip.id,
            localStorage.getItem("adminToken") || ""
          )
          .then(() => {
            Swal.fire({
              title: "Delete vip success",
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
            Swal.fire("Error!", "Delete vip fail!", "error");
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
                        Vip Name
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-semibold text-left rtl:text-right text-gray-600 "
                      >
                        Amount
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-semibold text-left rtl:text-right text-gray-600 "
                      >
                        Price
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-semibold text-left rtl:text-right text-gray-600 "
                      >
                        State
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
                        {vips.map((vip, i) => (
                          <tr key={i}>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 ">
                              <div className="inline-flex items-center gap-x-3">
                                <span>#{i}</span>
                              </div>
                            </td>

                            <td className="px-4 py-4 text-sm text-gray-700 ">
                              {vip.name}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700 ">
                              {vip.amount} month(s)
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700">
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(vip.price)}
                            </td>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700">
                              {vip.state == "active" ? (
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
                                    Inactive
                                  </h2>
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center gap-x-6 text-2xl text-gray-600">
                                <AiFillEdit
                                  className=" cursor-pointer hover:text-blue-500"
                                  onClick={() => UpdateVip(vip)}
                                />
                                <AiFillDelete
                                  className=" cursor-pointer hover:text-red-500"
                                  onClick={() => DeleteVip(vip)}
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
      {showBoxUpdate && localStorage.getItem("adminToken") && (
        <UpdateVipAdmin setShowBoxUpdate={setShowBoxUpdate} vip={vip} />
      )}
    </>
  );
};
export default TablePageAdmin;
