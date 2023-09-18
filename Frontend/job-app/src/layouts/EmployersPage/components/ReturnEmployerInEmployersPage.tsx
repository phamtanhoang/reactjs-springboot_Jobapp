import { Link } from "react-router-dom";
import EmployerModel from "../../../models/EmployerModel";

export const ReturnEmployerInEmployersPage: React.FC<{
  employer?: EmployerModel;
}> = (props) => {

  return (
    <div className="group bg-white border-gray-200 border-2 rounded-lg hover:border-orangetext hover:bg-[#f4f5f5] group hover:shadow-orange-100 hover:shadow-lg">
      <div className="overflow-hidden rounded-tl-lg rounded-tr-lg bg-orangebackground">
        <img
          className="rounded-tl-xl rounded-tr-xl"
          src={props.employer?.banner}
          alt="banner"
        />
      </div>
      <div className="-mt-[12%] flex justify-center">
        <img
          className="w-[23%] rounded-lg bg-white p-1 shadow-xl"
          src={props.employer?.image}
          alt="logo"
        />
      </div>
      <div className="text-base md:text-lg p-5 text-center">
        <Link to={`/home/employer/${props.employer?.id}`} className="group-hover:text-orangetext">
          <span className="font-semibold">{props.employer?.name}</span>
        </Link>
        <p className="mt-2 text-xs md:text-sm">{props.employer?.address}</p>
      </div>
    </div>
  );
};
