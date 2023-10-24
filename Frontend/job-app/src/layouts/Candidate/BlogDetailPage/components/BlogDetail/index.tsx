import { BlogResponseModel } from "../../../../../models/BlogResponseModel";

const BlogDetail: React.FC<{ blog?: BlogResponseModel }> = (props) => {
  return (
    <>
      <header className="mb-4 lg:mb-6 flex justify-between">
        <h1 className="text-3xl font-extrabold leading-tight text-gray-800 lg:text-4xl ">
          {props.blog?.title}
        </h1>
      </header>
      <div
        dangerouslySetInnerHTML={{
          __html: props.blog?.content || "",
        }}
      />
      <figure>
        <img src={props.blog?.blogImage} alt="image" className="w-full my-5" />
      </figure>
    </>
  );
};
export default BlogDetail;
