/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ApplicationResponseModel } from "../../../../../models/ApplicationResponseModel";
import { ErrorBox, PaginationAdmin, Spinner } from "../../../../../components";
import { applicationsAPI } from "../../../../../services";
import {
  AiFillDelete,
  AiFillEye,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineExclamation,
} from "react-icons/ai";
import Swal from "sweetalert2";
import { DetailApplicationAdmin } from "..";

const TableApplicationAdmin: React.FC<{ name: string }> = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [aplications, setApplications] = useState<ApplicationResponseModel[]>(
    []
  );
  const [aplication, setApplication] = useState<ApplicationResponseModel>();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [totalAmountOfItems, setTotalAmountOfItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [showBoxDetail, setShowBoxDetail] = useState(false);

  const [previousName, setPreviousName] = useState("");

  useEffect(() => {
    const fetchApplications = () => {
      applicationsAPI
        .getApplycationsByEmplyerAndAdminToken(
          props.name,
          currentPage - 1,
          itemsPerPage,
          localStorage.getItem("adminToken") || ""
        )
        .then((res) => {
          setApplications(res.data.content);
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

    if (props.name != previousName) {
      setCurrentPage(1);
      setPreviousName(props.name);
    }

    fetchApplications();
  }, [currentPage, itemsPerPage, previousName, props.name]);

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

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const HandleDetail = (application: ApplicationResponseModel) => {
    setShowBoxDetail(true);
    setApplication(application);
  };

  const HandleDelete = (application: ApplicationResponseModel) => {
    Swal.fire({
      title: "Do you want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        applicationsAPI
          .deleteApplicationByAdminToken(
            application.id,
            localStorage.getItem("adminToken") || ""
          )
          .then(() => {
            Swal.fire({
              title: "Delete application success",
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
            Swal.fire("Error!", "Delete application fail!", "error");
          });
      }
    });
  };

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
                        Candidate
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-600 "
                      >
                        Apply Date
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-600 "
                      >
                        Job
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
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 ">
                    {totalAmountOfItems > 0 ? (
                      <>
                        {aplications.map((application, i) => (
                          <tr key={i}>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 ">
                              <div className="inline-flex items-center gap-x-3">
                                <span>#{i}</span>
                              </div>
                            </td>

                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              <div className="flex items-center gap-x-2">
                                <img
                                  className="object-cover w-8 h-8 rounded-full"
                                  src={
                                    application.image
                                      ? application.image
                                      : "https://res.cloudinary.com/dcpatkvcu/image/upload/v1695807392/DoAnNganh/non-user_lctzz5.jpg"
                                  }
                                  alt="logo"
                                />
                                <div>
                                  <h2 className="text-sm font-semibold text-gray-800 dark:text-white cursor-pointer">
                                    {application.accountName}
                                  </h2>
                                  <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                                    {application.userName}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="px-4 py-4 text-sm text-gray-600 ">
                              {application.applyDate &&
                                new Date(
                                  application.applyDate
                                ).toLocaleDateString()}
                            </td>

                            <td className="px-4 py-4 text-sm text-gray-600 ">
                              <p className="">{application.title}</p>
                              {new Date(application.expiredDate) <
                                new Date() && (
                                <span className="text-red-500 ml-2">
                                  (Expired)
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              {application.state == "pending" ? (
                                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-yellow-500 bg-yellow-100/60 ">
                                  <AiOutlineExclamation />
                                  <h2 className="text-sm font-normal">
                                    Pending
                                  </h2>
                                </div>
                              ) : application.state == "approved" ? (
                                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 ">
                                  <AiOutlineCheck />
                                  <h2 className="text-sm font-normal">
                                    Approved
                                  </h2>
                                </div>
                              ) : (
                                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-red-500 bg-red-100/60 ">
                                  <AiOutlineClose />
                                  <h2 className="text-sm font-normal">
                                    Refused
                                  </h2>
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center gap-x-6 text-2xl text-gray-600">
                                <AiFillEye
                                  className=" cursor-pointer hover:text-yellow-500"
                                  onClick={() => HandleDetail(application)}
                                />
                                <AiFillDelete
                                  className=" cursor-pointer hover:text-red-500"
                                  onClick={() => {
                                    HandleDelete(application);
                                  }}
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
                            <ErrorBox text="There are no applications" />
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
            type={true}
          />
        )}
      </div>

      {showBoxDetail && localStorage.getItem("adminToken") && (
        <DetailApplicationAdmin
          setShowBoxDetail={setShowBoxDetail}
          application={aplication}
        />
      )}
    </>
  );
};
export default TableApplicationAdmin;
