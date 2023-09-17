export const EmployerProfilePage = () => {
  return (
    <section className="text-gray-[#333333]">
      <div className="px-6 py-8">
        <div className="w-full sm:w-[90%] lg:w-[95%] xl:w-[80%] mx-auto">
          <div className="flex justify-between container mx-auto">
            <div className="w-full lg:w-[60%]">
              <div className="w-full bg-white">
                <div className="overflow-hidden">
                  <img
                    className="w-full"
                    src="https://res.cloudinary.com/dcpatkvcu/image/upload/v1694959037/DoAnNganh/image_wfa9xo.png"
                    alt="banner"
                  />
                </div>
                <div className="-mt-[11%] flex w-[95%] mx-auto">
                  <div className="rounded-xl  sm:flex bg-white shadow-lg">
                    <div className="w-1/4 p-2 sm:p-5 mx-auto flex items-center">
                      <img
                        className="w-full rounded-xl p-2 border-2 "
                        src="https://res.cloudinary.com/dcpatkvcu/image/upload/v1694701182/Google_oecx0q.png"
                        alt="logo"
                      />
                    </div>
                    <div className="w-[85%] mx-auto sm:w-3/4  py-2 sm:py-5 flex flex-col justify-center sm:pr-5 text-center sm:text-left">
                      <div className="">
                        <p className="font-bold text-base md:text-xl cursor-default">
                          Công ty công nghệ đa quốc gia Google
                        </p>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs md:text-sm cursor-default">
                          Địa chỉ: 268 Lý Thường Kiệt, Phường 14, Quận 10, Thành
                          phố Hồ Chí Minh, Việt Nam
                        </p>
                      </div>
                      <div className="mt-2">
                        <a href="#" className="text-xs md:text-sm">
                          Email: goole@gmail.com.vn
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" w-[90%] mx-auto py-10">
                  <h2 className="mb-3 text-base md:text-lg font-bold text-[#333333]">
                    Mô tả
                  </h2>
                  <div className="text-sm md:text-base ">
                    <p>
                      Google LLC là một công ty công nghệ đa quốc gia của Mỹ,
                      chuyên về các dịch vụ và sản phẩm liên quan đến Internet,
                      bao gồm các công nghệ quảng cáo trực tuyến, công cụ tìm
                      kiếm, điện toán đám mây, phần mềm và phần cứng.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="-mx-8 w-[40%] hidden lg:block">
              <div className="">
                <div className="text-sm font-medium text-center text-[#333333] border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                  <ul className="flex flex-wrap -mb-px text-lg font-semibold">
                    <li className="mr-2">
                      <a
                        href="#"
                        className="inline-block p-4 text-orangetext border-b-2 border-orangetext rounded-t-lg"
                        aria-current="page"
                      >
                        Tuyển dụng
                      </a>
                    </li>
                    <li className="mr-2">
                      <a
                        href="#"
                        className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                      >
                        Tin tức
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col bg-white w-full px-6 py-4  rounded-b-lg shadow-md">
                  <ul className="-mx-4">
                    <li className="flex items-center">
                      <img
                        src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=731&amp;q=80"
                        alt="avatar"
                        className="w-10 h-10 object-cover rounded-full mx-4"
                      />
                      <p>
                        <a
                          href="#"
                          className="text-[#333333] font-bold mx-1 hover:underline"
                        >
                          Alex John
                        </a>
                        <span className="text-[#333333] text-sm font-light">
                          Created 23 Posts
                        </span>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
