import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  PendingApplications,
  PendingJobs,
  PopularJobs,
  Statistics,
} from "./components";

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
          <Statistics />
          <div className="flex flex-wrap -mx-3">
            <PendingJobs />
            <PendingApplications />
            <PopularJobs />
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePageEmployer;
