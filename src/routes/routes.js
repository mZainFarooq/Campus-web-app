export const auth = {
  LandingPage: "/",
  login: "/login",
  signup: "/signup",
  forgotPassword: "/forgot/password",
};

export const dashboardRoutes = {
  profilePage: "profile/:id",
  JobDetailPage: "job",
  jobs: "jobs",
  studentDashboardRoutes: {
    root: "/student/dashboard",
    applicants: "job/applicants",
  },
  companyDashboardRoutes: {
    root: "/company/dashboard",
    postJob: "job/post",
    postedjobs: "jobs/posted",
    applicants: "job/applicants",
  },
  adminDashboardRoutes: {
    root: "/admin/dashboard",
    usersManagement: {
      allusers: "students",
    },
    companyManagement: {
      allCompanies: "companies",
    },
  },
};

export const ADMIN_UID = "g873PGyomzU0UInunB3mbaoKamY2";
