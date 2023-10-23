import { Link } from "react-router-dom";

const BlogsPage = () => {
  return (
    <>
      <div className="px-6 py-8">
        <div className="flex justify-between container mx-auto">
          <div className="w-full lg:w-8/12">
            <div className="w-full flex-row sm:flex  lg:justify-between py-3 pl-5 bg-white rounded-lg shadow-md ">
              <h1 className="text-lg sm:text-xl font-bold md:text-2xl  uppercase">
                Danh sách bài đăng:
              </h1>
            </div>
            <div className="mt-6">
              <div className="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <span className="font-light text-gray-600">18/10/2023</span>
                </div>
                <div className="mt-2">
                  <a
                    href="#"
                    className="text-2xl text-gray-700 font-bold hover:text-orangetext"
                  >
                    Build Your New Idea with Laravel Freamwork.
                  </a>
                  <p className="mt-2 text-gray-600">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Tempora expedita dicta totam aspernatur doloremque.
                    Excepturi iste iusto eos enim reprehenderit nisi, accusamus
                    delectus nihil quis facere in modi ratione libero!
                  </p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <a href="#" className="text-blue-500 hover:underline">
                    Xem thêm
                  </a>
                  <div>
                    <a href="#" className="flex items-center">
                      <img
                        src="https://res.cloudinary.com/dzitm0sot/image/upload/v1697274150/Google_oecx0q.png"
                        alt="avatar"
                        className="mx-4 w-10 h-10 object-cover rounded-full block"
                      />
                      <h1 className="text-gray-700 font-bold hover:text-orangetext truncate max-w-[350px] hidden sm:block">
                        Công ty công nghệ đa quốc gia Google
                      </h1>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div className="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <span className="font-light text-gray-600">16/10/2023</span>
                </div>
                <div className="mt-2">
                  <a
                    href="#"
                    className="text-2xl text-gray-700 font-bold hover:text-orangetext"
                  >
                    Accessibility tools for designers and developers
                  </a>
                  <p className="mt-2 text-gray-600">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Tempora expedita dicta totam aspernatur doloremque.
                    Excepturi iste iusto eos enim reprehenderit nisi, accusamus
                    delectus nihil quis facere in modi ratione libero!
                  </p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <a href="#" className="text-blue-500 hover:underline">
                    Xem thêm
                  </a>
                  <div>
                    <a href="#" className="flex items-center">
                      <img
                        src="https://res.cloudinary.com/dzitm0sot/image/upload/v1697274150/Google_oecx0q.png"
                        alt="avatar"
                        className="mx-4 w-10 h-10 object-cover rounded-full block"
                      />
                      <h1 className="text-gray-700 font-bold hover:text-orangetext truncate max-w-[350px] hidden sm:block">
                        Công ty công nghệ đa quốc gia Google
                      </h1>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div className="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <span className="font-light text-gray-600">10/10/2023</span>
                </div>
                <div className="mt-2">
                  <a
                    href="#"
                    className="text-2xl text-gray-700 font-bold hover:text-orangetext"
                  >
                    PHP: Array to Map
                  </a>
                  <p className="mt-2 text-gray-600">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Tempora expedita dicta totam aspernatur doloremque.
                    Excepturi iste iusto eos enim reprehenderit nisi, accusamus
                    delectus nihil quis facere in modi ratione libero!
                  </p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <a href="#" className="text-blue-500 hover:underline">
                    Xem thêm
                  </a>
                  <div>
                    <a href="#" className="flex items-center">
                      <img
                        src="https://res.cloudinary.com/dzitm0sot/image/upload/v1697274150/Google_oecx0q.png"
                        alt="avatar"
                        className="mx-4 w-10 h-10 object-cover rounded-full block"
                      />
                      <h1 className="text-gray-700 font-bold hover:text-orangetext truncate max-w-[350px] hidden sm:block">
                        Công ty công nghệ đa quốc gia Google
                      </h1>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="-mx-8 w-4/12 hidden lg:block">
            <div className="px-8">
              <h1 className="mb-5 text-xl font-bold py-3 pl-5 bg-white rounded-lg shadow-md">
                Một số tác giả nổi bật:
              </h1>
              <div className="flex flex-col bg-white px-8 py-2 mx-auto rounded-lg shadow-lg">
                <ul className="-mx-4">
                  <li className="flex items-center p-4">
                    <div className="w-1/5 items-center mr-2">
                      <img
                        src="https://res.cloudinary.com/dzitm0sot/image/upload/v1697274150/Google_oecx0q.png"
                        alt="avatar"
                        className="w-[30px] h-[30px] xl:w-[40px] xl:h-[40px] rounded-sm "
                      />
                    </div>
                    <div className="w-4/5">
                      <p className="text-gray-700 font-semibold hover:text-orangetext text-sm">
                        Công ty công nghệ đa quốc gia Google
                        <span className="text-gray-700 text-xs font-light inline-block pl-1">
                          (5 bài đăng)
                        </span>
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center p-4">
                    <div className="w-1/5 items-center mr-2">
                      <img
                        src="https://res.cloudinary.com/dcpatkvcu/image/upload/v1694704044/DoAnNganh/Airbnb_dy33tc.png"
                        alt="avatar"
                        className="w-[30px] h-[30px] xl:w-[40px] xl:h-[40px] rounded-sm "
                      />
                    </div>
                    <div className="w-4/5">
                      <p className="text-gray-700 font-semibold hover:text-orangetext text-sm">
                        Công ty Airbnb
                        <span className="text-gray-700 text-xs font-light inline-block pl-1">
                          (2 bài đăng)
                        </span>
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center p-4">
                    <div className="w-1/5 items-center mr-2">
                      <img
                        src="https://res.cloudinary.com/dcpatkvcu/image/upload/v1695031301/DoAnNganh/Instagram_application_icon_Logo_Computer_Icons_Social_media_insta_transparent_background_PNG_clipart_preview_rev_1_wohb6c.png"
                        alt="avatar"
                        className="w-[30px] h-[30px] xl:w-[40px] xl:h-[40px] rounded-sm "
                      />
                    </div>
                    <div className="w-4/5">
                      <p className="text-gray-700 font-semibold hover:text-orangetext text-sm">
                        Doanh nghiệp Instagram
                        <span className="text-gray-700 text-xs font-light inline-block pl-1">
                          (0 bài đăng)
                        </span>
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center p-4">
                    <div className="w-1/5 items-center mr-2">
                      <img
                        src="https://res.cloudinary.com/dcpatkvcu/image/upload/v1695031301/DoAnNganh/Xiaomi_Logo_Mi___01_-_PNG_Logo_Vector_Downloads_SVG_EPS_g755yt.png"
                        alt="avatar"
                        className="w-[30px] h-[30px] xl:w-[40px] xl:h-[40px] rounded-sm "
                      />
                    </div>
                    <div className="w-4/5">
                      <p className="text-gray-700 font-semibold hover:text-orangetext text-sm">
                        Tập đoàn Xiaomi
                        <span className="text-gray-700 text-xs font-light inline-block pl-1">
                          (1 bài đăng)
                        </span>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-10 px-8">
              <h1 className="mb-5 text-xl font-bold py-3 pl-5 bg-white rounded-lg shadow-md">
                Một số bài đăng nổi bật:
              </h1>
              <div className="flex flex-col bg-white px-4 xl:px-6 py-4 max-w-sm mx-auto rounded-lg shadow-md">
                <div className="my-2">
                  <div>
                    <a
                      href="#"
                      className="text-base text-gray-700 font-medium hover:text-orangetext"
                    >
                      Build Your New Idea with Laravel Freamwork.
                    </a>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center">
                      <img
                        src="https://res.cloudinary.com/dzitm0sot/image/upload/v1697274150/Google_oecx0q.png"
                        alt="avatar"
                        className="w-9 h-9 object-cover rounded-full"
                      />
                      <Link
                        to="#"
                        className="text-gray-700 text-sm mx-3 hover:text-orangetext truncate max-w-[150px]"
                      >
                        Công ty công nghệ đa quốc gia Google
                      </Link>
                    </div>
                    <span className="font-light text-sm text-gray-600">
                      18/10/2023
                    </span>
                  </div>
                </div>
                <hr></hr>
                <div className="my-2">
                  <div>
                    <a
                      href="#"
                      className="text-base text-gray-700 font-medium hover:text-orangetext"
                    >
                      Accessibility tools for designers and developers
                    </a>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center">
                      <img
                        src="https://res.cloudinary.com/dzitm0sot/image/upload/v1697274150/Google_oecx0q.png"
                        alt="avatar"
                        className="w-9 h-9 object-cover rounded-full"
                      />
                      <a
                        href="#"
                        className="text-gray-700 text-sm mx-3 hover:text-orangetext truncate max-w-[150px]"
                      >
                        Công ty công nghệ đa quốc gia Google
                      </a>
                    </div>
                    <span className="font-light text-sm text-gray-600">
                      18/10/2023
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BlogsPage;
