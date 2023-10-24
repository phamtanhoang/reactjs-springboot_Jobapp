/* eslint-disable @typescript-eslint/no-explicit-any */
import { AiOutlineClose } from "react-icons/ai";
import { ErrorBox, Spinner } from "../../../../../components";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import { useState } from "react";
import { blogsAPI } from "../../../../../services";

const AddJob: React.FC<{
  setShowBoxAdd: any;
}> = (props) => {

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleDescriptionChange = (content: string) => {
    setDescription(content);
  };

  const handleAdd = (e: any) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      Swal.fire({
        title: "Do you want to add?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          blogsAPI
            .addBlog(
              title.trim(),
              description.trim(),
              imageFile || undefined,
              localStorage.getItem("employerToken") || ""
            )
            .then(() => {
              Swal.fire({
                title: "Add new blog success",
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
              Swal.fire("Error!", "Add new blog error!", "error");
            });
        }
      });
    } else {
      Swal.fire("Error!", "Please enter complete information!", "error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow relative w-[90%] sm:w-[78%] md:w-[65%] lg:w-[50%] xl:w-[40%]">
        <div className="flex items-start justify-between p-2 sm:p-5 pl-5 border-b rounded-t">
          <h3 className="text-xl font-semibold">Add blog</h3>
          <button
            type="button"
            className="text-xl text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center"
            onClick={() => props.setShowBoxAdd(false)}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="rounded-lg p-3 md:p-5 overflow-y-auto max-h-[calc(100vh-150px)]">
          <form onSubmit={handleAdd}>
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
                  Image:
                </label>
                <input
                  className="border rounded-lg p-2 mt-1 text-sm w-full"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files && event.target.files[0];
                    if (file) {
                      setImageFile(file);
                    }
                  }}
                ></input>
              </div>
              <div className="col-span-full">
                <label className="font-semibold text-sm block text-gray-700 ">
                  Content:
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
                Add blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddJob;
