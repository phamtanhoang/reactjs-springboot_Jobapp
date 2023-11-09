/* eslint-disable @typescript-eslint/no-explicit-any */
import { BsFillReplyFill } from "react-icons/bs";
import { CommentResponseModel } from "../../../../../models/CommentResponseModel";
import { useEffect, useState } from "react";
import { blogsAPI } from "../../../../../services";
import Swal from "sweetalert2";
import { AiFillCloseCircle } from "react-icons/ai";

const Comment: React.FC<{ comment?: CommentResponseModel }> = (props) => {
  // const [dropDown, setDropDown] = useState(false);
  const [showReply, setShowReply] = useState(false);

  const [comment, setComment] = useState("");
  const [yourComment, setYourComment] = useState(false);

  useEffect(() => {
    const checkYourComment = () => {
      blogsAPI
        .checkComment(
          props.comment?.id || "",
          localStorage.getItem("candidateToken") || ""
        )
        .then((res) => setYourComment(res.data))
        .catch((error: any) => console.log(error.message));
    };
    checkYourComment();
  }, [props.comment?.id]);

  const SendComment = (e: any) => {
    e.preventDefault();
    if (comment.trim()) {
      blogsAPI
        .addReply(
          comment,
          props.comment?.id || "",
          localStorage.getItem("candidateToken") || ""
        )
        .then(() => {
          Swal.fire({
            title: "Add comment success",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });

        })
        .catch(() => {
          Swal.fire("Error!", "Somee thing went wrong!", "error");
        });
    } else {
      Swal.fire("Error!", "Please enter Your comment!", "error");
    }
  };

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
            .deleteSelfComment(
              x.id,
              localStorage.getItem("candidateToken") || ""
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
    <>
      <article className="p-6 mb-6 text-base bg-white rounded-lg ">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-800 ">
              <img
                className="mr-2 w-6 h-6 rounded-full"
                src={props.comment?.avatar}
                alt="Michael Gough"
              />
              {props.comment?.name}
            </p>
            <p className="text-sm text-gray-600">
              {props.comment?.commentedAt &&
                new Date(props.comment?.commentedAt).toLocaleDateString()}
            </p>
          </div>
          {yourComment && (
            <div className="relative">
              <AiFillCloseCircle
                className="text-xl cursor-pointer text-gray-600 hover:text-red-600"
                onClick={() => DeleteHandle(props.comment)}
              />
            </div>
          )}
        </footer>
        <p>{props.comment?.comment}</p>
        <div className="flex items-center mt-4 space-x-4">
          <button
            type="button"
            className="flex items-center font-medium text-sm text-gray-500 hover:underline"
            onClick={() => setShowReply(!showReply)}
          >
            <BsFillReplyFill className="text-xl" />
            Reply
          </button>
        </div>
      </article>
      <article
        className={`mb-6 ml-6 lg:ml-12 text-base bg-white rounded-lg ${
          !showReply && "hidden"
        }`}
      >
        <form className="relative flex h-10 w-full" onSubmit={SendComment}>
          <button
            className="!absolute right-1 top-1 z-10 select-none rounded-lg bg-blue-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-600/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
            type="submit"
            data-ripple-light="true"
          >
            sent
          </button>
          <input
            type="text"
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
            required
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Your Reply
          </label>
        </form>
      </article>
    </>
  );
};
export default Comment;
