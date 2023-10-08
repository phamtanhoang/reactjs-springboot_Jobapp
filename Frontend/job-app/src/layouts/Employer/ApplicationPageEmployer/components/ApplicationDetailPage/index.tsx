/* eslint-disable @typescript-eslint/no-explicit-any */

import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

const ApplicationDetailPage: React.FC<{
  setShowBoxApplicationDetail: any;
}> = (props) => {
  // useEffect(() => {
  //   const fetchCategories = () => {
  //     categoriesAPI
  //       .getCategories()
  //       .then((res) => {
  //         setCategories(res.data._embedded.categories);
  //         if (res.data._embedded.categories.length > 0) {
  //           setCate(res.data._embedded.categories[0].id);
  //         } else {
  //           setCate("");
  //         }
  //       })
  //       .catch((error: any) => {
  //         setHttpError(error.message);
  //       })
  //       .finally(() => {
  //         setIsLoading(false);
  //       });
  //   };
  //   fetchCategories();
  // }, []);

  // if (isLoading) {
  //   return (
  //     <div className="flex-grow">
  //       <Spinner />
  //     </div>
  //   );
  // }

  // if (httpError) {
  //   return (
  //     <div className="flex-grow w-5/6 sm:w-3/4 mx-auto my-10">
  //       <ErrorBox text={httpError} />
  //     </div>
  //   );
  // }

  // const handleDescriptionChange = (content: string) => {
  //   setDescription(content);
  // };

  // const closedBox = () => {
  //   setTitle("");
  //   setToDate("");
  //   setCate(categories[0].id);
  //   setSalary("");
  //   setAddress("");
  //   setDescription("");
  //   props.setShowBoxAddJob(false);
  // };

  // const handleAddJob = (e: any) => {
  //   e.preventDefault();
  //   if (title && salary && address && description && toDate && cate) {
  //     Swal.fire({
  //       title: "Do you want to add?",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         jobsAPI
  //           .addJobByEmployerToken(
  //             title,
  //             toDate,
  //             cate,
  //             salary,
  //             address,
  //             description,
  //             localStorage.getItem("employerToken") || ""
  //           )
  //           .then(() => {
  //             Swal.fire({
  //               title: "Add new job success",
  //               icon: "success",
  //               confirmButtonColor: "#3085d6",
  //               confirmButtonText: "Yes",
  //             }).then((result) => {
  //               if (result.isConfirmed) {
  //                 window.location.reload();
  //               }
  //             });
  //           })
  //           .catch(() => {
  //             Swal.fire("Error!", "Add new job error!", "error");
  //           });
  //       }
  //     });
  //   } else {
  //     Swal.fire("Error!", "Please enter complete information!", "error");
  //   }
  // };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow relative w-[90%] sm:w-[70%] md:w-[60%] lg:w-[53%] xl:w-[45%]">
        <div className="flex items-start justify-between p-2 sm:p-5 pl-5 border-b rounded-t">
          <h3 className="text-lg sm:text-xl font-semibold">
            Candidate application for{" "}
            <Link
              to={"/employer/job/2"}
              className="uppercase text-gray-600 hover:text-blue-600"
            >
              frontend developer
            </Link>
          </h3>
          <button
            type="button"
            className="text-xl text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center"
            onClick={() => props.setShowBoxApplicationDetail(false)}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="rounded-lg py-3 overflow-y-auto max-h-[calc(100vh-180px)]">
          <div className="pb-2 px-5 text-xs sm:text-sm">
            <div className="min-[450px]:flex gap-5 mt-2">
              <label className="block min-[450px]:w-[60%] mb-5">
                <span className="font-semibold">Candidate Name: </span>
                <p className="mt-2">Phạm Tấn Hoàng</p>
              </label>

              <label className="block min-[450px]:w-[40%] mb-5">
                <span className="font-semibold">Apply Date: </span>
                <p className="mt-2">03/02/2002</p>
              </label>
            </div>

            <div className="min-[450px]:flex gap-5 ">
              <label className="block  min-[450px]:w-[60%] mb-5">
                <span className="font-semibold">Email: </span>
                <p className="mt-2">phamtanhoang3202@gmail.com</p>
              </label>

              <label className="block min-[450px]:w-[40%] mb-5">
                <span className="font-semibold">Phone Number: </span>
                <p className="mt-2">0362400302</p>
              </label>
            </div>

            <label className="block mb-5">
              <span className="font-semibold">Thư giới thiệu:</span>
            </label>
            <label className="block mb-5">
              <span className="font-semibold">CV: </span>
              <a
                href="../../../../../assets/cv/f06fd6d3-b7ad-4477-af8a-1e483201993b.pdf"
                download
                className="hover:text-blue-600"
              >
                Xem chi tiết
              </a>
            </label>

            <div className="mb-3 flex gap-5 justify-end">
              <button className="bg-red-500 text-white px-4 py-2 mt-4 rounded">
                Refused
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded">
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ApplicationDetailPage;
