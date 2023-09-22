import { ReturnEmployer } from "./ReturnEmployer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import EmployerModel from "../../../models/EmployerModel";

export const TopEmployers: React.FC<{ employers: EmployerModel[] }> = (
  props
) => {
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
    <div className="px-4 py-12 relative">
      <div>
        <h4 className="text-base md:text-lg text-center mb-10 font-medium">
          Tham gia cùng những{" "}
          <span className="text-orangetext">Nhà tuyển dụng</span> nổi bật của
          chúng tôi
        </h4>
      </div>

      <div className="w-10/12 mx-auto">
        <Slider ref={sliderRef} {...settings} >
          {props.employers.map((employer) => (
            <div className="px-2 pb-8" key={employer.id}>
              <ReturnEmployer employer={employer} />
            </div>
          ))}
        </Slider>
      </div>
      
    </div>
  );
};
