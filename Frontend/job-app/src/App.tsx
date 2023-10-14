import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {
  EmployerProfilePage,
  EmployersPage,
  FavoritePage,
  HeaderAndFooter,
  HomePage,
  JobProfilePage,
  JobsPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
} from "./layouts/Candidate";
import {
  ApplicationPageEmployer,
  HomePageEmployer,
  JobDetailPageEmployer,
  JobsPageEmployer,
  Layout,
  LoginEmployer,
  ProfilePageEmployer,
  RegisterEmployer,
} from "./layouts/Employer";
import {
  CategoriesPageAdmin,
  DashboardPage,
  JobsPageAdmin,
  LayoutAdmin,
  LoginPageAdmin,
} from "./layouts/Admin";
import EmployersPageAdmin from "./layouts/Admin/EmployersPageAdmin";

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
                  element={<JobDetailPageEmployer />}
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

          {adminToken ? (
            <>
              <Route path="/admin" element={<Navigate to="/admin/home" />} />
              <Route
                path="/admin/login"
                element={<Navigate to="/admin/home" />}
              />
              <Route path="/" element={<LayoutAdmin />}>
                <Route path="/admin/home" element={<DashboardPage />} />
                <Route
                  path="/admin/categories"
                  element={<CategoriesPageAdmin />}
                />
                <Route path="/admin/jobs" element={<JobsPageAdmin />} />
                <Route path="/admin/employers" element={<EmployersPageAdmin />} />
              </Route>
            </>
          ) : (
            <>
              <Route path="/admin" element={<Navigate to="/admin/login" />} />
              <Route
                path="/admin/home"
                element={<Navigate to="/admin/login" />}
              />
              <Route
                path="/admin/categories"
                element={<Navigate to="/admin/login" />}
              />
              <Route
                path="/admin/jobs"
                element={<Navigate to="/admin/login" />}
              />
              <Route path="/admin/login" element={<LoginPageAdmin />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
