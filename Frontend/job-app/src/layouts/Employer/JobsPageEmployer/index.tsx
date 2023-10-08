import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { GrFormNext } from "react-icons/gr";
import { AddJobPage, TablePage } from "./components";
import { Link } from "react-router-dom";

const JobsPageEmployer = () => {
  const [showBoxAddJob, setShowBoxAddJob] = useState(false);
  const [title, setTitle] = useState("");

  return (
    <section className="flex-grow">
      <div className="p-6 block sm:flex items-center justify-between">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <nav aria-label="Breadcrumb" className="text-sm font-semibold mb-6">
              <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                  <Link
                    to="/employer"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Home
                  </Link>
                  <GrFormNext className="text-lg mx-2" />
                </li>
                <li className="flex items-center">
                  <Link
                    to="/employer/jobs"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Jobs
                  </Link>
                </li>
              </ol>
            </nav>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              All jobs
            </h1>
          </div>
          <div className="block sm:flex items-center">
            <form className="sm:pr-3 mb-4 sm:mb-0">
              <label className="sr-only">Search</label>
              <div className="mt-1 relative sm:w-64 xl:w-96">
                <input
                  type="text"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Search for jobs"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
            </form>
            <div className="flex items-center sm:justify-end w-full">
              <button
                type="button"
                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center sm:ml-auto"
                onClick={() => setShowBoxAddJob(true)}
              >
                <AiOutlinePlus className="text-lg mr-2" />
                Add job
              </button>
            </div>
          </div>
        </div>
      </div>

      <TablePage title={title} />

      {showBoxAddJob && localStorage.getItem("employerToken") && (
        <AddJobPage setShowBoxAddJob={setShowBoxAddJob} />
      )}
    </section>
  );
};
export default JobsPageEmployer;
