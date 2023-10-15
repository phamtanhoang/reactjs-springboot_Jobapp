import { BiLogOut } from "react-icons/bi";
import Swal from "sweetalert2";

const HeaderAdmin = () => {
  const LogoutHandle = () => {
    Swal.fire({
      title: "Do you want to log out??",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("adminToken");
        window.location.reload();
      }
    });
  };
  return (
    <header className="fixed top-0 bg-white shadow-md flex items-center justify-between py-0 z-10 w-full">
      <div className="flex items-center justify-start md:justify-center md:pl-0 pl-3 w-14 md:w-64 h-14 bg-purple-500">
        <img
          className="w-7 h-7 md:w-10 md:h-10 mr-2 rounded-full overflow-hidden "
          src="https://res.cloudinary.com/dcpatkvcu/image/upload/v1696784020/DoAnNganh/Host_And_Admin_Marketing_Job_Vacancies_Vector_Recruitment_Open_Job_Office_Girls_PNG_and_Vector_with_Transparent_Background_for_Free_Download_unyj7i.jpg"
        />
        <span className="hidden md:block font-semibold text-xl text-white">
          ADMIN
        </span>
      </div>

      <div className="flex justify-between items-center h-14 header-right">
        <a
          href="#"
          className="flex items-center mr-5 hover:text-purple-600 "
          onClick={LogoutHandle}
        >
          <BiLogOut className="text-lg mr-1" />
          Logout
        </a>
      </div>
    </header>
  );
};
export default HeaderAdmin;
