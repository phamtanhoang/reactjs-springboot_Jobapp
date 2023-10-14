/* eslint-disable @typescript-eslint/no-explicit-any */
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";
import { candidatesAPI } from "../../../../../services";
import { ErrorBox, Spinner } from "../../../../../components";
import { CandidateResponseModel } from "../../../../../models/CandidateResponseModel";

const ProfileAccountPage: React.FC<{
  setShowBoxProfileAccount: any;
  accountID: string;
}> = (props) => {
  const [candidate, setCandidate] = useState<CandidateResponseModel>();

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchCandidate = () => {
      candidatesAPI
        .getCandidateProfileById(props.accountID)
        .then((res) => {
          setCandidate(res.data);
        })
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchCandidate();
  }, [props.accountID]);

  if (isLoading) {
    return (
      <div className="flex-grow">
        <Spinner />
      </div>
    );
  }

  if (httpError) {
    return (
      <div className="flex-grow w-5/6 sm:w-3/4 mx-auto my-10">
        <ErrorBox text={httpError} />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow relative w-[90%] sm:w-[75%] md:w-[60%] xl:w-1/2">
        <div className="flex items-start justify-between p-2 sm:p-5 pl-5 border-b rounded-t">
          <h3 className="text-xl font-semibold">Profile Account</h3>
          <button
            type="button"
            className="text-xl text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center"
            onClick={() => props.setShowBoxProfileAccount(false)}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="rounded-lg py-3 overflow-y-auto max-h-[calc(100vh-180px)]">
          <div className="sm:flex justify-center">
            <div className="p-2 sm:w-[35%]">
              <img
                className="w-32 h-32 rounded-full mx-auto"
                src={
                  candidate?.avatar
                    ? candidate.avatar
                    : "https://res.cloudinary.com/dcpatkvcu/image/upload/v1695807392/DoAnNganh/non-user_lctzz5.jpg"
                }
                alt="avatar"
              />
              <h3 className="text-center text-xl text-gray-900 font-medium leading-8 mt-1">
                {candidate?.firstName} {candidate?.lastName}
              </h3>
            </div>
            <div className="p-2 sm:w-[60%] pt-0 sm:pt-2">
              <table className="text-xs sm:text-sm my-3">
                <tbody>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      Email:
                    </td>
                    <td className="px-2 py-2">{candidate?.username}</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      Date of birth:
                    </td>
                    <td className="px-2 py-2">
                      {candidate?.dateOfBirth &&
                        new Date(candidate?.dateOfBirth).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      Sex:
                    </td>
                    <td className="px-2 py-2">{candidate?.sex}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="pb-2 px-4 sm:px-14 text-xs sm:text-sm">
            <div>
              <h2 className="text-gray-500 font-semibold text-base mb-2">
                Skill
              </h2>
              <div
                className="mb-2 ml-3"
                dangerouslySetInnerHTML={{
                  __html: candidate?.skill || "",
                }}
              />
            </div>
            <div>
              <h2 className="text-gray-500 font-semibold text-base my-2">
                Experience
              </h2>
              <div
                className="mb-2 ml-3"
                dangerouslySetInnerHTML={{
                  __html: candidate?.experience || "",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileAccountPage;
