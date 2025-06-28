import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import DashboardLoader from "../components/DashboardLoader";
import Button from "../components/common/Button";
import { formatDistanceToNow } from "date-fns";
import { handleApply, handleupdateUsers } from "../firebase/userHandling";
import { dashboardRoutes } from "../routes/routes";
import { UpdateJobData } from "../features/allJobsSlice";
import { handleApplicantStatus } from "../firebase/jobHandling";
import { FaRegBookmark } from "react-icons/fa";

const JobDetailPage = () => {
  const { id } = useParams();
  const allJobs = useSelector((state) => state.allJobs.allJobs);
  const user = useSelector((state) => state.user);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isJobClosed, setisJobClosed] = useState(false);
  const [filter, setFilter] = useState("pending");
  const navigate = useNavigate();

  const TabsVal = [
    { label: "Pending Students", value: "pending" },
    { label: "Approved Students", value: "approved" },
    { label: "Rejected Students", value: "rejected" },
  ];

  useEffect(() => {
    const jobFromRedux = allJobs.find((job) => job.id === id);

    if (jobFromRedux) {
      setJob(jobFromRedux);
      setLoading(false);
    } else {
      const fetchJob = async () => {
        try {
          const jobRef = doc(db, "jobs", id);
          const snap = await getDoc(jobRef);
          if (snap.exists()) {
            setJob({
              ...snap.data(),
              postedAt: snap.data().postedAt?.toDate().toISOString() || null,
            });
          }
        } catch (err) {
          console.error("Job fetch error:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchJob();
    }
  }, [id, allJobs, isJobClosed]);

  if (loading) return <DashboardLoader />;
  if (!job)
    return <p className="text-center text-text mt-10">❌ Job not found.</p>;

  const {
    jobTitle,
    jobType,
    location,
    deadline,
    minSalary,
    maxSalary,
    description,
    requirements,
    companyProfile,
    postedAt,
    status,
  } = job;

  const handleJobToggle = () => {
    let check = status === "open" ? "closed" : "open";
    try {
      setLoading(true);
      handleupdateUsers(
        id,
        { status: check },
        "Job is switch to " + check,
        "jobs"
      );

      dispatch(UpdateJobData({ id, toggle: "toggle" }));
      setJob(false);
      setisJobClosed(true);
    } catch (error) {
    } finally {
      setLoading(false);
      setisJobClosed(true);
    }
  };

  const handleEdit = () => {
    navigate(
      dashboardRoutes.companyDashboardRoutes.root +
        "/" +
        dashboardRoutes.companyDashboardRoutes.postJob +
        `?edit=true&jobId=${job.id}`
    );
  };

  console.log(companyProfile);

  const isBlockedColors = {
    true: {
      bg: "bg-green-100",
      text: "text-green-700",
    },
    false: {
      bg: "bg-red-100",
      text: "text-red-700",
    },
  };

  const hasApplied =
    user?.role === "student"
      ? user.appliedJobs?.some((appliedJob) => appliedJob.jobId === id)
      : false;

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  const filteredApplicants =
    filter === "All"
      ? job.applicants
      : job.applicants.filter((applicant) => applicant.status === filter);

  return (
    <section className="min-h-screen w-full bg-background px-6 py-10 ">
      <div className="space-y-6">
        <div className="flex justify-end items-center gap-4">
          <span
            className={` px-3 py-1 text-xs font-semibold rounded-full 
      ${isBlockedColors[!job.isCompanyBlocked]?.bg} 
      ${isBlockedColors[!job.isCompanyBlocked]?.text}`}
          >
            {job.isCompanyBlocked === true
              ? "Company Blocked"
              : "Company Verified"}
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-primary border border-border p-6 rounded-2xl shadow mb-10">
          <div className="w-28 h-28 rounded-full bg-content border border-border overflow-hidden">
            <img
              src={companyProfile?.companyLogo?.profileUrl}
              alt={companyProfile?.companyName}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-heading">
              {companyProfile?.companyName}
            </h2>
            <p className="text-text text-sm">{jobTitle}</p>
          </div>
        </div>
        <div className="bg-primary p-6 rounded-xl shadow border border-border space-y-2 text-sm text-text">
          <p>
            📍 <span className="font-medium">Location:</span> {location}
          </p>
          <p>
            🕒 <span className="font-medium">Type:</span> {jobType}
          </p>
          <p>
            💰 <span className="font-medium">Salary:</span> Rs.{" "}
            {minSalary.toLocaleString()} – {maxSalary.toLocaleString()}
          </p>
          <p>
            📅 <span className="font-medium">Deadline:</span>{" "}
            {formatDistanceToNow(new Date(deadline), {
              addSuffix: true,
            }).replace("ago", "left")}
          </p>

          <p>
            🗓️ <span className="font-medium">Posted At:</span>{" "}
            {formatDistanceToNow(new Date(postedAt), {
              addSuffix: true,
            })}
          </p>
        </div>
        <div className="bg-primary p-6 rounded-xl w-full shadow border border-border">
          <h2 className="text-xl font-semibold  text-heading mb-2">
            📝 Job Description
          </h2>
          <p className="text-text text-sm leading-relaxed whitespace-pre-wrap break-words break-all overflow-hidden">
            {description}
          </p>
        </div>
        <div className="bg-primary p-6 rounded-xl w-full shadow border border-border break-words overflow-x-auto">
          <h2 className="text-xl font-semibold text-heading mb-2">
            ✅ Requirements
          </h2>
          <p className="text-text text-sm leading-relaxed whitespace-pre-wrap break-words break-all overflow-hidden">
            {requirements}
          </p>
        </div>
        {user?.role === "student" && (
          <div className="flex justify-center sm:justify-end w-full">
            <Button
              disabled={hasApplied}
              value={hasApplied ? "✅ Applied" : "🚀 Apply Now"}
              onClick={() => handleApply(user, job, setLoading)}
            />
          </div>
        )}
        {user?.role === "company" && (
          <div className="flex flex-col sm:flex-row  justify-end items-end gap-2 ">
            <Button
              value="Edit Job"
              onClick={handleEdit}
              className="w-full sm:w-1/2"
            />
            <Button
              onClick={handleJobToggle}
              className="w-full sm:w-1/2"
              value={status === "open" ? "Closed Job" : "Open Job"}
            />
          </div>
        )}
        {status === "closed" && (
          <p className="text-red-500 text-sm text-center">
            This Job is closed by company!
          </p>
        )}
        {user?.role === "company" && (
          <section className=" bg-background min-h-screen">
            <h1 className="text-2xl font-bold text-heading mb-6 mt-6">
              🚀 Applicants List
            </h1>

            <div className="flex flex-wrap gap-2 py-6 justify-center sm:justify-start">
              {TabsVal.map((tab) => (
                <Button
                  key={tab.value}
                  value={tab.label}
                  onClick={() => setFilter(tab.value)}
                  className={`px-4 py-2 text-sm font-semibold ${
                    filter === tab.value
                      ? "bg-primary text-heading border-b-2 border-indigo-500"
                      : "bg-muted text-text hover:bg-muted/80"
                  }`}
                  initalClass={false}
                />
              ))}
            </div>
            <div className="space-y-4">
              {filteredApplicants.length === 0 ? (
                <div className="text-center py-10 text-muted text-sm">
                  {filter === "All"
                    ? "No applicants found."
                    : `No ${filter} students found.`}
                </div>
              ) : (
                filteredApplicants.map((applicant, index) => (
                  <div
                    key={index}
                    className="cursor-pointer bg-primary p-4 rounded-lg border border-border shadow space-y-4"
                  >
                    {/* Status Badge */}
                    <div className="flex justify-end">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          statusColors[applicant.status]
                        }`}
                      >
                        {applicant.status}
                      </span>
                    </div>

                    {/* Profile Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <img
                        src={applicant.profile.profileUrl}
                        alt={applicant.name}
                        className="w-14 h-14 object-cover rounded-full border border-border"
                      />
                      <div>
                        <h2 className="text-lg font-semibold text-heading">
                          {applicant.name}
                        </h2>
                        <p className="text-sm text-text">{applicant.tagLine}</p>
                        <p className="text-xs text-muted">
                          Applied:{" "}
                          {formatDistanceToNow(new Date(applicant.appliedAt), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Buttons + View */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                      <Link
                        to={`${
                          dashboardRoutes.companyDashboardRoutes.root
                        }/${dashboardRoutes.profilePage.replace(
                          ":id",
                          applicant.uid
                        )}`}
                        className="text-link underline w-fit"
                      >
                        View Profile
                      </Link>

                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                        <Button
                          value="Hire Student"
                          disabled={applicant.status === "approved"}
                          onClick={() =>
                            handleApplicantStatus(
                              applicant,
                              job,
                              "approved",
                              setisJobClosed
                            )
                          }
                        />
                        <Button
                          value="Reject Student"
                          disabled={applicant.status === "rejected"}
                          onClick={() =>
                            handleApplicantStatus(
                              applicant,
                              job,
                              "rejected",
                              setisJobClosed
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        )}
      </div>
    </section>
  );
};

export default JobDetailPage;
