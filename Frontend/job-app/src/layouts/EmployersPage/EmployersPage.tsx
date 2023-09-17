import { AiFillHeart, AiOutlineSearch } from "react-icons/ai";

export const EmployersPage = () => {
  return (
    <section className="text-gray-700">
      <div className="px-6 py-10">
        <div className="w-full md:w-[95%] lg:w-full xl:w-[85%] mx-auto">
          <div className="w-full">
            <h1 className="text-lg sm:text-xl font-bold md:text-2xl text-center uppercase">
              Danh sách nhà tuyển dụng
            </h1>
          </div>
          <div className="w-full my-7">
            <form>
              <div className="relative w-full lg:w-[80%] mx-auto text-sm sm:text-base">
                <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                  <AiOutlineSearch className="w-6 h-6" />
                </div>
                <input
                  type="search"
                  className="block w-full  p-4 pl-14 text-gray-900 border-2 border-gray-200 rounded-lg bg-white focus:ring-orangetext focus:border-orangetext focus:outline-none"
                  placeholder="Nhập tên nhà tuyển dụng...."
                />
              </div>
            </form>
          </div>
          <div className="w-full grid gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(12)].map((_, index) => (
              <div
                className="group bg-white border-gray-200 border-2 rounded-lg hover:border-orangetext hover:bg-[#f4f5f5]"
                key={index}
              >
                <div className="overflow-hidden rounded-tl-lg rounded-tr-lg bg-orangebackground">
                  <img
                    className="rounded-tl-xl rounded-tr-xl"
                    src="https://res.cloudinary.com/dcpatkvcu/image/upload/v1694959037/DoAnNganh/image_wfa9xo.png"
                    alt="banner"
                  />
                </div>
                <div className="-mt-[13%] flex justify-center">
                  <img
                    className="w-1/4 rounded-lg bg-white p-2 shadow-xl"
                    src="https://res.cloudinary.com/dcpatkvcu/image/upload/v1694701182/Google_oecx0q.png"
                    alt="logo"
                  />
                </div>
                <div className="text-sm md:text-base p-5 text-center">
                  <p className="">
                    <span className="font-bold">Joshua Welford</span>{" "}
                    (Welfordian)
                  </p>
                  <p className="mt-2 text-xs md:text-sm">
                    Software Engineer working on an EMR system for a non-profit.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
