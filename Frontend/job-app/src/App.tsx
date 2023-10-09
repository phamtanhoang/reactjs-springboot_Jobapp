import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { HeaderAndFooter } from "./layouts/Candidate/HeaderAndFooter";
import { HomePage } from "./layouts/Candidate/HomePage";
import { JobsPage } from "./layouts/Candidate/JobsPage";
import { JobProfilePage } from "./layouts/Candidate/JobDetailPage";
import { EmployersPage } from "./layouts/Candidate/EmployersPage";
import { EmployerProfilePage } from "./layouts/Candidate/EmployerProfilePage";
import { Layout } from "./layouts/Employer/Layout";
import { HomePageEmployer } from "./layouts/Employer/HomePageEmployer";
import { LoginEmployer } from "./layouts/Employer/LoginEmployer";
import { RegisterEmployer } from "./layouts/Employer/RegisterEmployer";
import { FavoritePage } from "./layouts/Candidate/FavoritePage";
import { ProfilePage } from "./layouts/Candidate/ProfilePage";
import { LoginPage } from "./layouts/Candidate/LoginPage";
import { RegisterPage } from "./layouts/Candidate/RegisterPage";
import LoginPageAdmin from "./layouts/Admin/LoginPageAdmin";
import JobsPageEmployer from "./layouts/Employer/JobsPageEmployer";
import JobProfilePageEmployer from "./layouts/Employer/JobProfilePageEmployer";
import ApplicationPageEmployer from "./layouts/Employer/ApplicationPageEmployer";
import ProfilePageEmployer from "./layouts/Employer/ProfilePageEmployer";
import DashboardPage from "./layouts/Admin/Dashboard";

const App = () => {
  const candidateToken = localStorage.getItem("candidateToken");
  const employerToken = localStorage.getItem("employerToken");
  const adminToken = localStorage.getItem("adminToken");
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
            <Route path="/home/favorite" element={<FavoritePage />} />
            {candidateToken ? (
              <>
                <Route path="/home/login" element={<Navigate to="/home" />} />
                <Route
                  path="/home/register"
                  element={<Navigate to="/home" />}
                />
                <Route path="/home/profile" element={<ProfilePage />} />
              </>
            ) : (
              <>
                <Route path="/home/login" element={<LoginPage />} />
                <Route path="/home/register" element={<RegisterPage />} />
                <Route
                  path="/home/profile"
                  element={<Navigate to="/home/login" />}
                />
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
                <Route path="/employer/jobs" element={<JobsPageEmployer />} />
                <Route
                  path="/employer/job/:id"
                  element={<JobProfilePageEmployer />}
                />
                <Route
                  path="/employer/applications"
                  element={<ApplicationPageEmployer />}
                />
                <Route
                  path="/employer/profile"
                  element={<ProfilePageEmployer />}
                />
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
              <Route
                path="/employer/jobs"
                element={<Navigate to="/employer/login" />}
              />
              <Route
                path="/employer/job/:id"
                element={<Navigate to="/employer/login" />}
              />
              <Route
                path="/employer/applications"
                element={<Navigate to="/employer/login" />}
              />
              <Route
                path="/employer/profile"
                element={<Navigate to="/employer/login" />}
              />
              <Route path="/employer/login" element={<LoginEmployer />} />
              <Route path="/employer/register" element={<RegisterEmployer />} />
            </>
          )}

          <Route path="/admin/login" element={<LoginPageAdmin />} />
          <Route path="/admin/home" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
