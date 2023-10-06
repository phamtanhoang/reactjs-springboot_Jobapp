/* eslint-disable @typescript-eslint/no-explicit-any */
import { AiOutlineClose } from "react-icons/ai";
import { CategoryModel } from "../../../../../models/CategoryModel";
import { useEffect, useState } from "react";
import { categoriesAPI } from "../../../../../services";
import { ErrorBox, Spinner } from "../../../../../components";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";

const AddJobPage: React.FC<{
  setShowBoxAddJob: any;
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
  }, []);

  //   console.log(title, toDate, cate, salary, address, description);

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
    setTitle("");
    setToDate("");
    setCate(categories[0].id);
    setSalary("");
    setAddress("");
    setDescription("");
    props.setShowBoxAddJob(false);
  };

  const handleAddJob = (e: any) => {
    e.preventDefault();
    if (title && salary && address && description && toDate && cate) {
      Swal.fire({
        title: "Do you want to add?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          // candidatesAPI
          //   .updateCandidate(firstName, lastName, dateOfBirth, sex, token)
          //   .then(() => {
          //     Swal.fire("Thành công!", "Chỉnh sửa thành công!", "success");
          //     window.location.reload();
          //   })
          //   .catch(() => {
          //     Swal.fire("Thất bại!", "Chỉnh sửa thất bại!", "error");
          //   });
        }
      });
    } else {
      Swal.fire("Thất bại!", "Vui lòng nhập đầy đủ thông tin!", "error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50">
      <div className="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 md:inset-0 z-50 flex justify-center items-center h-modal sm:h-full bg-black/50">
        <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
          <div className="bg-white rounded-lg shadow relative">
            <div className="flex items-start justify-between p-2 sm:p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold">Add job</h3>
              <button
                type="button"
                className="text-xl text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center"
                onClick={closedBox}
              >
                <AiOutlineClose />
              </button>
            </div>

            <div className="p-2 sm:p-6 space-y-6">
              <form onSubmit={handleAddJob}>
                <div className="grid grid-cols-6 gap-4">
                  <div className="col-span-full">
                    <label className="font-semibold text-sm block text-gray-700">
                      Title:
                    </label>
                    <input
                      className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value.trim())}
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
                      value={toDate}
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
                      onChange={(e) => setSalary(e.target.value.trim())}
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
                      onChange={(e) => setAddress(e.target.value.trim())}
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
                    Add job
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddJobPage;
