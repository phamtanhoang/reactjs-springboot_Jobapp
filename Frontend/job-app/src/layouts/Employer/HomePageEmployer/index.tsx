import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const HomePageEmployer = () => {
  return (
    <>
      <div className="p-6 bg-gray-100 mb-20">
        <div>
          
          <div className="lg:flex justify-between items-center mb-6">
            <p className="text-2xl font-semibold mb-2 lg:mb-0">
              Greetings, Employer!
            </p>
          </div>
          <div className="flex flex-wrap -mx-3 mb-20">
            <div className="w-1/2 xl:w-1/4 px-3">
              <div className="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0">
                <div className="text-gray-700">
                  <p className="font-semibold text-3xl">10</p>
                  <p>All job</p>
                </div>
              </div>
            </div>
            <div className="w-1/2 xl:w-1/4 px-3">
              <div className="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0">
                <div className="text-gray-700">
                  <p className="font-semibold text-3xl">0</p>
                  <p>Pending jobs</p>
                </div>
              </div>
            </div>
            <div className="w-1/2 xl:w-1/4 px-3">
              <div className="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6">
                <div className="text-gray-700">
                  <p className="font-semibold text-3xl">10</p>
                  <p>All application</p>
                </div>
              </div>
            </div>
            <div className="w-1/2 xl:w-1/4 px-3">
              <div className="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6">
                <div className="text-gray-700">
                  <p className="font-semibold text-3xl">0</p>
                  <p>Pending applications</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3">
            <div className="w-full xl:w-1/3 px-3">
              <p className="text-xl font-semibold mb-4">Pending job</p>
              <div className="w-full bg-white border rounded-lg p-4 mb-8 xl:mb-0">
                <div className="w-full bg-gray-100 border rounded-lg flex justify-between items-center px-4 py-2 my-2">
                  <div>
                    <div className="flex items-center">
                      <Link
                        to="#"
                        className="font-semibold text-lg hover:text-blue-500"
                      >
                        Lập trình viên
                      </Link>
                    </div>
                    <p>Công nghệ thông tin</p>
                  </div>
                </div>
                <div className="w-full bg-gray-100 border rounded-lg flex justify-between items-center px-4 py-2 my-2">
                  <div>
                    <div className="flex items-center">
                      <Link
                        to="#"
                        className="font-semibold text-lg hover:text-blue-500"
                      >
                        Lập trình viên
                      </Link>
                    </div>
                    <p>Công nghệ thông tin</p>
                  </div>
                </div>
                <div className="w-full bg-gray-100 border rounded-lg flex justify-between items-center px-4 py-2 my-2">
                  <div>
                    <div className="flex items-center">
                      <Link
                        to="#"
                        className="font-semibold text-lg hover:text-blue-500"
                      >
                        Lập trình viên
                      </Link>
                    </div>
                    <p>Công nghệ thông tin</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full xl:w-1/3 px-3">
              <p className="text-xl font-semibold mb-4">Pending application</p>
              <div className="w-full bg-white border rounded-lg p-4 mb-8 xl:mb-0">
                <div className="w-full bg-gray-100 border rounded-lg flex justify-between items-center px-4 py-2 my-2">
                  <div>
                    <div className="flex items-center">
                      <Link
                        to="#"
                        className="font-semibold text-lg hover:text-blue-500 truncate max-w-[180px] sm:max-w-[450px]  lg:max-w-[180px]"
                      >
                        Lập trình viên
                      </Link>
                    </div>
                    <p className="truncate max-w-[180px] sm:max-w-[450px]  lg:max-w-[180px]">
                      Công nghệ thông tin
                    </p>
                  </div>
                  <div className="flex gap-1 sm:gap-2 text-2xl">
                    <div className="cursor-pointer hover:text-blue-500">
                      <AiFillCheckCircle />
                    </div>
                    <div className="cursor-pointer hover:text-red-500">
                      <AiFillCloseCircle />
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-100 border rounded-lg flex justify-between items-center px-4 py-2 my-2">
                  <div>
                    <div className="flex items-center">
                      <Link
                        to="#"
                        className="font-semibold text-lg hover:text-blue-500  truncate max-w-[180px] sm:max-w-[450px]  lg:max-w-[180px]"
                      >
                        Lập trình viên
                      </Link>
                    </div>
                    <p className="truncate max-w-[180px] sm:max-w-[450px]  lg:max-w-[180px]">
                      Công nghệ thông tin
                    </p>
                  </div>
                  <div className="flex gap-1 sm:gap-2 text-2xl">
                    <div className="cursor-pointer hover:text-blue-500">
                      <AiFillCheckCircle />
                    </div>
                    <div className="cursor-pointer hover:text-red-500">
                      <AiFillCloseCircle />
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-100 border rounded-lg flex justify-between items-center px-4 py-2 my-2">
                  <div>
                    <div className="flex items-center">
                      <Link
                        to="#"
                        className="font-semibold text-lg hover:text-blue-500  truncate max-w-[180px] sm:max-w-[450px]  lg:max-w-[180px]"
                      >
                        Lập trình viên
                      </Link>
                    </div>
                    <p className="truncate max-w-[180px] sm:max-w-[450px]  lg:max-w-[180px]">
                      Công nghệ thông tin
                    </p>
                  </div>
                  <div className="flex gap-1 sm:gap-2 text-2xl">
                    <div className="cursor-pointer hover:text-blue-500">
                      <AiFillCheckCircle />
                    </div>
                    <div className="cursor-pointer hover:text-red-500">
                      <AiFillCloseCircle />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full xl:w-1/3 px-3">
              <p className="text-xl font-semibold mb-4">Popular jobs</p>
              <div className="w-full bg-white border rounded-lg p-4">
                <div className="w-full bg-gray-100 border rounded-lg flex justify-between items-center px-4 py-2 my-2">
                  <div>
                    <div className="flex items-center">
                      <Link
                        to="#"
                        className="font-semibold text-lg hover:text-blue-500 truncate max-w-[180px] sm:max-w-[450px]  lg:max-w-[180px]"
                      >
                        Lập trình viên
                      </Link>
                    </div>
                    <p className="truncate max-w-[180px] sm:max-w-[450px]  lg:max-w-[180px]">
                      Công nghệ thông tin
                    </p>
                  </div>
                  <span className="text-blue-500 font-semibold text-lg">
                    3 apply
                  </span>
                </div>
                <div className="w-full bg-gray-100 border rounded-lg flex justify-between items-center px-4 py-2 my-2">
                  <div>
                    <div className="flex items-center">
                      <Link
                        to="#"
                        className="font-semibold text-lg hover:text-blue-500  truncate max-w-[180px] sm:max-w-[450px]  lg:max-w-[180px]"
                      >
                        Lập trình viên
                      </Link>
                    </div>
                    <p className="truncate max-w-[180px] sm:max-w-[450px]  lg:max-w-[180px]">
                      Công nghệ thông tin
                    </p>
                  </div>
                  <span className="text-blue-500 font-semibold text-lg">
                    3 apply
                  </span>
                </div>
                <div className="w-full bg-gray-100 border rounded-lg flex justify-between items-center px-4 py-2 my-2">
                  <div>
                    <div className="flex items-center">
                      <Link
                        to="#"
                        className="font-semibold text-lg hover:text-blue-500  truncate max-w-[180px] sm:max-w-[450px]  lg:max-w-[180px]"
                      >
                        Lập trình viên
                      </Link>
                    </div>
                    <p className="truncate max-w-[180px] sm:max-w-[450px]  lg:max-w-[180px]">
                      Công nghệ thông tin
                    </p>
                  </div>
                  <span className="text-blue-500 font-semibold text-lg">
                    3 apply
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePageEmployer;
