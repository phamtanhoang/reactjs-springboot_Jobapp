import { Link } from "react-router-dom";
import { BlogResponseModel } from "../../../../../models/BlogResponseModel";

const BlogItem: React.FC<{
  blog: BlogResponseModel;
}> = (props) => {
  return (
    <div className="mt-6">
      <div className="max-w-4xl py-3 px-5 md:px-10 md:py-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <span className="font-light text-gray-600">
            {props.blog?.createdAt &&
              new Date(props.blog?.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="mt-2">
          <h1 className="text-2xl text-gray-700 font-bold cursor-default">
            {props.blog.title}
          </h1>
          <div
            className="mt-2 text-gray-600 h-[4.5em] overflow-hidden cursor-default"
            dangerouslySetInnerHTML={{
              __html: props.blog.content || "",
            }}
          />
        </div>
        <div className="flex justify-between items-center mt-4">
          <Link
            to={`/home/blog/${props.blog.blogId}`}
            className="text-blue-500 hover:underline"
          >
            Xem thêm
          </Link>
          <div>
            <div className="flex items-center group">
              <img
                src={
                  props.blog?.userImage
                    ? props.blog?.userImage
                    : "https://res.cloudinary.com/dcpatkvcu/image/upload/v1695807392/DoAnNganh/non-user_lctzz5.jpg"
                }
                alt="avatar"
                className="mx-4 w-10 h-10 object-cover rounded-full block"
              />
              <h1 className="text-gray-700 font-bold truncate max-w-[350px] hidden sm:block">
                {props.blog.accountUserName}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogItem;
