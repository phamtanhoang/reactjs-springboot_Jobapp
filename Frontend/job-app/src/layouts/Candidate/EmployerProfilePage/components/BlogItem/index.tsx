/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { BlogResponseModel } from "../../../../../models/BlogResponseModel";

const BlogItem: React.FC<{
  blog: BlogResponseModel;
}> = (props) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="font-light text-xs md:text-sm text-neutral-500">
          {props.blog?.createdAt &&
            new Date(props.blog?.createdAt).toLocaleDateString()}
        </span>
      </div>
      <Link
        to={`/home/blog/${props.blog.blogId}`}
        className="font-semibold text-lg hover:text-orangetext "
      >
        {props.blog.title}
      </Link>
    </div>
  );
};

export default BlogItem;
