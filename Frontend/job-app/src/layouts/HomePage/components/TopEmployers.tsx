import { ReturnEmployer } from "./ReturnEmployer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import EmployerModel from "../../../models/CategoryModel";

export const TopEmployers: React.FC = () => {
  const employerList: EmployerModel[] = [
    // new EmployerModel(
    //   1,
    //   "Company 1",
    //   "Description 1",
    //   "https://res.cloudinary.com/dcpatkvcu/image/upload/v1692603983/DoAnNganh/google_yjj8ci.png"
    // ),
    // new EmployerModel(
    //   2,
    //   "Company 2",
    //   "Description 2",
    //   "https://res.cloudinary.com/dcpatkvcu/image/upload/v1692603983/DoAnNganh/microsoft_rvx2uf.png"
    // ),
    // new EmployerModel(
    //   3,
    //   "Company 3",
    //   "Description 3",
    //   "https://res.cloudinary.com/dcpatkvcu/image/upload/v1692603984/DoAnNganh/slack_jfd1tf.png"
    // ),
    // new EmployerModel(
    //   4,
    //   "Company 1",
    //   "Description 1",
    //   "https://res.cloudinary.com/dcpatkvcu/image/upload/v1692603984/DoAnNganh/airbnb_xtejjd.png"
    // ),
    // new EmployerModel(
    //   5,
    //   "Company 2",
    //   "Description 2",
    //   "https://res.cloudinary.com/dcpatkvcu/image/upload/v1692603983/DoAnNganh/logo_afswhb.png"
    // ),
  ];
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  // Thêm sự kiện để điều khiển trước và sau
  const sliderRef = useRef<Slider | null>(null);

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const goToPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <section className="bg-white px-4 py-12 relative">
      <div>
        <h4 className="text-base text-center mb-10 font-medium">
          Tham gia cùng những <span className="text-orangetext">Công Ty</span>{" "}
          nổi tiếng nhất trên toàn thế giới
        </h4>
      </div>

      <div className="w-10/12 mx-auto">
        <Slider ref={sliderRef} {...settings}>
          {employerList.map((employer) => (
            <div className="px-2 pb-8" key={employer.id}>
              <ReturnEmployer employer={employer} />
            </div>
          ))}
        </Slider>
      </div>
      <button
        className="text-xl p-1 rounded-full ring-2 text-orangetext ring-orangetext hover:bg-orangetext hover:text-white absolute top-1/2 left-4 sm:left-8 lg:left-14 xl:left-20 "
        onClick={goToPrev}
      >
        <AiFillCaretLeft />
      </button>
      <button
        className="text-xl p-1 rounded-full ring-2 text-orangetext ring-orangetext hover:bg-orangetext hover:text-white absolute top-1/2 right-4 sm:right-8 lg:right-14 xl:right-20 "
        onClick={goToNext}
      >
        <AiFillCaretRight />
      </button>
    </section>
  );
};
