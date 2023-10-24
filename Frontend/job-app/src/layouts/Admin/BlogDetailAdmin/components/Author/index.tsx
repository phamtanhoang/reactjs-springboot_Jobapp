import { BlogResponseModel } from "../../../../../models/BlogResponseModel";

const Author: React.FC<{ blog?: BlogResponseModel }> = (props) => {
  return (
    <address className="flex items-center mb-6 not-italic">
      <div className="inline-flex items-center mr-3 text-sm text-gray-800 ">
        <img
          className="mr-4 w-16 h-16 rounded-full"
          src={props.blog?.userImage}
          alt="Avatar"
        />
        <div>
          <a
            href="#"
            rel="author"
            className="text-xl font-bold text-gray-800"
          >
            {props.blog?.name}
          </a>
          <p className="text-base text-gray-500 ">
            {props.blog?.accountUserName}
          </p>
          <p className="text-base text-gray-500 ">
            {props.blog?.createdAt &&
              new Date(props.blog?.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </address>
  );
};
export default Author;
