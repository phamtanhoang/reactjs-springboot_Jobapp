/* eslint-disable @typescript-eslint/no-explicit-any */
import { AiOutlineClose } from "react-icons/ai";
import ReactQuill from "react-quill";
import { CategoryModel } from "../../../../../models/CategoryModel";
import { useEffect, useState } from "react";
import { categoriesAPI, jobsAPI } from "../../../../../services";
import { ErrorBox, Spinner } from "../../../../../components";
import Swal from "sweetalert2";
import { JobModel } from "../../../../../models/JobModel";

const EditJobPage: React.FC<{
  setShowBoxEditJob: any;
  job?: JobModel;
}> = (props) => {
  const [categories, setCategories] = useState<CategoryModel[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [title, setTitle] = useState("");
  const [toDate, setToDate] = useState("");
  const [cate, setCate] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setTitle(props.job?.title || "");
    setToDate(props.job?.toDate || "");
    setCate(props.job?.categoryId || "");
    setSalary(props.job?.salary || "");
    setAddress(props.job?.address || "");
    setDescription(props.job?.description || "");
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
  }, [
    props.job?.address,
    props.job?.categoryId,
    props.job?.description,
    props.job?.salary,
    props.job?.title,
    props.job?.toDate,
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
      <div className="flex-grow w-5/6 sm:w-3/4 mx-auto my-10">
        <ErrorBox text={httpError} />
      </div>
    );
  }

  const handleDescriptionChange = (content: string) => {
    setDescription(content);
  };

  const closedBox = () => {
    setTitle(props.job?.title || "");
    setToDate(props.job?.toDate || "");
    setCate(props.job?.categoryId || "");
    setSalary(props.job?.salary || "");
    setAddress(props.job?.address || "");
    setDescription(props.job?.description || "");
    props.setShowBoxEditJob(false);
  };

  const handleEditJob = (e: any) => {
    e.preventDefault();
    if (
      title.trim() &&
      salary.trim() &&
      address.trim() &&
      description.trim() &&
      toDate.trim() &&
      cate.trim()
    ) {
      Swal.fire({
        title: "Do you want to edit?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          jobsAPI
            .updateJobByEmployerToken(
              props.job?.id || "",
              title.trim(),
              toDate.trim(),
              cate.trim(),
              salary.trim(),
              address.trim(),
              description.trim(),
              localStorage.getItem("employerToken") || ""
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
              Swal.fire("Error!", "Update job error!", "error");
            });
        }
      });
    } else {
      Swal.fire("Error!", "Please enter complete information!", "error");
    }
  };

  const originalDate = new Date(toDate);
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const newDate = new Date(originalDate.getTime() + oneDayInMilliseconds);
  const formattedDate = newDate.toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow relative w-[95%] sm:w-[85%] md:w-[70%] xl:w-1/2">
        <div className="flex items-start justify-between p-2 sm:p-5 pl-5 border-b rounded-t">
          <h3 className="text-xl font-semibold">Edit job</h3>
          <button
            type="button"
            className="text-xl text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center"
            onClick={closedBox}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="p-2 sm:p-6 space-y-6">
          <form onSubmit={handleEditJob}>
            <div className="grid grid-cols-6 gap-4">
              <div className="col-span-full">
                <label className="font-semibold text-sm block text-gray-700">
                  Title:
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Please fill in Job title..."
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
                  min={new Date().toISOString().split("T")[0]}
                  value={formattedDate}
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
                <label className="text-sm font-medium text-gray-900 block">
                  Salary:
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                  type="text"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="Please fill in Job salary..."
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="text-sm font-medium text-gray-900 block">
                  Address
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Please fill in Job address..."
                  required
                />
              </div>
              <div className="col-span-full">
                <label className="text-sm font-medium text-gray-900 block mb-1">
                  Description:
                </label>
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={handleDescriptionChange}
                  className="max-h-[20vh] overflow-y-auto"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="submit"
              >
                Edit job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditJobPage;
