import { HomePage } from "./layouts/HomePage/HomePage";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { Layout } from "./layouts/HeaderAndFooter/Layout";
import { JobsPage } from "./layouts/JobsPage/JobsPage";
import { JobProfilePage } from "./layouts/JobProfilePage/JobProfilePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="" element={<Layout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/job" element={<JobProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
