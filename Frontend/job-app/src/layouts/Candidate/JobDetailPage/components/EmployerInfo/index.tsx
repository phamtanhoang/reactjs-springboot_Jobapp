import { useEffect, useRef, useState } from "react";
import { JobModel } from "../../../../../models/JobModel";
import { EmployerModel } from "../../../../../models/EmployerModel";
import { employersAPI } from "../../../../../services";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Link } from "react-router-dom";

export const EmployerInfo: React.FC<{ job?: JobModel }> = (props) => {
  const [employer, setEmployer] = useState<EmployerModel>();

  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const getEmployer = () => {
      employersAPI.getEmployerById(props.job?.employerId).then((res) => {
        setEmployer(res.data);
      });
    };
    getEmployer();

    if (logoRef.current) {
      const width = logoRef.current.offsetWidth;
      logoRef.current.style.height = width + "px";
    }
  }, [props.job?.employerId]);

  return (
    <div className="w-[35%] items-center bg-white rounded-lg p-4 hidden lg:block">
      <div className="flex">
        <div className="w-[25%] mx-2  ">
          <img
            src={
              employer?.image
                ? employer?.image
                : "https://res.cloudinary.com/dcpatkvcu/image/upload/v1695807392/DoAnNganh/non-user_lctzz5.jpg"
            }
            alt="avatar"
            className="object-cover rounded-lg ring-2 ring-gray-200"
            ref={logoRef}
          />
        </div>
        <div className="w-[75%] pl-3">
          <Link
            to={`/home/employer/${employer?.id}`}
            className="font-semibold text-base cursor-pointer"
          >
            {employer?.name}
          </Link>
          <p className="text-xs mt-1 truncate">{employer?.address}</p>
        </div>
      </div>
      <div className="flex mt-3 ml-4 text-sm font-medium">
        <div className="w-[25%] text-center text-base ">
          <p>Mô tả:</p>
        </div>
        <div className="w-[75%]">
          <p
            className="h-[4.5em] overflow-hidden cursor-default"
            data-tooltip-id="my-tooltip-1"
          >
            {employer?.description}
          </p>
          <ReactTooltip
            id="my-tooltip-1"
            place="bottom"
            content={employer?.description}
            style={{ maxWidth: "400px" }}
          />
        </div>
      </div>
    </div>
  );
};
