import { Link } from "react-router-dom";
import { BlogResponseModel } from "../../../../../models/BlogResponseModel";

const TopBoxItem: React.FC<{
  blog: BlogResponseModel;
}> = (props) => {
  return (
    <>
      <div className="my-2">
        <div>
          <Link
            to={`/home/blog/${props.blog.blogId}`}
            className="text-base text-gray-700 font-medium hover:text-orangetext"
          >
            {props.blog.title}
          </Link>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center">
            <img
              src={
                props.blog?.userImage
                  ? props.blog?.userImage
                  : "https://res.cloudinary.com/dcpatkvcu/image/upload/v1695807392/DoAnNganh/non-user_lctzz5.jpg"
              }
              alt="avatar"
              className="w-9 h-9 object-cover rounded-full"
            />
            <p className="text-gray-700 text-sm mx-3 truncate max-w-[150px]">
              {props.blog.name}
            </p>
          </div>
          <span className="font-light text-sm text-gray-600">
            {props.blog?.createdAt &&
              new Date(props.blog?.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <hr></hr>
    </>
  );
};
export default TopBoxItem;
