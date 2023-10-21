/* eslint-disable @typescript-eslint/no-explicit-any */
import { CandidateResponseModel } from "../../../../../models/CandidateResponseModel";
import { BsFillPencilFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { ErrorBox } from "../../../../../components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { candidatesAPI } from "../../../../../services";
import Swal from "sweetalert2";

const RightPage: React.FC<{ candidateRes?: CandidateResponseModel }> = (
  props
) => {
  const [showBoxSkill, setShowBoxSkill] = useState(false);
  const [showBoxExp, setShowBoxExp] = useState(false);

  const [skill, setSkill] = useState<string>("");
  const [exp, setExp] = useState("");

  useEffect(() => {
    if (props.candidateRes?.skill) {
      setSkill(props.candidateRes?.skill);
    }
  }, [props.candidateRes?.skill]);

  useEffect(() => {
    if (props.candidateRes?.experience) {
      setExp(props.candidateRes?.experience);
    }
  }, [props.candidateRes?.experience]);

  const closedBoxSkill = () => {
    setSkill(props.candidateRes?.skill || "");
    setShowBoxSkill(false);
  };

  const closedBoxExp = () => {
    setExp(props.candidateRes?.experience || "");
    setShowBoxExp(false);
  };

  const handleSkillChange = (content: string) => {
    setSkill(content);
  };

  const handleExpChange = (content: string) => {
    setExp(content);
  };

  const AddSkillHandle = () => {
    const token = localStorage.getItem("candidateToken") || "";
    if (token) {
      Swal.fire({
        title: "Xác nhận chỉnh sửa?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý",
      }).then((result) => {
        if (result.isConfirmed) {
          candidatesAPI
            .updateCandidateSkill(skill, token)
            .then(() => {
              Swal.fire("Thành công!", "Chỉnh sửa thành công!", "success");
              window.location.reload();
            })
            .catch(() => {
              Swal.fire("Thất bại!", "Chỉnh sửa thất bại!", "error");
            });
        }
      });
    }
  };

  const AddExpHandle = () => {
    const token = localStorage.getItem("candidateToken") || "";
    if (token) {
      Swal.fire({
        title: "Xác nhận chỉnh sửa?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý",
      }).then((result) => {
        if (result.isConfirmed) {
          candidatesAPI
            .updateCandidateExp(exp, token)
            .then(() => {
              Swal.fire("Thành công!", "Chỉnh sửa thành công!", "success");
              window.location.reload();
            })
            .catch(() => {
              Swal.fire("Thất bại!", "Chỉnh sửa thất bại!", "error");
            });
        }
      });
    }
  };

  return (
    <>
      <div className="w-full lg:w-[50%]">
        <div className="mt-7 lg:mt-0">
          <div className="flex justify-between">
            <h1 className="font-bold text-xl text-gray-700">Kĩ năng:</h1>
            <button
              className="hover:text-orangetext"
              onClick={() => setShowBoxSkill(!showBoxSkill)}
            >
              <BsFillPencilFill />
            </button>
          </div>
          <div className="mt-2 p-4 rounded-lg ring-2 ring-orangetext">
            {props.candidateRes?.skill ? (
              <div
                className=""
                dangerouslySetInnerHTML={{
                  __html: props.candidateRes?.skill,
                }}
              />
            ) : (
              <ErrorBox text="Chưa có kĩ năng" />
            )}
          </div>
        </div>
        <div className="mt-7">
          <div className="flex justify-between">
            <h1 className="font-bold text-xl text-gray-700">Kinh nghiệm:</h1>
            <button
              className="hover:text-orangetext"
              onClick={() => setShowBoxExp(!showBoxExp)}
            >
              <BsFillPencilFill />
            </button>
          </div>
          <div className="mt-2 p-4 rounded-lg ring-2 ring-orangetext">
            {props.candidateRes?.experience ? (
              <div
                className=""
                dangerouslySetInnerHTML={{
                  __html: props.candidateRes?.experience,
                }}
              />
            ) : (
              <ErrorBox text="Chưa có kinh nghiệm" />
            )}
          </div>
        </div>
      </div>
      {showBoxSkill && localStorage.getItem("candidateToken") && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-[75%] sm:w-[60%] md:w-1/2 xl:w-1/3 text-sm ">
            <h1 className="text-base md:text-lg font-semibold w-full text-center mb-5">
              Thêm kĩ năng
            </h1>
            <ReactQuill
              theme="snow"
              value={skill}
              onChange={handleSkillChange}
              className="max-h-[40vh] overflow-y-auto"
            />
            <div className="mb-3 flex gap-5 justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
                onClick={closedBoxSkill}
              >
                Hủy bỏ
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
                onClick={AddSkillHandle}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}

      {showBoxExp && localStorage.getItem("candidateToken") && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-[75%] sm:w-[60%] md:w-1/2 xl:w-1/3 text-sm">
            <h1 className="text-base md:text-lg font-semibold w-full text-center mb-5">
              Thêm kinh nghiệm
            </h1>
            <ReactQuill
              theme="snow"
              value={exp}
              onChange={handleExpChange}
              className="max-h-[40vh] overflow-y-auto"
            />
            <div className="mb-3 flex gap-5 justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
                onClick={closedBoxExp}
              >
                Hủy bỏ
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
                onClick={AddExpHandle}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default RightPage;
