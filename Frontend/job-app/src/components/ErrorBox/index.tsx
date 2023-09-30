interface ErrorProps {
  text: string;
}
const ErrorBox = (props: ErrorProps) => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full z-[100]"
      role="alert"
    >
      <span className="inline">{props.text}</span>
    </div>
  );
};
export default ErrorBox;
