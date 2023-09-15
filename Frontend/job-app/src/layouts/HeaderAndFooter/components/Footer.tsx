import {
  AiFillFacebook,
  AiFillGithub,
  AiFillHome,
  AiFillLinkedin,
  AiFillMail,
  AiFillPhone,
  AiOutlineGooglePlus,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";

export const Footer = () => {
  return (
    <footer className="bg-white text-center  lg:text-left">
      <div className="flex items-center justify-center border-b-2 border-gray-200 p-4 lg:justify-between">
        <div className="mr-12 hidden lg:block">
          <span>Hãy kết nối với chúng tôi trên các mạng xã hội:</span>
        </div>

        <div className="flex justify-center">
          <a href="#!" className="mr-6  hover:text-orangetext">
            <AiFillFacebook className="text-xl" />
          </a>
          <a href="#!" className="mr-6  hover:text-orangetext">
            <AiOutlineTwitter className="text-xl" />
          </a>
          <a href="#!" className="mr-6  hover:text-orangetext">
            <AiOutlineGooglePlus className="text-xl" />
          </a>
          <a href="#!" className="mr-6  hover:text-orangetext">
            <AiOutlineInstagram className="text-xl" />
          </a>
          <a href="#!" className="mr-6  hover:text-orangetext">
            <AiFillLinkedin className="text-xl" />
          </a>
          <a href="#!" className="mr-6  hover:text-orangetext">
            <AiFillGithub className="text-xl" />
          </a>
        </div>
      </div>

      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="">
            <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
              <img
                src="https://res.cloudinary.com/dcpatkvcu/image/upload/v1692603983/DoAnNganh/logo_afswhb.png"
                alt="logo"
                className="w-3/4 mx-auto md:ml-5  lg:w-full "
              />
            </h6>
          </div>

          <div className="">
            <p className="mb-4 lg:mr-14 font-normal">
              Luôn nỗ lực hoàn thiện và phát triển sự chuyên môn hoá bằng những
              cải tiến không ngừng nhằm giữ vững vị trí hàng đầu trong các lĩnh
              vực hoạt động.
            </p>
          </div>

          <div className="font-medium">
            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Danh mục
            </h6>
            <p className="mb-4">
              <a href="#!" className=" hover:text-orangetext">
                Trang chủ
              </a>
            </p>
            <p className="mb-4">
              <a href="#!" className=" hover:text-orangetext">
                Tìm việc làm
              </a>
            </p>
            <p className="mb-4">
              <a href="#!" className=" hover:text-orangetext">
                Danh sách công ty
              </a>
            </p>
          </div>

          <div className="font-medium">
            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Liên hệ
            </h6>
            <p className="group mb-4 flex items-center justify-center md:justify-start">
              <AiFillHome className="text-xl mr-3 group-hover:text-orangetext" />
              <a href="#!" className=" group-hover:text-orangetext">
                Thành phố Hồ Chí minh
              </a>
            </p>
            <p className="group mb-4 flex items-center justify-center md:justify-start">
              <AiFillMail className="text-xl mr-3 group-hover:text-orangetext" />
              <a href="#!" className=" group-hover:text-orangetext">
                jobs@gmail.com
              </a>
            </p>
            <p className="group mb-4 flex items-center justify-center md:justify-start">
              <AiFillPhone className="text-xl mr-3 group-hover:text-orangetext" />
              <a href="#!" className=" group-hover:text-orangetext">
                0123456789
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
