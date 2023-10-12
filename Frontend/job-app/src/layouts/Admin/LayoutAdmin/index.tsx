import { Outlet } from "react-router-dom";
import { HeaderAdmin, NavBarAdmin } from "./components";

const LayoutAdmin = () => {
  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased  text-black ">
      <HeaderAdmin />
      <NavBarAdmin />
      <div className="h-full ml-14 mb-10 md:ml-64">
        <Outlet />
      </div>
    </div>
  );
};
export default LayoutAdmin;
