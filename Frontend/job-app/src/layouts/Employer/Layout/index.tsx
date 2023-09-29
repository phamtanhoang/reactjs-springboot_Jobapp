import { Outlet } from "react-router-dom";
import { Footer, Header, NavBar } from "./components";
import { useState } from "react";

export const Layout = () => {
  const [isNavBarVisible, setIsNavBarVisible] = useState(false);

  return (
    <>
      <NavBar isNavBarVisible={isNavBarVisible} />
      <div
        className="w-full bg-gray-100 pl-0 lg:pl-64 min-h-screen" 
      >
        <Header
          isNavBarVisible={isNavBarVisible}
          setIsNavBarVisible={setIsNavBarVisible}
        />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};
