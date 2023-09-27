import { useEffect, useState } from "react";
import { JobModel } from "../../../../../models/JobModel";
import { EmployerModel } from "../../../../../models/EmployerModel";
import { employersAPI } from "../../../../../services";
import { Tooltip as ReactTooltip } from "react-tooltip";

export const EmployerInfo: React.FC<{ job?: JobModel }> = (props) => {
  const [employer, setEmployer] = useState<EmployerModel>();

  useEffect(() => {
    const getEmployer = () => {
      employersAPI.getEmployerById(props.job?.employerId).then((res) => {
        setEmployer(res.data);
      });
    };
    getEmployer();
  }, [props.job?.employerId]);

  return (
    <div className="w-[35%] items-center bg-white rounded-lg p-4 hidden lg:block">
      <div className="flex">
        <div className="w-[25%] mx-2 ring-2 ring-gray-200 rounded-lg">
          <img
            src={employer?.image}
            alt="avatar"
            className="object-cover p-2"
          />
        </div>
        <div className="w-[75%] pl-3">
          <p className="font-semibold text-base cursor-pointer">
            {employer?.name}
          </p>
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
