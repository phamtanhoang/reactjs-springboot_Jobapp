import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { BlogResponseModel } from "../../../../../models/BlogResponseModel";
import Swal from "sweetalert2";
import { blogsAPI } from "../../../../../services";
import { useNavigate } from "react-router-dom";
import { EditPage } from "../../../BlogsPageAdmin/components";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const BlogDetail: React.FC<{ blog?: BlogResponseModel }> = (props) => {
  const navigate = useNavigate();

  const [dropDown, setDropDown] = useState(false);
  const [showBoxEdit, setShowBoxEdit] = useState(false);

  const DeleteHandle = (x?: BlogResponseModel) => {
    if (x)
      Swal.fire({
        title: "Do you want to delete?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          blogsAPI
            .deleteBlogByAdminToken(
              x.blogId,
              localStorage.getItem("adminToken") || ""
            )
            .then(() => {
              Swal.fire({
                title: "Delete success",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Yes",
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/admin/blogs");
                }
              });
            })
            .catch(() => {
              Swal.fire("Error!", "Delete fail!", "error");
            });
        }
      });
  };

  return (
    <>
      <header className="mb-4 lg:mb-6 flex justify-between">
        <h1 className="text-3xl font-bold leading-tight text-gray-800 lg:text-4xl ">
          {props.blog?.title}{" "}
          {props.blog?.state == "active" ? (
            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 text-xl">
              <AiOutlineCheck />
              <h2 className="text-base font-semibold">Active</h2>
            </div>
          ) : (
            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-red-500 bg-red-100/60 text-xl">
              <AiOutlineClose />
              <h2 className="text-base font-semibold">InActive</h2>
            </div>
          )}
        </h1>
        <div className="p-2 text-sm font-medium text-center ">
          <div className="relative">
            <BsThreeDots
              className="text-xl cursor-pointer"
              onClick={() => {
                setDropDown(!dropDown);
              }}
            />
            <div
              className={`absolute right-0 z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow ${
                !dropDown ? "hidden" : ""
              }`}
            >
              <ul className="py-1 text-sm text-gray-700 ">
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100"
                    onClick={() => setShowBoxEdit(true)}
                  >
                    Edit
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100"
                    onClick={() => DeleteHandle(props.blog)}
                  >
                    Remove
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <div
        dangerouslySetInnerHTML={{
          __html: props.blog?.content || "",
        }}
      />
      <figure>
        <img src={props.blog?.blogImage} alt="image" className="w-full my-5" />
      </figure>
      {showBoxEdit && localStorage.getItem("adminToken") && (
        <EditPage setShowBoxEdit={setShowBoxEdit} blog={props.blog} />
      )}
    </>
  );
};
export default BlogDetail;
