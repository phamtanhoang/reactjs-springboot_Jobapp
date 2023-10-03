import { Link } from "react-router-dom";
import { EmployerModel } from "../../../../../models/EmployerModel";
import { useEffect, useRef } from "react";

const EmployerItem: React.FC<{
  employer?: EmployerModel;
}> = (props) => {
  const bannerRef = useRef<HTMLImageElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (bannerRef.current) {
      const width = bannerRef.current.offsetWidth;
      bannerRef.current.style.height = width / 2 + "px";
    }
    if (logoRef.current) {
      const width = logoRef.current.offsetWidth;
      logoRef.current.style.height = width + "px";
    }
  }, []);

  return (
    <div className="group bg-white border-gray-200 border-2 rounded-lg hover:border-orangetext hover:bg-[#f4f5f5] group hover:shadow-orange-100 hover:shadow-lg">
      <div className="rounded-tl-lg rounded-tr-lg">
        <img
          className="rounded-tl-xl rounded-tr-xl w-full"
          src={
            props.employer?.banner
              ? props.employer?.banner
              : "https://res.cloudinary.com/dcpatkvcu/image/upload/v1695882546/light-gray-color-solid-background-1920x1080_kvwkxg.png"
          }
          alt="banner"
          ref={bannerRef}
        />
      </div>
      <div className="-mt-[12%] flex justify-center">
        <img
          className="w-[23%] rounded-lg bg-white  shadow-xl ring-2 ring-gray-300"
          src={
            props.employer?.image
              ? props.employer?.image
              : "https://res.cloudinary.com/dcpatkvcu/image/upload/v1695807392/DoAnNganh/non-user_lctzz5.jpg"
          }
          alt="logo"
          ref={logoRef}
        />
      </div>
      <div className="text-base md:text-lg p-5 text-center">
        <Link
          to={`/home/employer/${props.employer?.id}`}
          className="group-hover:text-orangetext"
        >
          <span className="font-semibold">{props.employer?.name}</span>
        </Link>
        <p className="mt-2 text-xs md:text-sm">{props.employer?.address}</p>
      </div>
    </div>
  );
};
export default EmployerItem;
