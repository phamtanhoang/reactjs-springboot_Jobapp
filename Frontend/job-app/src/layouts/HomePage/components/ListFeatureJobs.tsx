import { AiFillHeart } from "react-icons/ai";
import { Tooltip as ReactTooltip } from "react-tooltip";

export const ListFeatureJobs: React.FC = () => {
  const tooltipStyle = {
    fontSize: "12px",
    // opacity: 0.5,
  };
  return (
    <section className="py-12">
      <div className="w-10/12 m-auto">
        <div className="flex justify-center">
          <div className="max-w-[800px] text-center">
            <h2 className="mb-4 text-3xl font-semibold">Việc làm nổi bật</h2>
            <p className="mb-10 text-neutral-500">
              Hãy cùng khám phá các công việc tại đây và bắt đầu hành trình mới
              của bạn ngay hôm nay!
            </p>
          </div>
        </div>

        <div className="grid gap-x-5 gap-y-5 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(12)].map((_, index) => (
            <div
              className="group bg-white border-gray-200 border-2 rounded-lg p-5 hover:border-orangetext hover:bg-[#f4f5f5]"
              key={index}
            >
              <div className="flex">
                <div className="w-1/4 flex justify-center items-center">
                  <img
                    src="https://res.cloudinary.com/dcpatkvcu/image/upload/v1692603982/DoAnNganh/cat4_qgkk9a.png"
                    alt="logo-company"
                    className="w-2/3"
                  />
                </div>
                <div className="w-3/4 ml-2 grow">
                  <p
                    className="mb-1 font-semibold text-sm truncate overflow-ellipsis group-hover:text-orangetext"
                    data-tooltip-id="my-tooltip-1"
                  >
                    Support 24/7 alsihdfiashdfpahsdfpo
                  </p>
                  <p
                    className="text-neutral-500 text-xs truncate overflow-ellipsis cursor-default"
                    data-tooltip-id="my-tooltip-2"
                  >
                    Pellentesque mollis, metus nec fringilla aliquam
                  </p>
                  <ReactTooltip
                    id="my-tooltip-1"
                    place="bottom"
                    content="Thỏa thuận"
                    style={tooltipStyle}
                  />

                  <ReactTooltip
                    id="my-tooltip-2"
                    place="bottom"
                    content="Thỏa thuận"
                    style={tooltipStyle}
                  />
                </div>
              </div>
              <div className="flex mt-4">
                <div className="flex w-11/12 justify-items-start mr-3">
                  <div
                    className="bg-[#f4f5f5] text-xs text-[#212f3f] py-1 px-2 mx-2 rounded-md max-w-[115px] lg:max-w-[62px]  xl:max-w-[1000px]  overflow-hidden whitespace-nowrap overflow-ellipsis cursor-default"
                    data-tooltip-id="my-tooltip-3"
                  >
                    Thỏa thuận
                  </div>

                  <div
                    className="bg-[#f4f5f5] text-xs text-[#212f3f] py-1 px-2 rounded-md max-w-[115px] lg:max-w-[62px] xl:max-w-[100px] overflow-hidden whitespace-nowrap overflow-ellipsis cursor-default"
                    data-tooltip-id="my-tooltip-4"
                  >
                    Hồ Chí Minh
                  </div>

                  <ReactTooltip
                    id="my-tooltip-3"
                    place="bottom"
                    content="Thỏa thuận"
                    style={tooltipStyle}
                  />
                  <ReactTooltip
                    id="my-tooltip-4"
                    place="bottom"
                    content="Hồ Chí Minh"
                    style={tooltipStyle}
                  />
                </div>
                <div className="w-1/12 cursor-pointer text-neutral-500 hover:text-red-600">
                  <AiFillHeart className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
