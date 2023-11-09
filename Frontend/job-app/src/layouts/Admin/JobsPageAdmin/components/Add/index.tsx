/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Swal from "sweetalert2";
import { categoriesAPI, employersAPI, jobsAPI } from "../../../../../services";
import ReactQuill from "react-quill";
import { ErrorBox, Spinner } from "../../../../../components";
import { CategoryModel } from "../../../../../models/CategoryModel";
import { EmployerModel } from "../../../../../models/EmployerModel";
import Select from "react-select";

const AddJob: React.FC<{ setShowBoxAdd: any }> = (props) => {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [employers, setEmployers] = useState<EmployerModel[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [title, setTitle] = useState("");
  const [toDate, setToDate] = useState("");
  const [cate, setCate] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [employerId, setEmployerId] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    const fetchCategories = () => {
      categoriesAPI
        .getCategories()
        .then((res) => {
          setCategories(res.data._embedded.categories);
          if (res.data._embedded.categories.length > 0) {
            setCate(res.data._embedded.categories[0].id);
          } else {
            setCate("");
          }
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
          if (res.data._embedded.employers.length > 0) {
            setEmployerId(res.data._embedded.employers[0].id);
            setSelectedOption(res.data._embedded.employers[0].name);
          } else {
            setEmployerId("");
          }
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
        title: "Do you want to add?",
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
            .addJobByAdminToken(
              title.trim(),
              toDate.trim(),
              cate.trim(),
              salary.trim(),
              address.trim(),
              description.trim(),
              employerId.trim(),
              localStorage.getItem("adminToken") || ""
            )
            .then(() => {
              Swal.fire({
                title: "Add new job success",
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
              Swal.fire("Error!", "Add new job error!", "error");
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
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50 text-black">
      <div className="bg-white rounded-lg shadow relative w-[95%] sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%]">
        <div className="flex items-start justify-between p-2 sm:p-5 pl-5 border-b rounded-t ">
          <h3 className="text-xl font-semibold">Add Job</h3>
          <button
            type="button"
            className="text-xl text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center"
            onClick={() => props.setShowBoxAdd(false)}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="rounded-lg p-3 md:p-5 overflow-y-auto max-h-[calc(100vh-150px)]">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-6 gap-4">
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
                  placeholder={selectedOption}
                  className="text-gray-900 block text-sm w-full mt-1"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="font-semibold text-sm block text-gray-700">
                  To Date:
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => {
                    setToDate(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="font-semibold text-sm block text-gray-700">
                  Category:
                </label>
                <select
                  className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                  required
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
                  Salary:
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                  type="text"
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="Please fill in Job salary..."
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
                  required
                />
              </div>

              <div className="col-span-full">
                <label className="font-semibold text-sm block text-gray-700">
                  Description:
                </label>
                <ReactQuill
                  theme="snow"
                  onChange={handleDescriptionChange}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="submit"
              >
                Add job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddJob;
