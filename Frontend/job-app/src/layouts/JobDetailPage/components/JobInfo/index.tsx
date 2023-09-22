/* eslint-disable @typescript-eslint/no-explicit-any */
import { JobModel } from "../../../../models/JobModel";

export const JobInfo: React.FC<{ job?: JobModel }> = (props) => {
  const calculateDaysRemaining = (toDate: string) => {
    const currentDate = new Date() as any; // Ngày hiện tại
    const targetDate = new Date(toDate) as any; // Chuyển đổi chuỗi toDate thành đối tượng Date

    // Tính số mili giây còn lại giữa ngày đích và ngày hiện tại
    const timeRemaining = targetDate - currentDate;

    // Chuyển đổi số mili giây thành số ngày và làm tròn xuống
    const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

    return daysRemaining;
  };

  const dayRemaining = calculateDaysRemaining(props.job?.toDate || "");

  return (
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
            {props.job?.title}
          </p>
        </div>
        <div className="md:mt-2">
          <p className="text-gray-600 text-sm md:text-base truncate cursor-pointer">
            Công ty công nghệ đa quốc gia Google
          </p>
        </div>

        {dayRemaining > 0 ? (
          <>
            <div className="md:mt-1">
              <span className="font-light text-xs md:text-sm text-neutral-500">
                Hết hạn trong {dayRemaining} ngày
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
          </>
        ) : (
          <>
            <div className="mt-4 ">
              <span className="font-semibold text-lg md:text-xl text-red-500">
                Đã hết hạn
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
