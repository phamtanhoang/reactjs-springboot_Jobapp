import { Outlet } from "react-router-dom";
import { HeaderAdmin, NavBarAdmin } from "./components";

export const LayoutAdmin = () => {
  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased  text-black ">
      <HeaderAdmin />
      <NavBarAdmin />
      <Outlet />
    </div>
  );
};
