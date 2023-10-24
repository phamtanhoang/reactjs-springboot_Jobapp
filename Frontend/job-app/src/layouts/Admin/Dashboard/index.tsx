import { PendingEmployers, PendingJobs, Statistic } from "./components";

const DashboardPage = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-6 gap-4 pb-0">
        <div className="md:col-span-2 xl:col-span-3">
          <h3 className="text-2xl font-bold">Welcome back, ADMIN!!!</h3>
        </div>
      </div>

      <Statistic />

      <div className="grid grid-cols-1 lg:grid-cols-2 p-6 gap-4">
        <PendingJobs />
        <PendingEmployers />
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-4 gap-6 text-black ">
        <div className="md:col-span-2 xl:col-span-3">
          <h3 className="text-lg font-semibold">
            Task summaries of recent sprints
          </h3>
        </div>
        <div className="md:col-span-2 xl:col-span-1">
          <div className="rounded bg-gray-200 p-3">
            <div className="flex justify-between py-1 text-black ">
              <h3 className="text-sm font-semibold">Tasks in TO DO</h3>
              <svg
                className="h-4 fill-current text-gray-600  cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" />
              </svg>
            </div>
            <div className="text-sm text-black  mt-2">
              <div className="bg-white  hover:bg-gray-50  p-2 rounded mt-1 border-b border-gray-100 cursor-pointer">
                Delete all references from the wiki
              </div>
              <div className="bg-white hover:bg-gray-50 p-2 rounded mt-1 border-b border-gray-100 cursor-pointer">
                Remove analytics code
              </div>
              <div className="bg-white hover:bg-gray-50 p-2 rounded mt-1 border-b border-gray-100 cursor-pointer">
                Do a mobile first layout
                <div className="text-gray-500  mt-2 ml-2 flex justify-between items-start">
                  <span className="text-xs flex items-center">
                    <svg
                      className="h-4 fill-current mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 50 50"
                    >
                      <path d="M11 4c-3.855 0-7 3.145-7 7v28c0 3.855 3.145 7 7 7h28c3.855 0 7-3.145 7-7V11c0-3.855-3.145-7-7-7zm0 2h28c2.773 0 5 2.227 5 5v28c0 2.773-2.227 5-5 5H11c-2.773 0-5-2.227-5-5V11c0-2.773 2.227-5 5-5zm25.234 9.832l-13.32 15.723-8.133-7.586-1.363 1.465 9.664 9.015 14.684-17.324z" />
                    </svg>
                    3/5
                  </span>
                  <img
                    src="https://i.imgur.com/OZaT7jl.png"
                    className="rounded-full"
                  />
                </div>
              </div>
              <div className="bg-white  hover:bg-gray-50 p-2 rounded mt-1 border-b border-gray-100 cursor-pointer">
                Check the meta tags
              </div>
              <div className="bg-white hover:bg-gray-50 p-2 rounded mt-1 border-b border-gray-100 cursor-pointer">
                Think more tasks for this example
                <div className="text-gray-500  mt-2 ml-2 flex justify-between items-start">
                  <span className="text-xs flex items-center">
                    <svg
                      className="h-4 fill-current mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 50 50"
                    >
                      <path d="M11 4c-3.855 0-7 3.145-7 7v28c0 3.855 3.145 7 7 7h28c3.855 0 7-3.145 7-7V11c0-3.855-3.145-7-7-7zm0 2h28c2.773 0 5 2.227 5 5v28c0 2.773-2.227 5-5 5H11c-2.773 0-5-2.227-5-5V11c0-2.773 2.227-5 5-5zm25.234 9.832l-13.32 15.723-8.133-7.586-1.363 1.465 9.664 9.015 14.684-17.324z" />
                    </svg>
                    0/3
                  </span>
                </div>
              </div>
              <p className="mt-3 text-gray-600 ">Add a card...</p>
            </div>
          </div>
        </div>
        <div>
          <div className="rounded bg-gray-200  p-3">
            <div className="flex justify-between py-1 text-black ">
              <h3 className="text-sm font-semibold">Tasks in DEVELOPMENT</h3>
              <svg
                className="h-4 fill-current text-gray-600  cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" />
              </svg>
            </div>
            <div className="text-sm text-black  mt-2">
              <div className="bg-white  hover:bg-gray-50  p-2 rounded mt-1 border-b border-gray-100 da cursor-pointer">
                Delete all references from the wiki
              </div>
              <div className="bg-white  hover:bg-gray-50  p-2 rounded mt-1 border-b border-gray-100  cursor-pointer">
                Remove analytics code
              </div>
              <div className="bg-white  hover:bg-gray-50  p-2 rounded mt-1 border-b border-gray-100  cursor-pointer">
                Do a mobile first layout
                <div className="flex justify-between items-start mt-2 ml-2 text-white text-xs">
                  <span className="bg-pink-600 rounded p-1 text-xs flex items-center">
                    <svg
                      className="h-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2c-.8 0-1.5.7-1.5 1.5v.688C7.344 4.87 5 7.62 5 11v4.5l-2 2.313V19h18v-1.188L19 15.5V11c0-3.379-2.344-6.129-5.5-6.813V3.5c0-.8-.7-1.5-1.5-1.5zm-2 18c0 1.102.898 2 2 2 1.102 0 2-.898 2-2z" />
                    </svg>
                    2
                  </span>
                </div>
              </div>
              <div className="bg-white  hover:bg-gray-50  p-2 rounded mt-1 border-b border-gray-100 cursor-pointer">
                Check the meta tags
              </div>
              <div className="bg-white  hover:bg-gray-50 p-2 rounded mt-1 border-b border-gray-100 cursor-pointer">
                Think more tasks for this example
                <div className="text-gray-500 mt-2 ml-2 flex justify-between items-start">
                  <span className="text-xs flex items-center">
                    <svg
                      className="h-4 fill-current mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 50 50"
                    >
                      <path d="M11 4c-3.855 0-7 3.145-7 7v28c0 3.855 3.145 7 7 7h28c3.855 0 7-3.145 7-7V11c0-3.855-3.145-7-7-7zm0 2h28c2.773 0 5 2.227 5 5v28c0 2.773-2.227 5-5 5H11c-2.773 0-5-2.227-5-5V11c0-2.773 2.227-5 5-5zm25.234 9.832l-13.32 15.723-8.133-7.586-1.363 1.465 9.664 9.015 14.684-17.324z" />
                    </svg>
                    0/3
                  </span>
                </div>
              </div>
              <p className="mt-3 text-gray-600 ">Add a card...</p>
            </div>
          </div>
        </div>
        <div>
          <div className="rounded bg-gray-200 p-3">
            <div className="flex justify-between py-1 text-black">
              <h3 className="text-sm font-semibold">Tasks in QA</h3>
              <svg
                className="h-4 fill-current text-gray-600 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" />
              </svg>
            </div>
            <div className="text-sm text-black mt-2">
              <div className="bg-white hover:bg-gray-50 p-2 rounded mt-1 border-b border-gray-100 cursor-pointer">
                Delete all references from the wiki
              </div>
              <div className="bg-white hover:bg-gray-50 p-2 rounded mt-1 border-b border-gray-100 cursor-pointer">
                Remove analytics code
              </div>
              <div className="bg-white hover:bg-gray-50 p-2 rounded mt-1 border-b border-gray-100 cursor-pointer">
                Do a mobile first layout
              </div>
              <div className="bg-white hover:bg-gray-50 p-2 rounded mt-1 border-b border-gray-100 cursor-pointer">
                Check the meta tags
              </div>
              <div className="bg-white hover:bg-gray-50 p-2 rounded mt-1 border-b border-gray-100 cursor-pointer">
                Think more tasks for this example
                <div className="text-gray-500 mt-2 ml-2 flex justify-between items-start">
                  <span className="text-xs flex items-center">
                    <svg
                      className="h-4 fill-current mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 50 50"
                    >
                      <path d="M11 4c-3.855 0-7 3.145-7 7v28c0 3.855 3.145 7 7 7h28c3.855 0 7-3.145 7-7V11c0-3.855-3.145-7-7-7zm0 2h28c2.773 0 5 2.227 5 5v28c0 2.773-2.227 5-5 5H11c-2.773 0-5-2.227-5-5V11c0-2.773 2.227-5 5-5zm25.234 9.832l-13.32 15.723-8.133-7.586-1.363 1.465 9.664 9.015 14.684-17.324z" />
                    </svg>
                    0/3
                  </span>
                </div>
              </div>
              <p className="mt-3 text-gray-6000">Add a card...</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 mx-6">
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                <tr className="bg-gray-50 hover:bg-gray-100  text-gray-700 ">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p className="font-semibold">Hans Burger</p>
                        <p className="text-xs text-gray-600 ">10x Developer</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">$855.85</td>
                  <td className="px-4 py-3 text-xs">
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
                      {" "}
                      Approved{" "}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">15-01-2021</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100  text-gray-700 ">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;facepad=3&amp;fit=facearea&amp;s=707b9c33066bf8808c934c8ab394dff6"
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p className="font-semibold">Jolina Angelie</p>
                        <p className="text-xs text-gray-600">Unemployed</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">$369.75</td>
                  <td className="px-4 py-3 text-xs">
                    <span className="px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full">
                      {" "}
                      Pending{" "}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">23-03-2021</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100 text-gray-700">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://images.unsplash.com/photo-1502720705749-871143f0e671?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;s=b8377ca9f985d80264279f277f3a67f5"
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p className="font-semibold">Dave Li</p>
                        <p className="text-xs text-gray-600 ">Influencer</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">$775.45</td>
                  <td className="px-4 py-3 text-xs">
                    <span className="px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full ">
                      {" "}
                      Expired{" "}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">09-02-2021</td>
                </tr>
                <tr className="bg-gray-50  hover:bg-gray-100  text-gray-700">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://images.unsplash.com/photo-1551006917-3b4c078c47c9?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p className="font-semibold">Rulia Joberts</p>
                        <p className="text-xs text-gray-600">Actress</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">$1276.75</td>
                  <td className="px-4 py-3 text-xs">
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full ">
                      {" "}
                      Approved{" "}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">17-04-2021</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100 text-gray-700">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://images.unsplash.com/photo-1566411520896-01e7ca4726af?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p className="font-semibold">Hitney Wouston</p>
                        <p className="text-xs text-gray-600">Singer</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">$863.45</td>
                  <td className="px-4 py-3 text-xs">
                    <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full">
                      {" "}
                      Denied{" "}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">11-01-2021</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t bg-gray-50 sm:grid-cols-9">
            <span className="flex items-center col-span-3">
              {" "}
              Showing 21-30 of 100{" "}
            </span>
            <span className="col-span-2"></span>
            <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
              <nav aria-label="Table navigation">
                <ul className="inline-flex items-center">
                  <li>
                    <button
                      className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                      aria-label="Previous"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </li>
                  <li>
                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      1
                    </button>
                  </li>
                  <li>
                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      2
                    </button>
                  </li>
                  <li>
                    <button className="px-3 py-1 text-white  transition-colors duration-150 bg-blue-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple">
                      3
                    </button>
                  </li>
                  <li>
                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      4
                    </button>
                  </li>
                  <li>
                    <span className="px-3 py-1">...</span>
                  </li>
                  <li>
                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      8
                    </button>
                  </li>
                  <li>
                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      9
                    </button>
                  </li>
                  <li>
                    <button
                      className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                      aria-label="Next"
                    >
                      <svg
                        className="w-4 h-4 fill-current"
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </li>
                </ul>
              </nav>
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 mx-6">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6 mr-2 bg-gray-100 sm:rounded-lg">
            <h1 className="text-4xl sm:text-5xl text-gray-800  font-extrabold tracking-tight">
              Get in touch
            </h1>
            <p className="text-normal text-lg sm:text-2xl font-medium text-gray-600  mt-2">
              Fill in the form to submit any query
            </p>

            <div className="flex items-center mt-8 text-gray-600 ">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                className="w-8 h-8 text-gray-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div className="ml-4 text-md tracking-wide font-semibold w-40">
                Dhaka, Street, State, Postal Code
              </div>
            </div>

            <div className="flex items-center mt-4 text-gray-600">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                className="w-8 h-8 text-gray-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <div className="ml-4 text-md tracking-wide font-semibold w-40">
                +880 1234567890
              </div>
            </div>

            <div className="flex items-center mt-4 text-gray-600">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                className="w-8 h-8 text-gray-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <div className="ml-4 text-md tracking-wide font-semibold w-40">
                info@demo.com
              </div>
            </div>
          </div>
          <form className="p-6 flex flex-col justify-center">
            <div className="flex flex-col">
              <label className="hidden">Full Name</label>
              <input
                type="name"
                name="name"
                id="name"
                placeholder="Full Name"
                className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border-gray-400 text-gray-800 font-semibold focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col mt-2">
              <label className="hidden">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border-gray-400 text-gray-800  font-semibold focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col mt-2">
              <label className="hidden">Number</label>
              <input
                type="tel"
                name="tel"
                id="tel"
                placeholder="Telephone Number"
                className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border-gray-400 text-gray-800 font-semibold focus:border-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="md:w-32 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg mt-4 hover:bg-purple-500 transition ease-in-out duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 mx-6">
        <div className="p-4 bg-blue-50 border-blue-500 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold">
            Have taken ideas & reused components from the following resources:
          </h4>
          <ul>
            <li className="mt-3">
              <a
                className="flex items-center text-blue-700"
                href="https://tailwindcomponents.com/component/sidebar-navigation-1"
                target="_blank"
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="transform transition-transform duration-500 ease-in-out"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="inline-flex pl-2">Sidebar Navigation</span>
              </a>
            </li>
            <li className="mt-2">
              <a
                className="flex items-center text-blue-700"
                href="https://tailwindcomponents.com/component/contact-form-1"
                target="_blank"
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="transform transition-transform duration-500 ease-in-out"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="inline-flex pl-2">Contact Form</span>
              </a>
            </li>
            <li className="mt-2">
              <a
                className="flex items-center text-blue-700"
                href="https://tailwindcomponents.com/component/trello-panel-clone"
                target="_blank"
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="transform transition-transform duration-500 ease-in-out"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="inline-flex pl-2">
                  Section: Task Summaries
                </span>
              </a>
            </li>
            <li className="mt-2">
              <a
                className="flex items-center text-blue-700"
                href="https://windmill-dashboard.vercel.app/"
                target="_blank"
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="transform transition-transform duration-500 ease-in-out"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="inline-flex pl-2">Section: Client Table</span>
              </a>
            </li>
            <li className="mt-2">
              <a
                className="flex items-center text-blue-700"
                href="https://demos.creative-tim.com/notus-js/pages/admin/dashboard.html"
                target="_blank"
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="transform transition-transform duration-500 ease-in-out"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="inline-flex pl-2">
                  Section: Social Traffic
                </span>
              </a>
            </li>
            <li className="mt-2">
              <a
                className="flex items-center text-blue-700"
                href="https://mosaic.cruip.com"
                target="_blank"
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="transform transition-transform duration-500 ease-in-out"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="inline-flex pl-2">
                  Section: Recent Activities
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div> */}
    </>
  );
};
export default DashboardPage;
