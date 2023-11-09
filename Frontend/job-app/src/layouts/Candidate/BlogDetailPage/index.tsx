/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { BlogResponseModel } from "../../../models/BlogResponseModel";
import { CommentResponseModel } from "../../../models/CommentResponseModel";
import { blogsAPI } from "../../../services";
import { ErrorBox, Spinner } from "../../../components";
import Swal from "sweetalert2";
import { Author, BlogDetail, ReplyComment, Comment } from "./components";
import { Link, useParams } from "react-router-dom";

const BlogDetailPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const { id } = useParams();
  const [blog, setBlog] = useState<BlogResponseModel>();
  const [comments, setComments] = useState<CommentResponseModel[]>([]);

  const [comment, setComment] = useState("");

  useEffect(() => {
    if (id) {
      const fetchBlog = () =>
        blogsAPI
          .getBlogById(id)
          .then((res) => {
            setBlog(res.data);
          })
          .catch((error: any) => {
            setHttpError(error.message);
          })
          .finally(() => setIsLoading(false));
      fetchBlog();

      const fetchComment = () => {
        setIsLoading(true);
        blogsAPI
          .getAllComments(id)
          .then((res) => {
            setComments(res.data.content);
          })
          .catch((error: any) => setHttpError(error.message))
          .finally(() => setIsLoading(false));
      };
      fetchComment();
    }
  }, [id]);

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

  const SendComment = (e: any) => {
    e.preventDefault();
    if (comment.trim()) {
      blogsAPI
        .addComment(
          comment,
          id || "",
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
          Swal.fire("Error!", "Some thing went wrong!", "error");
        });
    } else {
      Swal.fire("Error!", "Please enter Your comment!", "error");
    }
  };

  return (
    <>
      <main className="py-8   antialiased">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <div className="mx-auto w-full max-w-2xl ">
            <div className="my-3">
              <Author blog={blog} />
            </div>
            <BlogDetail blog={blog} />
            {localStorage.getItem("candidateToken") ? (
              <>
                <section className="mt-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-800 ">
                      Comments ({comments.length}):
                    </h2>
                  </div>
                  <form className="mb-6" onSubmit={SendComment}>
                    <div className="mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 ">
                      <label className="sr-only">Your comment:</label>
                      <textarea
                        className="block px-4 py-3  w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 h-24"
                        placeholder="Write a comment..."
                        required
                        onChange={(e) => {
                          setComment(e.target.value);
                        }}
                      ></textarea>
                    </div>
                    <button className="inline-flex items-center py-2.5 px-4 text-base font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-orangebackground hover:bg-primary-800">
                      Post comment
                    </button>
                  </form>
                </section>
                {comments.map(
                  (comment, i) =>
                    !comment.commentId && (
                      <div key={i}>
                        <Comment comment={comment} />
                        {comments.map(
                          (cmt, j) =>
                            cmt.commentId == comment.id && (
                              <ReplyComment comment={cmt} key={j} />
                            )
                        )}
                      </div>
                    )
                )}
              </>
            ) : (
              <p className="font-medium mt-2">
                Vui lòng{" "}
                <Link
                  to="/home/login"
                  className="text-blue-500 hover:underline"
                >
                  Đăng nhập
                </Link>{" "}
                để tham gia thảo luận!!!
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};
export default BlogDetailPage;
