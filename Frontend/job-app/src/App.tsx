import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { HeaderAndFooter } from "./layouts/Candidate/HeaderAndFooter";
import { HomePage } from "./layouts/Candidate/HomePage";
import { JobsPage } from "./layouts/Candidate/JobsPage";
import { JobProfilePage } from "./layouts/Candidate/JobDetailPage";
import { EmployersPage } from "./layouts/Candidate/EmployersPage";
import { EmployerProfilePage } from "./layouts/Candidate/EmployerProfilePage";
import { Login } from "./layouts/Candidate/Login";
import { Register } from "./layouts/Candidate/Register";
import { Layout } from "./layouts/Employer/Layout";
import { HomePageEmployer } from "./layouts/Employer/HomePageEmployer";
import { LoginEmployer } from "./layouts/Employer/Login";
import { RegisterEmployer } from "./layouts/Employer/Register";

function App() {
  const candidateToken = localStorage.getItem("candidateToken");
  const employerToken = localStorage.getItem("employerToken");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="" element={<HeaderAndFooter />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/home/jobs" element={<JobsPage />} />
            <Route path="/home/job/:id" element={<JobProfilePage />} />
            <Route path="/home/employers" element={<EmployersPage />} />
            <Route
              path="/home/employer/:id"
              element={<EmployerProfilePage />}
            />
            {candidateToken ? (
              <>
                <Route path="/home/login" element={<Navigate to="/home" />} />
                <Route
                  path="/home/register"
                  element={<Navigate to="/home" />}
                />
              </>
            ) : (
              <>
                <Route path="/home/login" element={<Login />} />
                <Route path="/home/register" element={<Register />} />
              </>
            )}
          </Route>
          {employerToken ? (
            <>
              <Route
                path="/employer"
                element={<Navigate to="/employer/home" />}
              />
              <Route
                path="/employer/login"
                element={<Navigate to="/employer/home" />}
              />
              <Route
                path="/employer/register"
                element={<Navigate to="/employer/home" />}
              />
              <Route path="/" element={<Layout />}>
                <Route path="/employer/home" element={<HomePageEmployer />} />
              </Route>
            </>
          ) : (
            <>
              <Route
                path="/employer"
                element={<Navigate to="/employer/login" />}
              />
              <Route
                path="/employer/home"
                element={<Navigate to="/employer/login" />}
              />
              <Route path="/employer/login" element={<LoginEmployer />} />
              <Route path="/employer/register" element={<RegisterEmployer />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
