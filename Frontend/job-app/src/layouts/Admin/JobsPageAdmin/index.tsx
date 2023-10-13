/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { GrFormNext } from "react-icons/gr";
import { Link } from "react-router-dom";
import { AddJob, TablePage } from "./components";
import { categoriesAPI } from "../../../services";
import { ErrorBox, Spinner } from "../../../components";
import { CategoryModel } from "../../../models/CategoryModel";

const JobsPageAdmin = () => {
  const [showBoxAdd, setShowBoxAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<CategoryModel[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchCategories = () => {
      categoriesAPI
        .getCategories()
        .then((res) => {
          setCategories(res.data._embedded.categories);
        })
        .catch((error: any) => {
          setHttpError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchCategories();
  }, []);
  if (isLoading) {
    return (
      <div className="flex-grow">
        <Spinner />
      </div>
    );
  }

  if (httpError) {
    return (
      <div className="flex-grow px-6 mx-auto ">
        <ErrorBox text={httpError} />
      </div>
    );
  }

  return (
    <section className="flex-grow">
      <div className="p-6 px-3 md:px-6 block sm:flex items-center justify-between">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <nav aria-label="Breadcrumb" className="text-sm font-semibold mb-6">
              <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                  <Link
                    to="/admin"
                    className="text-gray-600 hover:text-purple-600"
                  >
                    Home
                  </Link>
                  <GrFormNext className="text-lg mx-2" />
                </li>
                <li className="flex items-center">
                  <Link
                    to="/admin/jobs"
                    className="text-gray-600 hover:text-purple-600"
                  >
                    Jobs
                  </Link>
                </li>
              </ol>
            </nav>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-700">
              Jobs management
            </h1>
          </div>
          <div className="block lg:flex items-center">
            <form className="lg:pr-3 mb-4 lg:mb-0 sm:flex gap-4">
              <div className="mt-1 relative w-full sm:w-[60%] lg:w-80 ">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                  Search:
                </label>
                <input
                  type="text"
                  name="category"
                  className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700"
                  placeholder="Search for title..."
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div className="mt-1 w-full sm:w-[40%] lg:w-60">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                  Select category:
                </label>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700"
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value={""}>All category</option>

                  {categories.map((category, i) => (
                    <option value={category.id} key={i}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </form>
            <div className="flex items-center lg:justify-end w-full">
              <button
                type="button"
                className="text-white bg-purple-500 hover:bg-purple-600 focus:ring-4 focus:ring-purple-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center lg:ml-auto"
                onClick={() => setShowBoxAdd(true)}
              >
                <AiOutlinePlus className="text-lg mr-2" />
                Add jobs
              </button>
            </div>
          </div>
        </div>
      </div>

      <TablePage title={title} categoryId={categoryId} />

      {showBoxAdd && localStorage.getItem("adminToken") && (
        <AddJob setShowBoxAdd={setShowBoxAdd} />
      )}
    </section>
  );
};
export default JobsPageAdmin;
