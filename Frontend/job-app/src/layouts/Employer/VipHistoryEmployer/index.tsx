import { GrFormNext } from "react-icons/gr";
import { Link } from "react-router-dom";
import { TablePage } from "./components";

const VipHitoryEmployer = () => {
  return (
    <section className="flex-grow">
      <div className="p-3 md:p-6 block sm:flex items-center justify-between">
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
                    to="/employer/viphistories"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Vip Histories
                  </Link>
                </li>
              </ol>
            </nav>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Vip Histories
            </h1>
          </div>
        </div>
      </div>

      <TablePage />
    </section>
  );
};
export default VipHitoryEmployer;
