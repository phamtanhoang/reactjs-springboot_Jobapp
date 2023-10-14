import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { GrFormNext } from "react-icons/gr";
import { Link } from "react-router-dom";
import { AddCategory, TablePage } from "./components";

const CategoriesPageAdmin = () => {
  const [showBoxAddCategory, setShowBoxAddCategory] = useState(false);
  const [title, setTitle] = useState("");

  return (
    <section className="flex-grow">
      <div className="p-6 px-3 lg:px-6 block sm:flex items-center justify-between">
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
                    to="/admin/categories"
                    className="text-gray-600 hover:text-purple-600"
                  >
                    Categories
                  </Link>
                </li>
              </ol>
            </nav>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-700">
              Category management
            </h1>
          </div>
          <div className="block sm:flex items-center">
            <form className="sm:pr-3 mb-4 sm:mb-0">
              <label className="sr-only">Search</label>
              <div className="mt-1 relative sm:w-64 xl:w-96">
                <input
                  type="text"
                  name="category"
                  className="bg-gray-50 border border-gray-300 text-gray-700 sm:text-sm rounded-lg block w-full p-2.5 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700"
                  placeholder="Search for category name"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
            </form>
            <div className="flex items-center sm:justify-end w-full">
              <button
                type="button"
                className="text-white bg-purple-500 hover:bg-purple-600 focus:ring-4 focus:ring-purple-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center sm:ml-auto"
                onClick={() => setShowBoxAddCategory(true)}
              >
                <AiOutlinePlus className="text-lg mr-2" />
                Add category
              </button>
            </div>
          </div>
        </div>
      </div>
      <TablePage title={title} />
      {showBoxAddCategory && localStorage.getItem("adminToken") && (
        <AddCategory setShowBoxAddCategory={setShowBoxAddCategory} />
      )}
    </section>
  );
};
export default CategoriesPageAdmin;
