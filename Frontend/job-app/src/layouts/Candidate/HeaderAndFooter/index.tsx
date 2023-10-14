import { Outlet } from "react-router-dom";
import { Footer, NavBar } from "./components";
import { FavoriteTicket } from "../../../components";

const HeaderAndFooter = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <Outlet />
      <Footer />
      <FavoriteTicket />
    </div>
  );
};
export default HeaderAndFooter;
