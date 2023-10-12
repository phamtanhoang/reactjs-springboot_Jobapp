/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { TopEmployers } from "../HomePage/components";
import { CandidateResponseModel } from "../../../models/CandidateResponseModel";
import authsAPI from "../../../services/Auths";
import "react-quill/dist/quill.snow.css";
import { LeftPage } from "./components";
import { RightPage } from "./components";

const ProfilePage = () => {
  const [candidateRes, setCandidateRes] = useState<CandidateResponseModel>();

  useEffect(() => {
    if (localStorage.getItem("candidateToken")) {
      authsAPI
        .currentCandidate(localStorage.getItem("candidateToken") || "")
        .then((res) => {
          setCandidateRes(res.data);
        })
        .catch((error: any) => {
          console.log(error.message);
        });
    }
  }, []);

  return (
    <>
      <section className="text-gray-[#333333] px-6 pt-8 ">
        <div className="w-full sm:w-[90%] lg:w-[95%] xl:w-[80%] mx-auto mt-5">
          <div className="mx-auto  bg-white p-10 rounded shadow-lg">
            <h1 className="text-2xl font-bold mb-10 text-center">
              HỒ SƠ CÁ NHÂN:
            </h1>
            <div className="flex-row lg:flex gap-6 justify-center">
              <LeftPage candidateRes={candidateRes} />
              <RightPage candidateRes={candidateRes} />
            </div>
          </div>
        </div>
      </section>
      <TopEmployers />
    </>
  );
};
export default ProfilePage;
