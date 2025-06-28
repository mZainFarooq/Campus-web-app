import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";

const MyApplicants = () => {
  const user = useSelector((state) => state.user);
  const statusColor = {
    pending: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700",
    approved: "bg-green-100 text-green-700",
  };

  return (
    <section className="min-h-screen bg-background px-6 py-10">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-heading mb-8">
          📄 My Applicants
        </h1>

        {!user?.appliedJobs || user.appliedJobs.length === 0 ? (
          <p className="text-text">You have not applied to any jobs yet.</p>
        ) : (
          <div className="space-y-6">
            {user.appliedJobs.map((job, index) => (
              <div
                key={index}
                className="bg-primary border border-border p-5 rounded-xl shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div>
                  <h3 className="text-lg font-semibold text-heading">
                    {job.title}
                  </h3>
                  <p className="text-text text-sm mb-1">
                    Company:{" "}
                    <span className="font-medium">{job.companyName}</span>
                  </p>
                  <p className="text-text text-xs">
                    <span> Applied At:</span>{" "}
                    {formatDistanceToNow(new Date(job.appliedAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>

                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium w-fit ${
                    statusColor[job.status]
                  }`}
                >
                  {job.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyApplicants;
