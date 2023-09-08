import { HomePage } from "./layouts/HomePage/HomePage";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { Layout } from "./layouts/HeaderAndFooter/Layout";
import { SearchJobsPage } from "./layouts/SearchJobsPage/SearchJobsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="jobs" element={<SearchJobsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
