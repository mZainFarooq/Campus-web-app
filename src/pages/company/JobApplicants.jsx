import { useState } from "react";

const JobApplicants = () => {
  const [applicants, setApplicants] = useState([
    {
      id: 1,
      name: "Ali Raza",
      email: "ali.raza@example.com",
      profileLink: "#",
      status: "Pending",
    },
    {
      id: 2,
      name: "Sara Khan",
      email: "sara.khan@example.com",
      profileLink: "#",
      status: "Hired",
    },
    {
      id: 3,
      name: "Hamza Tariq",
      email: "hamza.tariq@example.com",
      profileLink: "#",
      status: "Rejected",
    },
  ]);

  const handleDecision = (id, decision) => {
    setApplicants((prev) =>
      prev.map((applicant) =>
        applicant.id === id ? { ...applicant, status: decision } : applicant
      )
    );
  };

  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Hired: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <section className="min-h-screen bg-background px-4 sm:px-6 py-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-heading mb-8">
          👥 Applicants for "Frontend Developer"
        </h1>

        {applicants.length === 0 ? (
          <p className="text-text">No applicants yet for this job.</p>
        ) : (
          <div className="space-y-5">
            {applicants.map((applicant) => (
              <div
                key={applicant.id}
                className="bg-primary border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-heading">
                      {applicant.name}
                    </h3>
                    <p className="text-sm text-text">{applicant.email}</p>
                    <a
                      href={applicant.profileLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link text-sm underline hover:opacity-80"
                    >
                      View Profile
                    </a>
                  </div>

                  <div className="flex flex-col sm:items-end gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium w-fit ${
                        statusStyles[applicant.status]
                      }`}
                    >
                      {applicant.status}
                    </span>

                    {applicant.status === "Pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDecision(applicant.id, "Hired")}
                          className="bg-green-600 text-white px-3 py-1 text-sm rounded hover:opacity-90"
                        >
                          Hire
                        </button>
                        <button
                          onClick={() =>
                            handleDecision(applicant.id, "Rejected")
                          }
                          className="bg-red-600 text-white px-3 py-1 text-sm rounded hover:opacity-90"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobApplicants;
