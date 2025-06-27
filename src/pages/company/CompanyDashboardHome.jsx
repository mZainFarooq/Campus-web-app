import { useSelector } from "react-redux";
import Button from "../../components/common/Button";
import { useState } from "react";
import ProfileCreator from "../student/ProfileCreator";
import { useNavigate } from "react-router-dom";
import { dashboardRoutes } from "../../routes/routes";
import { formatDistanceToNow } from "date-fns";
import Card from "../../components/common/Card";

const CompanyDashboardHome = () => {
  const user = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const hasProfile = user?.profile?.profileUrl;
  const jobs = useSelector((state) => state.jobs.jobs);
  const navigate = useNavigate();

  const OpenJobs = jobs.filter((job) => job.status === "open");
  const ClosedJobs = jobs.filter((job) => job.status === "closed");
  return (
    <section className="min-h-screen bg-background px-6 py-10">
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-heading mb-2">
            👋 Welcome, {user?.companyName}!
          </h1>
          <p className="text-text">
            Manage your job listings and find top talent easily.
          </p>
        </div>

        {user && (
          <div className="bg-primary border border-border rounded-2xl p-6 shadow-md mb-8">
            <div className="flex sm:flex-row flex-col sm:items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-heading mb-1">
                  {hasProfile ? "Edit Your Profile" : "Complete Your Profile"}
                </h2>
                <p className="text-text text-sm">
                  {hasProfile
                    ? "Your profile is complete. Now you can post jobs!"
                    : "Your profile is 40% complete. Finish it to post jobs!"}
                </p>
              </div>

              <Button
                value={hasProfile ? "Edit Profile" : "Complete Now"}
                onClick={() => {
                  setIsOpen(true);
                }}
                className="mt-4 sm:mt-0"
              />
            </div>
          </div>
        )}

        {isOpen && (
          <ProfileCreator
            onClose={() => {
              setIsOpen(false);
            }}
          />
        )}

        <div className="bg-primary border border-border rounded-2xl p-6 shadow-md mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-heading mb-1">
              Ready to hire?
            </h2>
            <p className="text-text text-sm">
              Post a new job and start receiving applicants.
            </p>
          </div>
          <Button
            value="+ Post New Job"
            disabled={!user?.isVerified}
            onClick={() =>
              navigate(dashboardRoutes.companyDashboardRoutes.postJob)
            }
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {[
            { label: "Total Jobs Posted", value: jobs.length || 0 },
            { label: "Open Jobs", value: OpenJobs.length || 0 },
            { label: "Closed Jobs", value: ClosedJobs.length || 0 },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-primary border border-border rounded-xl p-5 shadow text-center"
            >
              <div className="text-3xl font-bold text-heading">
                {item.value}
              </div>
              <div className="text-text text-sm mt-2">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-semibold text-heading mb-4">
            📄 Your Recent Job Posts
          </h2>

          {jobs.length > 0 ? (
            <div className="grid sm:grid-cols-2  gap-4">
              {jobs.slice(0, 2).map((job, i) => (
                <Card
                  key={i}
                  job={job}
                  link={`${dashboardRoutes.companyDashboardRoutes.postedjobs}/${dashboardRoutes.JobDetailPage}/${job.id}`}
                />
              ))}
            </div>
          ) : (
            <div className="w-full bg-primary text-center py-12 px-6 border border-border rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-heading mb-2">
                ❌ No job posts found
              </h3>
              <p className="text-text text-sm">
                You haven’t posted any jobs yet. Start by creating a new job
                post to attract applicants.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CompanyDashboardHome;
