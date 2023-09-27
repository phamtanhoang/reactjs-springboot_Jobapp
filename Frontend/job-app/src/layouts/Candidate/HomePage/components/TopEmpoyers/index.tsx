/* eslint-disable @typescript-eslint/no-explicit-any */
import { EmployerItem } from "../EmployerItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { EmployerModel } from "../../../../../models/EmployerModel";
import { ErrorBox, Spinner } from "../../../../../components";
import { employersAPI } from "../../../../../services";

const TopEmployers = () => {
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

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [employers, setEmployers] = useState<EmployerModel[]>([]);

  useEffect(() => {
    const getEmployers = () => {
      employersAPI
        .getVipEmployers()
        .then((res) => {
          setEmployers(res.data._embedded.employers);
        })
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    getEmployers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex-grow">
        <Spinner />
      </div>
    );
  }

  if (httpError) {
    return (
      <div className="flex-grow w-5/6 sm:w-3/4 mx-auto my-10">
        <ErrorBox text={httpError} />
      </div>
    );
  }

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
        <Slider {...settings}>
          {employers.map((employer) => (
            <div className="px-2 pb-8" key={employer.id}>
              <EmployerItem employer={employer} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TopEmployers;
