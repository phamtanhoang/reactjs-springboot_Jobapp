import { CommentResponseModel } from "../../../../../models/CommentResponseModel";
import Swal from "sweetalert2";
import { blogsAPI } from "../../../../../services";
import { AiFillCloseCircle } from "react-icons/ai";

const ReplyComment: React.FC<{ comment?: CommentResponseModel }> = (props) => {
  const DeleteHandle = (x?: CommentResponseModel) => {
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
            .deleteBlogCommentByAdminToken(
              x.id,
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
                  window.location.reload();
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
    <article className="p-6 mb-6 ml-6 lg:ml-12 text-base bg-white rounded-lg">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-800">
            <img
              className="mr-2 w-6 h-6 rounded-full"
              src={props.comment?.avatar}
              alt="Jese Leos"
            />
            {props.comment?.name}
          </p>
          <p className="text-sm text-gray-600">
            {props.comment?.commentedAt &&
              new Date(props.comment?.commentedAt).toLocaleDateString()}
          </p>
        </div>
        <div className="relative">
          <AiFillCloseCircle
            className="text-xl cursor-pointer text-gray-600 hover:text-red-600"
            onClick={() => DeleteHandle(props.comment)}
          />
        </div>
      </footer>
      <p>{props.comment?.comment}</p>
      {/* <div className="flex items-center mt-4 space-x-4">
        <button
          type="button"
          className="flex items-center font-medium text-sm text-gray-500 hover:underline"
        >
          <BsFillReplyFill className="text-xl" />
          Reply
        </button>
      </div> */}
    </article>
  );
};
export default ReplyComment;
