import { useState } from "react";
import Button from "../../components/common/Button";
import ProfileCreator from "./ProfileCreator";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ADMIN_UID, dashboardRoutes } from "../../routes/routes";
import Card from "../../components/common/Card";

const StudentDashboardHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const jobs = useSelector((state) => state.allJobs.allJobs);

  const hasResume = user?.resume?.resumeUrl;
  return (
    <section className="min-h-screen bg-background px-6 py-10">
      <div>
        <h1 className="text-3xl font-bold text-heading mb-2">
          👋 Welcome, {user?.fullname}!
        </h1>
        <p className="text-text mb-6">
          Let's help you find the best opportunities for your future.
        </p>

        <div className="bg-primary border border-border rounded-2xl p-6 shadow-md mb-8">
          <div className="flex sm:flex-row flex-col sm:items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-heading mb-1">
                {hasResume ? "Edit Your Profile" : "Complete Your Profile"}
              </h2>
              <p className="text-text text-sm">
                {hasResume
                  ? "Your profile is complete. Now you can start applying!"
                  : "Your profile is 40% complete. Finish it to start applying!"}
              </p>
            </div>

            <Button
              value={hasResume ? "Edit Profile" : "Complete Now"}
              onClick={() => {
                setIsOpen(true);
              }}
              className="mt-4 sm:mt-0"
            />
          </div>
        </div>

        {isOpen && (
          <ProfileCreator
            onClose={() => {
              setIsOpen(false);
            }}
          />
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Browse Jobs", emoji: "🎓", link: dashboardRoutes.jobs },
            {
              label: "My Applications",
              emoji: "📝",
              link: dashboardRoutes.studentDashboardRoutes.applicants,
            },
            {
              label: "Admin Profile",
              emoji: "🧠",
              link: dashboardRoutes.profilePage.replace(":id", ADMIN_UID),
            },
            {
              label: "View Profile",
              emoji: "📄",
              link: dashboardRoutes.profilePage.replace(":id", user?.uid),
            },
          ].map((item) => (
            <Link to={item.link} key={item.label}>
              <div className="bg-primary border border-border rounded-xl p-5 shadow hover:shadow-lg cursor-pointer transition">
                <div className="text-2xl mb-2">{item.emoji}</div>
                <div className="text-heading font-medium">{item.label}</div>
              </div>
            </Link>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold text-heading mb-4">
            🔥 Latest Jobs for You
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 ">
            {jobs.slice(0, 4).map((job, index) => (
              <Card
                job={job}
                key={index}
                link={`${dashboardRoutes.JobDetailPage}/${job.id}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentDashboardHome;
