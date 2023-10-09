import { useState } from "react";
import { GrFormNext } from "react-icons/gr";
import { TableApplicationsPage } from "./components";
import { Link } from "react-router-dom";

const ApplicationPageEmployer = () => {
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
                    to="/employer/applications"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Applications
                  </Link>
                </li>
              </ol>
            </nav>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              All application
            </h1>
          </div>

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
        </div>
      </div>

      <TableApplicationsPage title={title} />

    </section>
  );
};
export default ApplicationPageEmployer;
