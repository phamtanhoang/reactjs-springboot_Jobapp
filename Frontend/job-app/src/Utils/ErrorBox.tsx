interface ErrorProps {
  text: string;
}

export const ErrorBox = (props: ErrorProps) => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-5/6 sm:w-3/4 mx-auto my-5"
      role="alert"
    >
      <strong className="font-bold">Error! </strong>
      <span className="inline">{props.text}</span>
    </div>
  );
};