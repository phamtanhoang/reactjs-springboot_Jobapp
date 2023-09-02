import { ChangeEvent, useState } from "react";
import { AiOutlineSearch, AiOutlineEnvironment } from "react-icons/ai";

export const Hero = () => {
  const [selectedOption, setSelectedOption] = useState("ALL");

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <section className="min-h-screen flex py-10 lg:flex-row flex-col-reverse items-center">
      <div className="flex-auto lg:w-2/3 ">
        <div className="w-4/5 mx-auto md:w-full md:mx-0 lg:w-9/12 m-0 lg:mx-40">
          <h1 className="font-bold text-3xl lg:text-4xl">
            Tìm kiếm công việc <span className="text-orangetext">Trong mơ</span>{" "}
            của bạn
          </h1>
          <p className="text-base max-w-2xl font-normal mt-4 text-neutral-500">
            Tại đây, bạn có thể tìm thấy những tin tuyển dụng việc làm với mức
            lương vô cùng hấp dẫn. Là nơi bạn có thể tìm những công việc việc có
            môi trường chuyên nghiệp, năng động, trẻ trung.
          </p>
          <h2 className="text-lg lg:text-xl font-medium mt-5 lg:mt-8 mb-2.5">
            Những từ khóa xu hướng:
          </h2>
          <div className="text-sm lg:text-lg text-orangetext flex font-medium">
            <a href="#" className="mr-2.5">
              Web Designer
            </a>
            <a href="#" className="mr-2.5">
              UI/UX Designer
            </a>
            <a href="#">Frontend</a>
          </div>
          <div className="flex-row ư-full md:w-11/12 mt-8 bg-white px-4 py-2 justify-between rounded-2xl md:rounded-full md:flex">
            <div className="flex gap-4 mx-1 my-4 md:m-0">
              <div className="text-orangetext">
                <AiOutlineSearch className="h-full text-2xl" />
              </div>
              <input
                className=" placeholder:text-slate-400 block bg-white w-full  py-1 px-3 focus:outline-none focus:border-orangetext focus:ring-orangetext focus:ring-1 sm:text-sm rounded"
                placeholder="Vị trí tuyển dụng..."
                type="text"
                name="job"
              />
            </div>
            <div className="flex gap-4 text-lg mx-1 my-5 md:m-0">
              <div className="text-orangetext">
                <AiOutlineEnvironment className="h-full text-2xl" />
              </div>
              <select
                className="text-gray-900 block w-full py-1 px-3 focus:outline-none focus:border-orangetext focus:ring-orangetext focus:ring-1 text-sm rounded"
                onChange={handleChange}
                value={selectedOption}
              >
                <option
                  value="ALL"
                  className={selectedOption === "ALL" ? "text-orangetext" : ""}
                >
                  Tất cả tỉnh/thành phố
                </option>
                <option
                  value="US"
                  className={selectedOption === "US" ? "text-orangetext" : ""}
                >
                  United States
                </option>
                <option
                  value="CA"
                  className={selectedOption === "CA" ? "text-orangetext" : ""}
                >
                  Canada
                </option>
                <option
                  value="FR"
                  className={selectedOption === "FR" ? "text-orangetext" : ""}
                >
                  France
                </option>
                <option
                  value="DE"
                  className={selectedOption === "DE" ? "text-orangetext" : ""}
                >
                  Germany
                </option>
              </select>
            </div>
            <div>
              <button className="text-white px-8 py-2 rounded-full font-semibold bg-orangetext hover:outline-none hover:ring hover:ring-orangebackground mx-16 my-2 md:m-0">
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-auto lg:w-1/3 flex items-center justify-center">
        <img
          src="https://res.cloudinary.com/dcpatkvcu/image/upload/v1692603984/DoAnNganh/image-hero_cly9ur.png"
          alt=""
          className="w-5/6 ml-auto lg:w-full h-full object-cover"
        />
      </div>
    </section>
  );
};
