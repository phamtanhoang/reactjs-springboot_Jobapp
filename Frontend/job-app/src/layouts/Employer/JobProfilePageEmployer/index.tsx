import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { GrFormNext } from "react-icons/gr";
import { EditJobPage } from "../JobsPageEmployer/components";
import { JobModel } from "../../../models/JobModel";
import { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const JobProfilePageEmployer = () => {
  const [editJob, setEditJob] = useState<JobModel>();
  const [showBoxEditJob, setShowBoxEditJob] = useState(false);

  const EditJob = () => {
    setShowBoxEditJob(true);
  };

  const DeleteJob = (job?: JobModel) => {
    Swal.fire({
      title: "Do you want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        // candidatesAPI
        //   .updateCandidate(firstName, lastName, dateOfBirth, sex, token)
        //   .then(() => {
        //     Swal.fire("Thành công!", "Chỉnh sửa thành công!", "success");
        //     window.location.reload();
        //   })
        //   .catch(() => {
        //     Swal.fire("Thất bại!", "Chỉnh sửa thất bại!", "error");
        //   });
      }
    });
  };

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
                  <GrFormNext className="text-lg mx-2" />
                </li>
                <li className="flex items-center">
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Job Detail
                  </a>
                </li>
              </ol>
            </nav>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Job detail
            </h1>
          </div>
          <div className="flex flex-wrap justify-between mx-auto">
            <div className="w-full md:w-[68%]">
              <div className="job-meta mb-4">
                <span className="text-sm text-gray-500">
                  Posted 10/10/2023 to 20/10/2023
                </span>

                <h1 className="text-3xl font-semibold mt-1 mb-2">
                  Thiết kế đồ họa cho ứng dụng
                </h1>

                <span className="bg-blue-500 text-white py-1 px-3 text-sm mr-3 ml-0 mt-2 inline-block">
                  20 - 25 triệu
                </span>
                <span className="bg-blue-500 text-white py-1 px-3 text-sm mr-3 ml- mt-2 inline-block">
                  Hà Nội
                </span>
                <span className="bg-blue-500 text-white py-1 px-3 text-sm mr-3 ml-0 mt-2 inline-block">
                  Công nghệ thông tin
                </span>
              </div>

              <div className="block md:hidden text-sm mb-4 border-t border-b py-2">
                <h5 className="text-gray-700 mb-3 text-lg">
                  Employer controls
                </h5>
                <div className="mb-2 flex text-base">
                  <p
                    className="border-2 text-blue-500 hover:text-white rounded border-blue-500 hover:bg-blue-500 px-3 py-1 mr-3 flex"
                    onClick={() => EditJob()}
                  >
                    <AiFillEdit className="text-xl mr-2" />
                    <span>Edit job</span>
                  </p>
                  <p
                    className="border-2 text-red-500 hover:text-white rounded border-red-500 hover:bg-red-500 px-3 py-1 flex"
                    onClick={() => DeleteJob()}
                  >
                    <AiFillDelete className="text-xl mr-2" />
                    <span>Delete job</span>
                  </p>
                </div>
              </div>

              <div className="job-description mb-4">
                <h3 className="text-xl">Donec ullampcorper</h3>
                <p className="mb-2">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Natus doloribus qui perspiciatis id eius quaerat assumenda
                  animi. Tempore quae, delectus nam consequuntur soluta velit
                  adipisci voluptatem doloremque unde quos. Ipsa?
                </p>

                <p className="mb-2">
                  Possimus laborum blanditiis iusto consectetur quam omnis,
                  repellendus reprehenderit voluptatum. Voluptas soluta ipsum
                  blanditiis, nesciunt commodi aliquam ea deleniti, natus,
                  quibusdam assumenda quae ex saepe nisi cumque veniam
                  architecto ratione.
                </p>

                <p>
                  Possimus laborum blanditiis iusto consectetur quam omnis,
                  repellendus reprehenderit voluptatum. Voluptas soluta ipsum
                  blanditiis, nesciunt commodi aliquam ea deleniti, natus,
                  quibusdam assumenda quae ex saepe nisi cumque veniam
                  architecto ratione.
                </p>
              </div>
            </div>

            <div className="w-full hidden md:block md:w-[30%]">
              <div className="employer-info mb-5 text-center ">
                <img
                  className="h-40 w-40 inline-block"
                  src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                  alt=""
                />
              </div>

              <div className="text-center text-lg">
                <h5 className="text-gray-700 mb-3">Employer controls</h5>
                <div className="flex text-sm justify-center gap-2">
                  <p
                    className="border-2 text-blue-500 hover:text-white rounded border-blue-500 hover:bg-blue-500 px-2 py-1 flex cursor-pointer"
                    onClick={() => EditJob()}
                  >
                    <AiFillEdit className="text-lg mr-2" />
                    <span>Edit job</span>
                  </p>
                  <p
                    className="border-2 text-red-500 hover:text-white rounded border-red-500 hover:bg-red-500 px-2 py-1 flex cursor-pointer"
                    onClick={() => DeleteJob()}
                  >
                    <AiFillDelete className="text-lg mr-2" />
                    <span>Delete job</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showBoxEditJob && localStorage.getItem("employerToken") && (
        <EditJobPage setShowBoxEditJob={setShowBoxEditJob} job={editJob} />
      )}
    </section>
  );
};
export default JobProfilePageEmployer;
