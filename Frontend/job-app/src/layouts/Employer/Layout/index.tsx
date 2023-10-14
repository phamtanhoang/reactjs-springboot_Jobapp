import { Outlet } from "react-router-dom";
import { Header, NavBar } from "./components";
import { useState } from "react";

const Layout = () => {
  const [isNavBarVisible, setIsNavBarVisible] = useState(false);

  return (
    <>
      <NavBar isNavBarVisible={isNavBarVisible} />
      <div className="w-full pl-0 lg:pl-64 relative">
        <Header
          isNavBarVisible={isNavBarVisible}
          setIsNavBarVisible={setIsNavBarVisible}
        />

        <Outlet />
      </div>
    </>
  );
};
export default Layout;
