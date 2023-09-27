import { BsCalendarCheck, BsCalendarX } from "react-icons/bs";
import { JobModel } from "../../../../../models/JobModel";
import { BiCategoryAlt } from "react-icons/bi";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";

export const JobDetail: React.FC<{ job?: JobModel }> = (props) => {
  return (
    <div className="w-full sm:w-[90%] lg:w-[95%] xl:w-[80%] mx-auto my-4 bg-white rounded-lg p-5 flex md:flex-row flex-col-reverse gap-5 text-sm md:text-base">
      <div className="w-full md:w-[55%] lg:w-[65%]">
        {/* <div>
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
</div> */}
        {props.job?.description}
      </div>
      <div className="w-full md:w-[45%] lg:w-[35%]">
        <div className="w-full border border-orangetext bg-[#fff4e9] rounded-lg">
          <ul className="px-5 py-2">
            <li className="flex border-[#949697] border-b-2 py-4">
              <div className="w-[20%]">
                <BsCalendarCheck className="text-[30px] sm:text-[35px] mx-auto items-center" />
              </div>
              <div className="w-[80%] text-xs">
                <h5 className="text-[#949697] font-light">NGÀY ĐĂNG TUYỂN</h5>
                <p className="mt-1 text-sm">{props.job?.fromDate}</p>
              </div>
            </li>
            <li className="flex border-[#949697] border-b-2 py-4">
              <div className="w-[20%]">
                <BsCalendarX className="text-[30px] sm:text-[35px] mx-auto items-center" />
              </div>
              <div className="w-[80%] text-xs">
                <h5 className="text-[#949697] font-light">NGÀY KẾT THÚC</h5>
                <p className="mt-1 text-sm">{props.job?.toDate}</p>
              </div>
            </li>
            <li className="flex border-[#949697] border-b-2 py-4">
              <div className="w-[20%]">
                <BiCategoryAlt className="text-[30px] sm:text-[35px] mx-auto items-center" />
              </div>
              <div className="w-[80%] text-xs">
                <h5 className="text-[#949697] font-light">LOẠI CÔNG VIỆC</h5>
                <p className="mt-1 text-sm">Công nghệ thông tin</p>
              </div>
            </li>
            <li className="flex border-[#949697] border-b-2 py-4">
              <div className="w-[20%]">
                <AiOutlineDollarCircle className="text-[30px] sm:text-[35px] mx-auto items-center" />
              </div>
              <div className="w-[80%] text-xs">
                <h5 className="text-[#949697] font-light">MỨC LƯƠNG</h5>
                <p className="mt-1 text-sm">{props.job?.salary}</p>
              </div>
            </li>
            <li className="flex py-3">
              <div className="w-[20%]">
                <FiMapPin className="text-[30px] sm:text-[35px] mx-auto items-center" />
              </div>
              <div className="w-[80%] text-xs">
                <h5 className="text-[#949697] font-light">ĐỊA ĐIỂM</h5>
                <p className="mt-1 text-sm">{props.job?.address}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
