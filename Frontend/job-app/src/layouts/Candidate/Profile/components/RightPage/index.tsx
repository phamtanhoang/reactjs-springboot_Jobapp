import ReactQuill from "react-quill";
import { CandidateResponseModel } from "../../../../../models/CandidateResponseModel";
import { BsFillPencilFill } from "react-icons/bs";
import { useState } from "react";

const RightPage: React.FC<{ candidateRes?: CandidateResponseModel }> = (
  props
) => {
  const [showBoxSkill, setShowBoxSkill] = useState(false);
  const [showBoxExp, setShowBoxExp] = useState(false);

  return (
    <>
      <div className="w-full lg:w-[50%]">
        <div className="mt-7 lg:mt-0">
          <div className="flex justify-between">
            <h1 className="font-semibold text-lg">Kĩ năng:</h1>
            <button
              className="hover:text-blue-600"
              onClick={() => setShowBoxSkill(!showBoxSkill)}
            >
              <BsFillPencilFill />
            </button>
          </div>
          <div className="mt-5">
            <ReactQuill />
          </div>
        </div>
        <div className="mt-7">
          <div className="flex justify-between">
            <h1 className="font-semibold text-lg ">Kinh nghiệm:</h1>
            <button
              className="hover:text-blue-600"
              onClick={() => setShowBoxExp(!showBoxExp)}
            >
              <BsFillPencilFill />
            </button>
          </div>
          <div className="mt-5">
            <ReactQuill />
          </div>
        </div>
      </div>
      {showBoxSkill && localStorage.getItem("candidateToken") ? (
        <div className="fixed inset-0 flex items-center justify-center z-[999999999] bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-[75%] sm:w-[60%] md:w-1/2 xl:w-1/3 text-sm">
            <h1 className="text-base md:text-lg font-semibold w-full text-center mb-5">
              Thêm kĩ năng
            </h1>
            <ReactQuill />

            <div className="mb-3 flex gap-5 justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
                onClick={() => setShowBoxSkill(!showBoxSkill)}
              >
                Hủy bỏ
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded">
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      {showBoxExp && localStorage.getItem("candidateToken") ? (
        <div className="fixed inset-0 flex items-center justify-center z-[999999999] bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-[75%] sm:w-[60%] md:w-1/2 xl:w-1/3 text-sm">
            <h1 className="text-base md:text-lg font-semibold w-full text-center mb-5">
              Thêm kinh nghiệm
            </h1>

            <ReactQuill />
            <div className="mb-3 flex gap-5 justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
                onClick={() => setShowBoxExp(!showBoxExp)}
              >
                Hủy bỏ
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded">
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default RightPage;
