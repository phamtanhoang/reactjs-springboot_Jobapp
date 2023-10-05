import { Outlet } from "react-router-dom";
import { Footer, Header, NavBar } from "./components";
import { useState } from "react";

export const Layout = () => {
  const [isNavBarVisible, setIsNavBarVisible] = useState(false);

  return (
    <>
      <NavBar isNavBarVisible={isNavBarVisible} />
      <div className="w-full bg-white pl-0 lg:pl-64  relative">
        <Header
          isNavBarVisible={isNavBarVisible}
          setIsNavBarVisible={setIsNavBarVisible}
        />
        <div className="h-screen">
          <Outlet />
        </div>

        <Footer />
      </div>
    </>
  );
};
