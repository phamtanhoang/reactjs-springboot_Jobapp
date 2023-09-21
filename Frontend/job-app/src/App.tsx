import { HomePage } from "./layouts/HomePage/HomePage";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { Layout } from "./layouts/HeaderAndFooter/Layout";

import { JobProfilePage } from "./layouts/JobProfilePage/JobProfilePage";
import { EmployersPage } from "./layouts/EmployersPage/EmployersPage";
import { EmployerProfilePage } from "./layouts/EmployerProfilePage/EmployerProfilePage";
import { JobsPage } from "./layouts/JobsPage";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="" element={<Layout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/home/jobs" element={<JobsPage />} />
            <Route path="/home/job/:id" element={<JobProfilePage />} />
            <Route path="/home/employers" element={<EmployersPage />} />
            <Route
              path="/home/employer/:id"
              element={<EmployerProfilePage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
