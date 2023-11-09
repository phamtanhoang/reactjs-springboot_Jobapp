/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Swal from "sweetalert2";
import { categoriesAPI, employersAPI, jobsAPI } from "../../../../../services";
import { CategoryModel } from "../../../../../models/CategoryModel";
import { EmployerModel } from "../../../../../models/EmployerModel";
import { ErrorBox, Spinner } from "../../../../../components";
import ReactQuill from "react-quill";
import Select from "react-select";
import { JobModel } from "../../../../../models/JobModel";
import { formattedDate } from "../../../../../utils";

const UpdateJob: React.FC<{
  setShowBoxUpdate: any;
  job?: JobModel;
}> = (props) => {
  console.log(props.job);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [employers, setEmployers] = useState<EmployerModel[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [title, setTitle] = useState(props.job?.title || "");
  const [fromDate, setFromDate] = useState(props.job?.fromDate || "");
  const [toDate, setToDate] = useState(props.job?.toDate || "");
  const [cate, setCate] = useState(props.job?.categoryId || "");
  const [salary, setSalary] = useState(props.job?.salary || "");
  const [address, setAddress] = useState(props.job?.address || "");
  const [description, setDescription] = useState(props.job?.description || "");
  const [employerId, setEmployerId] = useState(props.job?.employerId || "");
  const [state, setState] = useState(props.job?.state || "");
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    const fetchCategories = () => {
      categoriesAPI
        .getCategories()
        .then((res) => {
          setCategories(res.data._embedded.categories);
        })
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchCategories();

    const fetchEmployers = () => {
      setIsLoading(true);
      employersAPI
        .getEmployers()
        .then((res) => {
          setEmployers(res.data._embedded.employers);
        })
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchEmployers();
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

  const handleDescriptionChange = (content: string) => {
    setDescription(content);
  };

  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
    setEmployerId(selectedOption.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      title.trim() &&
      salary.trim() &&
      address.trim() &&
      toDate.trim() &&
      cate.trim() &&
      employerId.trim()
    ) {
      Swal.fire({
        title: "Do you want to update?",
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
          jobsAPI
            .updateJobByAdminToken(
              props.job?.id || "",
              title.trim(),
              formattedDate(fromDate.trim()),
              formattedDate(toDate.trim()),
              cate.trim(),
              salary.trim(),
              address.trim(),
              description.trim(),
              employerId.trim(),
              state.trim(),
              localStorage.getItem("adminToken") || ""
            )
            .then(() => {
              Swal.fire({
                title: "Update job success",
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
              Swal.fire("Error!", "Update job fail!", "error");
            })
            .finally(() => {
              waitingPopup.close();
            });
        }
      });
    } else {
      Swal.fire("Error!", "Please enter complete information!", "error");
    }
  };

  const employerOptions: any = employers.map((employer) => ({
    value: employer.id,
    label: employer.name,
  }));

  const selectedEmployer = employers.find(
    (emp) => emp.id == props.job?.employerId
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50 text-black">
      <div className="bg-white rounded-lg shadow relative w-[95%] sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%]">
        <div className="flex items-start justify-between p-2 sm:p-5 pl-5 border-b rounded-t ">
          <h3 className="text-xl font-semibold">Update Job</h3>
          <button
            type="button"
            className="text-xl text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center"
            onClick={() => props.setShowBoxUpdate(false)}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="rounded-lg p-3 md:p-5 md:py-3 overflow-y-auto max-h-[calc(100vh-150px)]">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-6 gap-3">
              <div className="col-span-full">
                <label className="font-semibold text-sm block text-gray-700">
                  Title:
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Please fill in Job title..."
                  required
                  value={title}
                />
              </div>
              <div className="col-span-full">
                <label className="font-semibold text-sm block text-gray-700">
                  Employer:
                </label>
                <Select
                  value={selectedOption}
                  onChange={handleChange}
                  options={employerOptions}
                  isSearchable
                  placeholder={selectedEmployer?.name}
                  className="text-gray-900 block text-sm w-full mt-1"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="font-semibold text-sm block text-gray-700">
                  Category:
                </label>
                <select
                  className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                  required
                  value={cate}
                  onChange={(e) => setCate(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="font-semibold text-sm block text-gray-700">
                  State:
                </label>
                <select
                  className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value={"pending"}>Pending</option>
                  <option value={"active"}>Active</option>
                  <option value={"refused"}>Refused</option>
                </select>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="font-semibold text-sm block text-gray-700">
                  From Date:
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                  type="date"
                  onChange={(e) => {
                    setFromDate(e.target.value);
                  }}
                  value={formattedDate(fromDate)}
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="font-semibold text-sm block text-gray-700">
                  To Date:
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                  type="date"
                  onChange={(e) => {
                    setToDate(e.target.value);
                  }}
                  value={formattedDate(toDate)}
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label className="font-semibold text-sm block text-gray-700">
                  Salary:
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                  type="text"
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="Please fill in Job salary..."
                  value={salary}
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="font-semibold text-sm block text-gray-700">
                  Address
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Please fill in Job address..."
                  value={address}
                  required
                />
              </div>

              <div className="col-span-full">
                <label className="font-semibold text-sm block text-gray-700">
                  Description:
                </label>
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={handleDescriptionChange}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default UpdateJob;
