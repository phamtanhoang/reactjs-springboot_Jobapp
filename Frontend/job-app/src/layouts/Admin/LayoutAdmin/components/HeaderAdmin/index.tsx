import { BiLogOut } from "react-icons/bi";

const HeaderAdmin = () => {
  return (
    <header className="header sticky top-0 bg-white shadow-md flex items-center justify-between py-0 z-10">
      <div className="flex items-center justify-start md:justify-center md:pl-0 pl-3 w-14 md:w-64 h-14 ">
        <img
          className="w-7 h-7 md:w-10 md:h-10 mr-2 rounded-full overflow-hidden ring-2 ring-purple-600"
          src="https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg"
        />
        <span className="hidden md:block font-semibold text-xl ">ADMIN</span>
      </div>

      <div className="flex justify-between items-center h-14 header-right">
        <a href="#" className="flex items-center mr-5 hover:text-purple-600 ">
          <BiLogOut className="text-lg mr-1" />
          Logout
        </a>
      </div>
    </header>
  );
};
export default HeaderAdmin;
