import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import NotFound from "../pages/ErrorPage";
import StudentLayout from "../layouts/StudentLayout";
import StudentDashboardHome from "../pages/student/StudentDashboardHome";
import ProfilePage from "../pages/ProfilePage";
import JobListingPage from "../pages/student/JobListingPage";
import JobDetailPage from "../pages/JobDetailPage";
import MyApplicants from "../pages/student/MyApplicants";
import Header from "../components/common/Header";
import { auth, dashboardRoutes } from "./routes";
import CompanyLayout from "../layouts/CompanyLayout";
import CompanyDashboardHome from "../pages/company/CompanyDashboardHome";
import PostJobForm from "../pages/company/PostJobForm";
import CompanyPostedJobs from "../pages/company/CompanyPostedJobs";
import AdminLayout from "../layouts/AdminLayout";
import AdminUsersList from "../pages/admin/AdminUsersList";
import AdminAllJobsPage from "../pages/admin/AdminAllJobsPage";
import AdminAllCompanies from "../pages/admin/AdminAllCompanies";
import AdminDashboardHome from "../pages/admin/AdminDashboardHome";
import ProtectedRoute from "../components/ProtectedRoute";
import UnprotectedRoute from "../components/UnProtectedRoute";
import { useSelector } from "react-redux";
import ForgotPassword from "../pages/auth/ForgotPassword";

const AppRouter = () => {
  const user = useSelector((state) => state.user);
  let role = user?.role;
  return (
    <>
      {!role && <Header />}
      <Routes>
        <Route element={<UnprotectedRoute />}>
          <Route path={auth.LandingPage} element={<LandingPage />} />
          <Route path={auth.login} element={<SignIn />} />
          <Route path={auth.signup} element={<SignUp />} />
          <Route path={auth.forgotPassword} element={<ForgotPassword />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          {role == "student" && (
            <Route
              path={dashboardRoutes.studentDashboardRoutes.root}
              element={<StudentLayout />}
            >
              <Route index element={<StudentDashboardHome />} />
              <Route
                path={dashboardRoutes.profilePage}
                element={<ProfilePage />}
              />
              <Route path={dashboardRoutes.jobs} element={<JobListingPage />} />

              <Route
                path={dashboardRoutes.studentDashboardRoutes.applicants}
                element={<MyApplicants />}
              />
              <Route
                path={`${dashboardRoutes.JobDetailPage}/:id`}
                element={<JobDetailPage />}
              />
              <Route
                path={`${dashboardRoutes.studentDashboardRoutes.root}/${dashboardRoutes.jobs}/${dashboardRoutes.JobDetailPage}/:id`}
                element={<JobDetailPage />}
              />
            </Route>
          )}

          {role == "company" && (
            <Route
              path={dashboardRoutes.companyDashboardRoutes.root}
              element={<CompanyLayout />}
            >
              <Route index element={<CompanyDashboardHome />} />
              <Route
                path={dashboardRoutes.profilePage}
                element={<ProfilePage />}
              />
              <Route
                path={`${dashboardRoutes.companyDashboardRoutes.postedjobs}/job/:id`}
                element={<JobDetailPage />}
              />
              <Route
                path={`${dashboardRoutes.companyDashboardRoutes.postJob}`}
                element={<PostJobForm />}
              />
              <Route
                path={`${dashboardRoutes.companyDashboardRoutes.postedjobs}`}
                element={<CompanyPostedJobs />}
              />
            </Route>
          )}

          {role == "admin" && (
            <Route
              path={dashboardRoutes.adminDashboardRoutes.root}
              element={<AdminLayout />}
            >
              <Route index element={<AdminDashboardHome />} />
              <Route
                path={`students/${dashboardRoutes.profilePage}`}
                element={<ProfilePage />}
              />
              <Route
                path={`companies/${dashboardRoutes.profilePage}`}
                element={<ProfilePage />}
              />
              <Route
                path={dashboardRoutes.profilePage}
                element={<ProfilePage />}
              />
              <Route
                path={
                  dashboardRoutes.adminDashboardRoutes.usersManagement.allusers
                }
                element={<AdminUsersList />}
              />
              <Route
                path={`${dashboardRoutes.adminDashboardRoutes.root}/${dashboardRoutes.jobs}`}
                element={<AdminAllJobsPage />}
              />
              <Route
                path={`${dashboardRoutes.adminDashboardRoutes.root}/${dashboardRoutes.jobs}/${dashboardRoutes.JobDetailPage}/:id`}
                element={<JobDetailPage />}
              />
              <Route
                path={
                  dashboardRoutes.adminDashboardRoutes.companyManagement
                    .allCompanies
                }
                element={<AdminAllCompanies />}
              />
            </Route>
          )}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRouter;
