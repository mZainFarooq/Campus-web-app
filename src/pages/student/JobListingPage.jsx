import { useState } from "react";
import Card from "../../components/common/Card";
import { useSelector } from "react-redux";
import { dashboardRoutes } from "../../routes/routes";

const JobListingPage = () => {
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("All");
  const [location, setLocation] = useState("All");
  const jobs = useSelector((state) => state.allJobs.allJobs);
  const filteredJobs = jobs.filter((job) => {
    return (
      (job.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
        search === "") &&
      (jobType === "All" || job.jobType === jobType) &&
      (location === "All" || job.location === location)
    );
  });

  return (
    <section className="min-h-screen bg-background px-6 py-10">
      <div>
        <h1 className="text-3xl font-bold text-heading mb-6">
          🔎 Explore Job Opportunities
        </h1>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <input
            type="text"
            placeholder="Search job title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-input border border-border rounded-lg px-4 py-2 text-sm text-text focus:outline-none"
          />

          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="w-full bg-input border border-border rounded-lg px-4 py-2 text-sm text-text focus:outline-none"
          >
            <option value="All">All Types</option>
            <option value="Remote">Remote</option>
            <option value="Onsite">Onsite</option>
            <option value="Hybrid">Hybrid</option>
          </select>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-input border border-border rounded-lg px-4 py-2 text-sm text-text focus:outline-none"
          >
            <option value="All">All Locations</option>
            <option value="Karachi">Karachi</option>
            <option value="Landhi">Landhi</option>
            <option value="Lahore">Lahore</option>
            <option value="Islamabad">Islamabad</option>
          </select>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-1  xl:grid-cols-3  gap-6">
          {filteredJobs.length === 0 ? (
            <p className="text-text">No jobs found.</p>
          ) : (
            filteredJobs.map((job, i) => (
              <Card
                key={i}
                job={job}
                link={`${dashboardRoutes.JobDetailPage}/${job.id}`}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default JobListingPage;
