import { dashboardRoutes } from "../routes/routes";

const AdminSidebarArr = [
  {
    type: "simple",
    value: "Dashboard",
    link: dashboardRoutes.adminDashboardRoutes.root,
  },
  {
    type: "simple",
    value: "All Students",
    link: dashboardRoutes.adminDashboardRoutes.usersManagement.allusers,
  },
  {
    type: "simple",
    value: "All Companies",
    link: dashboardRoutes.adminDashboardRoutes.companyManagement.allCompanies,
  },
  {
    type: "simple",
    value: "All Jobs",
    link: `${dashboardRoutes.adminDashboardRoutes.root}/${dashboardRoutes.jobs}`,
  },
  {
    type: "simple",
    value: "My Profile",
    link: dashboardRoutes.profilePage,
  },
];

const CompanySidebarArr = [
  {
    type: "simple",
    value: "Dashboard",
    link: dashboardRoutes.companyDashboardRoutes.root,
  },
  {
    type: "simple",
    value: "Post Job",
    link: dashboardRoutes.companyDashboardRoutes.postJob,
  },
  {
    value: "My Posted Jobs",
    link: dashboardRoutes.companyDashboardRoutes.postedjobs,
  },
  {
    type: "simple",
    value: "Admin Profile",
    link: dashboardRoutes.profilePage.replace(
      ":id",
      "RnhFLZHkTKXETk27HKIQwt3f56g2"
    ),
  },
  {
    value: "Company Profile",
    link: dashboardRoutes.profilePage,
  },
];

const StudentSidebarArr = [
  {
    type: "simple",
    value: "Dashboard",
    link: dashboardRoutes.studentDashboardRoutes.root,
  },
  {
    type: "simple",
    value: "Browse Jobs",
    link: `${dashboardRoutes.studentDashboardRoutes.root}/${dashboardRoutes.jobs}`,
  },

  {
    type: "simple",
    value: "My Applications",
    link: `${dashboardRoutes.studentDashboardRoutes.root}/${dashboardRoutes.studentDashboardRoutes.applicants}`,
  },
  {
    type: "simple",
    value: "Admin Profile",
    link: dashboardRoutes.profilePage.replace(
      ":id",
      "RnhFLZHkTKXETk27HKIQwt3f56g2"
    ),
  },
  {
    type: "simple",
    value: "My Profile",
    link: `${dashboardRoutes.studentDashboardRoutes.root}/${dashboardRoutes.profilePage}`,
  },
];

export { StudentSidebarArr, AdminSidebarArr, CompanySidebarArr };
