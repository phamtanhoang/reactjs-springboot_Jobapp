import { Footer } from "./layouts/HeaderAndFooter/Footer";
import { NavBar } from "./layouts/HeaderAndFooter/Navbar";
import { SupportTicket } from "./layouts/Ticket/SupportTicket";
import { HomePage } from "./layouts/HomePage/HomePage";


function App() {
  return (
    <>
      <NavBar />
      <HomePage />
      <SupportTicket />
      <Footer />
    </>
  );
}

export default App;
