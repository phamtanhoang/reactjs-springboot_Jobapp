/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ErrorBox, PaginationAdmin, Spinner } from "../../../../../components";
import {employersAPI, jobsAPI} from "../../../../../services";
import {
  AiFillDelete,
  AiFillEdit,
  AiFillEye,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineExclamation,
} from "react-icons/ai";
import Swal from "sweetalert2";
import { JobModel } from "../../../../../models/JobModel";
import { JobDetail, UpdateJob } from "..";
import {EmployerModel} from "../../../../../models/EmployerModel.ts";
import {EmployerResponseModel} from "../../../../../models/EmployerResponseModels.ts";
import UpdateEmployer from "../UpdateEmployer";
import EmployerDetails from "../EmployerDetails";

const TablePage: React.FC<{ name: string }> = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [employers, setEmployers] = useState<EmployerResponseModel[]>([]);
  const [employer, setEmployer] = useState<EmployerResponseModel>();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [totalAmountOfItems, setTotalAmountOfItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [showBoxUpdate, setShowBoxUpdate] = useState(false);
  const [showBoxDetail, setShowBoxDetail] = useState(false);

  const [previousName, setPreviousName] = useState("");

  useEffect(() => {
    const fetchJobs = () => {
      employersAPI
        .getEmployersByNameAndAdminToken(
          props.name,
          currentPage - 1,
          itemsPerPage,
          localStorage.getItem("adminToken") || ""
        )
        .then((res) => {
          setEmployers(res.data.content);
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

    if (
      props.name != previousName
    ) {
      setCurrentPage(1);
      setPreviousName(props.name);
    }

    fetchJobs();
  }, [
    currentPage,
    itemsPerPage,
    previousName,
    props.name,
  ]);

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

  const HandleUpdate = (employer: EmployerResponseModel) => {
    setShowBoxUpdate(true);
    setEmployer(employer);
  };

  const HandleDetail = (employer: EmployerResponseModel) => {
    setShowBoxDetail(true);
    setEmployer(employer);
  };

  const HandleDelete = (employer: EmployerResponseModel) => {
    Swal.fire({
      title: "Do you want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        employersAPI
          .deleteEmployerByAdminToken(
            employer.employerId,
            localStorage.getItem("adminToken") || ""
          )
          .then(() => {
            Swal.fire({
              title: "Delete employer success",
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
            Swal.fire("Error!", "Delete employer error!", "error");
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
                        Title
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-600 "
                      >
                        State
                      </th>

                      {/*<th*/}
                      {/*  scope="col"*/}
                      {/*  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-600 "*/}
                      {/*>*/}
                      {/*  From Date*/}
                      {/*</th>*/}

                      {/*<th*/}
                      {/*  scope="col"*/}
                      {/*  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-600 "*/}
                      {/*>*/}
                      {/*  To Date*/}
                      {/*</th>*/}
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
                        {employers.map((employer, i) => (
                          <tr key={i}>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 ">
                              <div className="inline-flex items-center gap-x-3">
                                <span>#{i}</span>
                              </div>
                            </td>

                            <td className="px-4 py-4 text-sm text-gray-600 ">
                              {employer.name}
                              {/*{new Date(job.toDate) < new Date() && (*/}
                              {/*  <span className="text-red-500 ml-2">*/}
                              {/*    (Expired)*/}
                              {/*  </span>*/}
                              {/*)}*/}
                            </td>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              {employer.state == "pending" ? (
                                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-yellow-500 bg-yellow-100/60 ">
                                  <AiOutlineExclamation />
                                  <h2 className="text-sm font-normal">
                                    Pending
                                  </h2>
                                </div>
                              ) : employer.state == "active" ? (
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
                                    Deny
                                  </h2>
                                </div>
                              )}
                            </td>
                            {/*<td className="px-4 py-4 text-sm text-gray-600 ">*/}
                            {/*  {job.fromDate &&*/}
                            {/*    new Date(job.fromDate).toLocaleDateString()}*/}
                            {/*</td>*/}
                            {/*<td className="px-4 py-4 text-sm text-gray-600 ">*/}
                            {/*  {job.toDate &&*/}
                            {/*    new Date(job.toDate).toLocaleDateString()}*/}
                            {/*</td>*/}
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center gap-x-6 text-2xl text-gray-600">
                                <AiFillEye
                                  className=" cursor-pointer hover:text-yellow-500"
                                  onClick={() => HandleDetail(employer)}
                                />

                                <AiFillEdit
                                  className=" cursor-pointer hover:text-blue-500"
                                  onClick={() => HandleUpdate(employer)}
                                />
                                <AiFillDelete
                                  className=" cursor-pointer hover:text-red-500"
                                  onClick={() => HandleDelete(employer)}
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
            type={true}
          />
        )}
      </div>
      {showBoxUpdate && localStorage.getItem("adminToken") && (
        <UpdateEmployer setShowBoxUpdate={setShowBoxUpdate} employer={employer} />
      )}
      {showBoxDetail && localStorage.getItem("adminToken") && (
        <EmployerDetails setShowBoxDetail={setShowBoxDetail} employer={employer} />
      )}
    </>
  );
};
export default TablePage;
