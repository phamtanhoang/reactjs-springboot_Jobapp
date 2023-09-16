import { AiOutlineDollarCircle } from "react-icons/ai";
import { BsCalendarCheck, BsCalendarX } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";

export const JobProfilePage = () => {
  return (
    <section className="text-gray-700">
      <div className="px-6 py-10">
        <div className="w-full">
          <h1 className="text-xl font-bold md:text-2xl mb-5 text-center">
            Thông tin tuyển dụng
          </h1>
        </div>
        <div className="w-full sm:w-[90%] lg:w-[95%] xl:w-[80%] mx-auto flex my-4 gap-5">
          <div className="w-full lg:w-[70%] bg-white rounded-lg p-5 flex">
            <div className="w-1/4 sm:w-1/5 flex items-center lg:hidden">
              <img
                src="https://res.cloudinary.com/dcpatkvcu/image/upload/v1694701182/Google_oecx0q.png"
                alt="avatar"
                className="w-[90%] object-cover p-1 md:p-4"
              />
            </div>
            <div className="w-3/4 sm:w-4/5 lg:w-full">
              <div>
                <p className=" text-gray-700 font-bold hover:text-orangetext text-base md:text-xl truncate cursor-pointer">
                  Nhân Viên Kinh Doanh
                </p>
              </div>
              <div className="md:mt-2">
                <p className="text-gray-600 text-sm md:text-base truncate cursor-pointer">
                  Công ty công nghệ đa quốc gia Google
                </p>
              </div>
              <div className="md:mt-1">
                <span className="font-light text-xs md:text-sm text-neutral-500">
                  Hết hạn trong 10 ngày
                </span>
              </div>
              <div className="flex w-full mt-3 gap-1 sm:gap-3">
                <button className="bg-orangetext hover:bg-[#fe825c] text-white font-semibold py-2 px-2 sm:px-4 rounded w-[65%] sm:w-[70%] text-sm md:text-base">
                  Ứng tuyển ngay
                </button>
                <button className="bg-transparent text-orangetext hover:text-[#fe825c] font-semibold py-2 px-2 sm:px-4 border border-orangetext hover:border-[#fe825c] rounded w-[35%] sm:w-[30%] text-sm md:text-base">
                  Lưu tin
                </button>
              </div>
            </div>
          </div>
          <div className="w-[35%] items-center bg-white rounded-lg p-4 hidden lg:block">
            <div className="flex">
              <div className="w-[25%] mx-2 ring-2 ring-gray-200 rounded-lg">
                <img
                  src="https://res.cloudinary.com/dcpatkvcu/image/upload/v1694701182/Google_oecx0q.png"
                  alt="avatar"
                  className="object-cover p-2"
                />
              </div>
              <div className="w-[75%] pl-3">
                <p className="font-semibold text-base cursor-pointer">
                  Công ty công nghệ đa quốc gia Google
                </p>
                <p className="text-xs mt-1 truncate">
                  268 Lý Thường Kiệt, Phường 14, Quận 10, Thành phố Hồ Chí Minh,
                  Việt Nam
                </p>
              </div>
            </div>
            <div className="flex mt-3 ml-4 text-sm font-medium">
              <div className="w-[25%] text-center text-base ">
                <p>Mô tả:</p>
              </div>
              <div className="w-[75%]">
                <p className="h-[4em] overflow-hidden ">
                  Google LLC là một công ty công nghệ đa quốc gia của Mỹ, chuyên
                  về các dịch vụ và sản phẩm liên quan đến Internet, bao gồm các
                  công nghệ quảng cáo trực tuyến, công cụ tìm kiếm, điện toán
                  đám mây, phần mềm và phần cứng.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-[90%] lg:w-[95%] xl:w-[80%] mx-auto my-4 bg-white rounded-lg p-5 flex gap-5">
          <div className="w-[65%]">
            <div>
              <h2 className="font-semibold">Các phúc lợi dành cho bạn</h2>
              <div>
                <ul>
                  <li>Làm việc với một nhóm đa văn hóa có cùng niềm đam mê</li>
                  <li>Ghi nhận và khen thưởng dựa trên hiệu quả công việc</li>
                  <li>Mức lương cạnh tranh và phúc lợi hấp dẫn</li>
                </ul>
              </div>
            </div>
            <div>
              <h2 className="font-semibold">Mô tả công việc</h2>
              <div>
                <p>
                  The Global Web Marketing team has an exciting opportunity for
                  a Front-End Developer to join our team of developers; working
                  on creating best-in-class web-based products supporting the
                  company’s marketing efforts (consumer and corporate sites,
                  customer care, forum, game sites, campaign sites and
                  newsletters).
                </p>
              </div>
            </div>
            <div>
              <h2 className="font-semibold">Yêu cầu công việc</h2>
              <div>
                <ul>
                  <li>Good analytical and problem solving skills.</li>
                  <li>Knowledge of basic project management methodology</li>
                  <li>Knowledge in Scrum and Kanban.</li>
                </ul>
              </div>
            </div>
            <div>
              <h2 className="font-semibold">Số lượng tuyển dụng</h2>
              <div>
                <p>2 Nhân viên</p>
              </div>
            </div>
          </div>
          <div className="w-[35%]">
            <div className="w-full border border-orangetext bg-orangebackground rounded-lg">
              <ul className="px-5 py-2">
                <li className="flex border-[#949697] border-b-2 py-4">
                  <div className="w-[20%]">
                    <BsCalendarCheck className="text-[35px] mx-auto items-center" />
                  </div>
                  <div className="w-[80%] text-xs">
                    <h5 className="text-[#949697] font-light">
                      NGÀY ĐĂNG TUYỂN
                    </h5>
                    <p className="mt-1 text-sm ">03/02/2002</p>
                  </div>
                </li>
                <li className="flex border-[#949697] border-b-2 py-4">
                  <div className="w-[20%]">
                    <BsCalendarX className="text-[35px] mx-auto items-center" />
                  </div>
                  <div className="w-[80%] text-xs">
                    <h5 className="text-[#949697] font-light">NGÀY KẾT THÚC</h5>
                    <p className="mt-1 text-sm ">03/02/2002</p>
                  </div>
                </li>
                <li className="flex border-[#949697] border-b-2 py-4">
                  <div className="w-[20%]">
                    <BiCategoryAlt className="text-[35px] mx-auto items-center" />
                  </div>
                  <div className="w-[80%] text-xs">
                    <h5 className="text-[#949697] font-light">
                      LOẠI CÔNG VIỆC
                    </h5>
                    <p className="mt-1 text-sm ">Công nghệ thông tin</p>
                  </div>
                </li>
                <li className="flex border-[#949697] border-b-2 py-4">
                  <div className="w-[20%]">
                    <AiOutlineDollarCircle className="text-[35px] mx-auto items-center" />
                  </div>
                  <div className="w-[80%] text-xs">
                    <h5 className="text-[#949697] font-light">MỨC LƯƠNG</h5>
                    <p className="mt-1 text-sm ">Thỏa thuận</p>
                  </div>
                </li>
                <li className="flex py-3">
                  <div className="w-[20%]">
                    <FiMapPin className="text-[35px] mx-auto items-center" />
                  </div>
                  <div className="w-[80%] text-xs">
                    <h5 className="text-[#949697] font-light">ĐỊA ĐIỂM</h5>
                    <p className="mt-1 text-sm ">Hồ Chí Minh</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
