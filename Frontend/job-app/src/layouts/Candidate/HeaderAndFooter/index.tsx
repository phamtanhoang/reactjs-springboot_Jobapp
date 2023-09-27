import { Outlet } from "react-router-dom";
import { Footer, NavBar } from "./components";


export const HeaderAndFooter = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};
