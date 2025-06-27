import { useSelector } from "react-redux";
import { dashboardRoutes } from "../../routes/routes";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";

const AdminDashboardHome = () => {
  const students = useSelector((state) => state.students.students);
  const companies = useSelector((state) => state.company.company);
  const allJobs = useSelector((state) => state.allJobs.allJobs);
  const navigate = useNavigate();

  const pendingStudents = students.filter((student) => !student.isVerified);

  const pendingCompanies = companies.filter((company) => !company.isVerified);

  return (
    <section className="min-h-screen bg-background px-6 py-10">
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-heading mb-2">
            👑 Welcome Admin
          </h1>
          <p className="text-text">
            Here's an overview of platform activity and controls.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Students", value: students.length },
            { label: "Companies", value: companies.length },
            { label: "Job Posts", value: allJobs.length },
            {
              label: "Jobs without Applicants",
              value: allJobs.filter(
                (x) => !x.applicants || x.applicants.length === 0
              ).length,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-content border border-border rounded-xl p-5 shadow text-center"
            >
              <div className="text-3xl font-bold text-heading">
                {item.value}
              </div>
              <div className="text-text text-sm mt-2">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {[
            {
              title: "Manage Students",
              link: dashboardRoutes.adminDashboardRoutes.usersManagement
                .allusers,
            },
            {
              title: "Manage Companies",
              link: dashboardRoutes.adminDashboardRoutes.companyManagement
                .allCompanies,
            },
            {
              title: "All Posted Jobs",
              link: dashboardRoutes.jobs,
            },
            {
              title: "View Reported Profiles",
              link: dashboardRoutes.adminDashboardRoutes.reportedProfiles,
              message: "This Option is not available right now.",
              disabled: true,
            },
            {
              title: "Send Notifications",
              link: dashboardRoutes.adminDashboardRoutes.sendNotifications,
              message: "This Option is not available right now.",
              disabled: true,
            },
            {
              title: "Platform Settings",
              link: dashboardRoutes.adminDashboardRoutes.settings,
              message: "This Option is not available right now.",
              disabled: true,
            },
          ].map((x, i) =>
            x.disabled ? (
              <div
                key={i}
                className="bg-muted border border-border p-5 rounded-xl shadow opacity-60 cursor-default"
              >
                <h3 className="text-heading font-medium">{x.title}</h3>
                <p className="text-text text-sm mt-1">
                  {x.message ? x.message : "Unavailable"}
                </p>
              </div>
            ) : (
              <Link key={i} to={x.link}>
                <div className="bg-primary border border-border p-5 rounded-xl shadow hover:shadow-lg cursor-pointer transition">
                  <h3 className="text-heading font-medium">{x.title}</h3>
                  <p className="text-text text-sm mt-1">
                    {x.message ? x.message : "Click to manage"}
                  </p>
                </div>
              </Link>
            )
          )}
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-semibold text-heading mb-4">
            📢 Platform Highlights
          </h2>

          <div className="space-y-2 ">
            <h3 className="text-lg font-semibold text-heading mb-3">
              👨‍🎓 Pending Student Approvals
            </h3>

            {pendingStudents.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-6 ">
                {pendingStudents.slice(0, 2).map((student, i) => {
                  const isIncomplete = !student.tagline;
                  return (
                    <div
                      className="border border-border p-4 rounded-xl text-text mb-3  flex justify-between
                    "
                    >
                      <div key={i} className="flex items-center gap-4">
                        {student.profileImage ? (
                          <img
                            src={student.profileImage}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            <svg
                              className="absolute w-12 h-12 text-gray-400 -left-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-heading">
                            {student.fullname || "No Name Provided"}
                          </p>
                          <p className="text-sm">{student.email}</p>
                        </div>
                      </div>
                      {isIncomplete ? (
                        <p className="text-red-500 text-xs mt-4">
                          Profile is not complted yet
                        </p>
                      ) : (
                        <Button
                          value="See user details"
                          onClick={() =>
                            navigate(
                              dashboardRoutes.profilePage.replace(
                                ":id",
                                student.uid
                              )
                            )
                          }
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-muted border border-border text-sm text-text text-center py-6 rounded-xl w-full">
                ✅ No pending student approvals
              </div>
            )}

            <h3 className="text-lg font-semibold text-heading mb-3">
              🏢 Pending Company Approvals
            </h3>

            {pendingCompanies.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-6">
                {pendingCompanies.slice(0, 2).map((company, i) => {
                  const isIncomplete = !company.aboutCompany;
                  return (
                    <div
                      key={i}
                      className="border border-border p-4 rounded-xl text-text mb-3 flex justify-between"
                    >
                      <div className="flex items-center gap-4">
                        {company.profileImage ? (
                          <img
                            src={company.profileImage}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            <svg
                              className="absolute w-12 h-12 text-gray-400 -left-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </div>
                        )}

                        <div>
                          <p className="text-sm font-medium text-heading">
                            {company.companyName || "No Company Name"}
                          </p>
                          <p className="text-sm">{company.email}</p>
                        </div>
                      </div>

                      {isIncomplete ? (
                        <p className="text-red-500 text-xs mt-4">
                          Profile is not completed yet
                        </p>
                      ) : (
                        <Button
                          value="See Company details"
                          onClick={() =>
                            navigate(
                              dashboardRoutes.profilePage.replace(
                                ":id",
                                company.uid
                              )
                            )
                          }
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-muted border border-border text-sm text-text text-center py-6 rounded-xl w-full">
                ✅ No pending company approvals
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboardHome;
