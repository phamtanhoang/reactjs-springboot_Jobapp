import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer";
import { NavBar } from "./components/Navbar";

export const Layout = () => (
  <>
    <NavBar />
    <Outlet />
    <Footer />
  </>
);
