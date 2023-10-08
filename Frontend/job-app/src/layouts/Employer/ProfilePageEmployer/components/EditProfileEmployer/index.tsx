import { AiOutlineClose } from "react-icons/ai";

/* eslint-disable @typescript-eslint/no-explicit-any */
const EditProfileEmployer: React.FC<{
  setShowChangeProfile: any;
}> = (props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow relative w-[95%] sm:w-[85%] md:w-[70%] xl:w-1/2">
        <div className="flex items-start justify-between p-2 sm:p-5 pl-5 border-b rounded-t">
          <h3 className="text-xl font-semibold">Edit Profile</h3>
          <button
            type="button"
            className="text-xl text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center"
            onClick={() => props.setShowChangeProfile(false)}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="p-2 sm:p-6 space-y-6">
          <form>
            <div className="mt-6 flex justify-end">
              <button
                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="submit"
              >
                Change
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditProfileEmployer;
