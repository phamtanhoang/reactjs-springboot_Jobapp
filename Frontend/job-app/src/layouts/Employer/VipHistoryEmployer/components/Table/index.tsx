/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ErrorBox, PaginationAdmin, Spinner } from "../../../../../components";
import { employersAPI } from "../../../../../services";
import { VipResponseModel } from "../../../../../models/VipResponse";

const TablePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [vips, setVips] = useState<VipResponseModel[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [totalAmountOfItems, setTotalAmountOfItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchVips = () => {
      employersAPI
        .getVipHistoriesByEmployerToken(
          currentPage - 1,
          itemsPerPage,
          localStorage.getItem("employerToken") || ""
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
    fetchVips();
  }, [currentPage, itemsPerPage]);

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
                        From Date
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-semibold text-left rtl:text-right text-gray-600 "
                      >
                        To Date
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
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 ">
                    {totalAmountOfItems > 0 ? (
                      <>
                        {vips.map((vip, i) => (
                          <tr key={i}>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700">
                              <div className="inline-flex items-center gap-x-3">
                                <span>#{vip.employerVipId}</span>
                              </div>
                            </td>

                            <td className="px-4 py-4 text-sm text-gray-600 ">
                              {vip.vipName}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-600 ">
                              {vip.fromDate &&
                                new Date(vip.fromDate).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-600 ">
                              {vip.toDate &&
                                new Date(vip.toDate).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-600 ">
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(vip.price || 0)}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-600">
                              {(() => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);

                                const fromDate = new Date(vip.fromDate);
                                const toDate = new Date(vip.toDate);

                                let status;
                                let statusColor;

                                if (today < fromDate && today < toDate) {
                                  status = "Not Used";
                                  statusColor =
                                    "text-yellow-500 bg-yellow-100/50 ";
                                } else if (
                                  today >= fromDate &&
                                  today <= toDate
                                ) {
                                  status = "In Use";
                                  statusColor = "text-blue-500 bg-blue-100/50";
                                } else {
                                  status = "Used";
                                  statusColor = "text-red-500 bg-red-100/50";
                                }

                                return (
                                  <span
                                    className={`${statusColor} py-2  px-3 rounded-lg`}
                                  >
                                    {status}
                                  </span>
                                );
                              })()}
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td colSpan={6}>
                          <div className="w-full p-5">
                            <ErrorBox text="There are no vip hitories!!!" />
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
    </>
  );
};
export default TablePage;
