import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { dashboardRoutes } from "../../routes/routes";
import Button from "../../components/common/Button";
import DashboardLoader from "../../components/DashboardLoader";
import { useEffect, useState } from "react";
import Card from "../../components/common/Card";

const CompanyPostedJobs = () => {
  const jobs = useSelector((state) => state.jobs.jobs);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (jobs) {
      setLoading(false);
    }
  }, [jobs]);

  const filteredJobs = jobs
    .filter((job) => {
      if (filterStatus === "open") return job.status === "open";
      if (filterStatus === "closed") return job.status === "closed";
      return true;
    })
    .filter((job) => {
      const q = searchQuery.toLowerCase();
      return (
        job.jobTitle.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q)
      );
    });

  return (
    <section className="min-h-screen bg-background px-4 sm:px-6 py-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-heading mb-8">
          🧾 My Posted Jobs
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by job title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-[50%] bg-input border border-border rounded-md px-4 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-link"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full sm:w-[200px] bg-input border border-border rounded-md px-3 py-2 text-sm text-text"
          >
            <option value="All">All Jobs</option>
            <option value="open">Open Jobs</option>
            <option value="closed">Closed Jobs</option>
          </select>
        </div>

        {loading ? (
          <DashboardLoader />
        ) : filteredJobs.length === 0 ? (
          <div className="text-center text-muted-foreground">
            <p className="text-lg font-semibold mb-1">
              No job has been posted yet.
            </p>
            <p className="text-sm">Start posting jobs to see them here.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-1  xl:grid-cols-3 gap-6 w-full ">
            {filteredJobs.map((job, i) => (
              <Card
                key={i}
                job={job}
                link={`${dashboardRoutes.JobDetailPage}/${job.id}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CompanyPostedJobs;
