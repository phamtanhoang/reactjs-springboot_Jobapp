import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {
  AppliedForJobs,
  BlogDetailPage,
  BlogsPage,
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
  BlogDetailEmployer,
  BlogsPageEmployer,
  HomePageEmployer,
  JobDetailPageEmployer,
  JobsPageEmployer,
  Layout,
  LoginEmployer,
  ProfilePageEmployer,
  RegisterEmployer,
  VipHistoryEmployer,
  VipsPageEmployer,
} from "./layouts/Employer";
import {
  ApplicationsPageAdmin,
  CandidatesPageAdmin,
  CategoriesPageAdmin,
  DashboardPage,
  EmployersPageAdmin,
  JobsPageAdmin,
  LayoutAdmin,
  LoginPageAdmin,
  VipsPageAdmin,
} from "./layouts/Admin";
import BlogsPageAdmin from "./layouts/Admin/BlogsPageAdmin";
import BlogDetailAdmin from "./layouts/Admin/BlogDetailAdmin";

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
            <Route path="/home/blogs" element={<BlogsPage />} />
            <Route path="/home/blog/:id" element={<BlogDetailPage />} />
            {candidateToken ? (
              <>
                <Route path="/home/login" element={<Navigate to="/home" />} />
                <Route
                  path="/home/register"
                  element={<Navigate to="/home" />}
                />
                <Route path="/home/profile" element={<ProfilePage />} />
                <Route
                  path="/home/appliedforjobs"
                  element={<AppliedForJobs />}
                />
              </>
            ) : (
              <>
                <Route path="/home/login" element={<LoginPage />} />
                <Route path="/home/register" element={<RegisterPage />} />
                <Route
                  path="/home/appliedforjobs"
                  element={<Navigate to="/home/login" />}
                />
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
                <Route path="/employer/vips" element={<VipsPageEmployer />} />
                <Route
                  path="/employer/vipHistories"
                  element={<VipHistoryEmployer />}
                />
                <Route path="/employer/blogs" element={<BlogsPageEmployer />} />
                <Route
                  path="/employer/blog/:id"
                  element={<BlogDetailEmployer />}
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
              <Route
                path="/employer/vips"
                element={<Navigate to="/employer/login" />}
              />
              <Route
                path="/employer/vipHistories"
                element={<Navigate to="/employer/login" />}
              />
              <Route
                path="/employer/blogs"
                element={<Navigate to="/employer/login" />}
              />
              <Route
                path="/employer/blog/:id"
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
                <Route
                  path="/admin/employers"
                  element={<EmployersPageAdmin />}
                />
                <Route
                  path="/admin/candidates"
                  element={<CandidatesPageAdmin />}
                />
                <Route
                  path="/admin/applications"
                  element={<ApplicationsPageAdmin />}
                />
                <Route
                  path="/admin/candidates"
                  element={<CandidatesPageAdmin />}
                />
                <Route path="/admin/vips" element={<VipsPageAdmin />} />
                <Route path="/admin/blogs" element={<BlogsPageAdmin />} />
                <Route path="/admin/blog/:id" element={<BlogDetailAdmin />} />
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
              <Route
                path="/admin/employers"
                element={<Navigate to="/admin/login" />}
              />
              <Route
                path="/admin/candidates"
                element={<Navigate to="/admin/login" />}
              />
              <Route
                path="/admin/applications"
                element={<Navigate to="/admin/login" />}
              />
              <Route
                path="/admin/vips"
                element={<Navigate to="/admin/login" />}
              />
              <Route
                path="/admin/blogs"
                element={<Navigate to="/admin/login" />}
              />
              <Route
                path="/admin/blog/:id"
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
