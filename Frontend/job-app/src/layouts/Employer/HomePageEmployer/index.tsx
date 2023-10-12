import { Link } from "react-router-dom";

const HomePageEmployer = () => {
  return (
    <>
      <div className="p-6 bg-gray-100 mb-20">
        <div>
          <nav aria-label="Breadcrumb" className="text-sm font-semibold mb-6">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <Link
                  to="/employer"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Home
                </Link>
              </li>
            </ol>
          </nav>
          <div className="lg:flex justify-between items-center mb-6">
            <p className="text-2xl font-semibold mb-2 lg:mb-0">
              Greetings, Employer!
            </p>
          </div>
          <div className="flex flex-wrap -mx-3 mb-20">
            <div className="w-1/2 xl:w-1/4 px-3">
              <div className="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0">
                <div className="text-gray-700">
                  <p className="font-semibold text-3xl">237</p>
                  <p>Products Sold</p>
                </div>
              </div>
            </div>
            <div className="w-1/2 xl:w-1/4 px-3">
              <div className="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0">
                <div className="text-gray-700">
                  <p className="font-semibold text-3xl">177</p>
                  <p>Product Reviews</p>
                </div>
              </div>
            </div>
            <div className="w-1/2 xl:w-1/4 px-3">
              <div className="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6">
                <div className="text-gray-700">
                  <p className="font-semibold text-3xl">31</p>
                  <p>New Enquiries</p>
                </div>
              </div>
            </div>
            <div className="w-1/2 xl:w-1/4 px-3">
              <div className="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6">
                <div className="text-gray-700">
                  <p className="font-semibold text-3xl">1,653</p>
                  <p>Product Views</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3">
            <div className="w-full xl:w-1/3 px-3">
              <p className="text-xl font-semibold mb-4">Recent Sales</p>
              <div className="w-full bg-white border rounded-lg p-4 mb-8 xl:mb-0">
                <div className="chartjs-size-monitor">
                  <div className="chartjs-size-monitor-expand">
                    <div className=""></div>
                  </div>
                  <div className="chartjs-size-monitor-shrink">
                    <div className=""></div>
                  </div>
                </div>
                <canvas
                  id="buyers-chart"
                  width="447"
                  height="297"
                  className="chartjs-render-monitor"
                ></canvas>
              </div>
            </div>
            <div className="w-full xl:w-1/3 px-3">
              <p className="text-xl font-semibold mb-4">Recent Reviews</p>
              <div className="w-full bg-white border rounded-lg p-4 mb-8 xl:mb-0">
                <div className="chartjs-size-monitor">
                  <div className="chartjs-size-monitor-expand">
                    <div className=""></div>
                  </div>
                  <div className="chartjs-size-monitor-shrink">
                    <div className=""></div>
                  </div>
                </div>
                <canvas
                  id="reviews-chart"
                  width="447"
                  height="297"
                  className="chartjs-render-monitor"
                ></canvas>
              </div>
            </div>
            <div className="w-full xl:w-1/3 px-3">
              <p className="text-xl font-semibold mb-4">Recent Transactions</p>
              <div className="w-full bg-white border rounded-lg p-4">
                <div className="w-full bg-gray-100 border rounded-lg flex justify-between items-center px-4 py-2 mb-4">
                  <div>
                    <p className="font-semibold text-xl">Trent Murphy</p>
                    <p>Product 1</p>
                  </div>
                  <span className="text-green-500 font-semibold text-lg">
                    $25.00
                  </span>
                </div>
                <div className="w-full bg-gray-100 border rounded-lg flex justify-between items-center px-4 py-2 mb-4">
                  <div>
                    <p className="font-semibold text-xl">Joseph Brent</p>
                    <p>Product 34</p>
                  </div>
                  <span className="text-red-500 font-semibold text-lg">
                    $74.99
                  </span>
                </div>
                <div className="w-full bg-gray-100 border rounded-lg flex justify-between items-center px-4 py-2 mb-4">
                  <div>
                    <p className="font-semibold text-xl">Jacob Bator</p>
                    <p>Product 23</p>
                  </div>
                  <span className="text-green-500 font-semibold text-lg">
                    $14.95
                  </span>
                </div>
                <div className="w-full bg-gray-100 border rounded-lg flex justify-between items-center px-4 py-2">
                  <div>
                    <p className="font-semibold text-xl">Alex Mason</p>
                    <p>Product 66</p>
                  </div>
                  <span className="text-green-500 font-semibold text-lg">
                    $44.99
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePageEmployer;
