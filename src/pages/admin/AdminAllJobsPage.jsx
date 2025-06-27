import { useState } from "react";
import { useSelector } from "react-redux";
import { dashboardRoutes } from "../../routes/routes";
import Card from "../../components/common/Card";

const AdminAllJobsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const jobs = useSelector((state) => state.allJobs.allJobs);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.jobTitle
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      job.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <section className="min-h-screen bg-background px-4 sm:px-6 py-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-heading mb-6">
          📋 All Posted Jobs
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by job title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-[50%] bg-input border border-border rounded-md px-4 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-link"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-[200px] bg-input border border-border rounded-md px-3 py-2 text-sm text-text"
          >
            <option value="All">All Jobs</option>
            <option value="Open">Open Jobs</option>
            <option value="Closed">Closed Jobs</option>
          </select>
        </div>

        <div className="space-y-6">
          {filteredJobs.length === 0 ? (
            <p className="text-text text-sm">No jobs match the criteria.</p>
          ) : (
            <div className="grid  sm:grid-cols-2 md:grid-cols-1  xl:grid-cols-3  gap-6 w-full ">
              {filteredJobs.map((job, index) => (
                <Card
                  key={index}
                  job={job}
                  link={`${dashboardRoutes.JobDetailPage}/${job.id}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminAllJobsPage;
