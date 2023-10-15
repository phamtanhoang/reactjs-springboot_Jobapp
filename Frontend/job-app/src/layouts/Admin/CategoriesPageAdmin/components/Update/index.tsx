/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Swal from "sweetalert2";
import { categoriesAPI } from "../../../../../services";
import { CategoryModel } from "../../../../../models/CategoryModel";

const UpdateCategoryPage: React.FC<{
  setShowBoxUpdateCategory: any;
  cate?: CategoryModel;
}> = (props) => {
  const [name, setName] = useState(props.cate?.name || "");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (name.trim()) {
      Swal.fire({
        title: "Do you want update category?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          categoriesAPI
            .updateCategoryByAdminToken(
              props.cate?.id || "",
              name.trim(),
              localStorage.getItem("adminToken") || ""
            )
            .then(() => {
              Swal.fire({
                title: "Update category success!",
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
              Swal.fire("Error!", "Update category fail!", "error");
            });
        }
      });
    } else {
      Swal.fire("Error", "Please enter complete information!", "error");
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50 text-black">
      <div className="bg-white rounded-lg shadow relative w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%]">
        <div className="flex items-start justify-between p-2 sm:p-5 pl-5 border-b rounded-t ">
          <h3 className="text-xl font-semibold">Update Category</h3>
          <button
            type="button"
            className="text-xl text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center"
            onClick={() => props.setShowBoxUpdateCategory(false)}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="rounded-lg p-3 md:p-5 overflow-y-auto max-h-[calc(100vh-150px)]">
          <form onSubmit={handleSubmit}>
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Category name:
            </label>
            <input
              type="text"
              value={name}
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Category name..."
            />

            <button
              type="submit"
              className="transition duration-200 bg-purple-500 hover:bg-purple-600 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block mb-3"
            >
              <span className="inline-block mr-2">Update</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default UpdateCategoryPage;
