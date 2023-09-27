import { Outlet } from "react-router-dom";
import { Footer, Header, NavBar } from "./components";

export const Layout = () => {
  return (
    <>
      <NavBar />
      <div className="w-full bg-gray-100 pl-0 lg:pl-64 min-h-screen">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};
