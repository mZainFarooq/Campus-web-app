import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";

const Card = ({ job, link }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const statusColors = {
    open: {
      bg: "bg-green-100",
      text: "text-green-700",
    },
    closed: {
      bg: "bg-red-100",
      text: "text-red-700",
    },
  };
  return (
    <div className="bg-primary border border-border rounded-xl p-5 shadow hover:shadow-lg transition">
      <div className="mb-2">
        <div className="flex justify-end">
          <span
            className={` px-3 py-1 text-xs font-semibold rounded-full 
      ${statusColors[job.status]?.bg} 
      ${statusColors[job.status]?.text}`}
          >
            {job.status === "open" ? "Open" : "Closed"}
          </span>
        </div>

        <h3
          className="text-lg font-semibold text-heading mt-2
        "
        >
          {job.jobTitle?.slice(0, 16) + "..."}
        </h3>
        <p className="text-text text-sm">{job.companyProfile.companyName}</p>
      </div>
      <div className="text-text text-sm space-y-1 mt-2">
        <p>
          <span className="font-medium">📍 Location:</span> {job.location}
        </p>
        <p>
          <span className="font-medium">🕒 Type:</span> {job.jobType}
        </p>
        <p>
          <span className="font-medium">🗓️ Posted At:</span>{" "}
          {formatDistanceToNow(new Date(job.postedAt), {
            addSuffix: true,
          })}
        </p>
        {job.isCompanyBlocked ? (
          <span className="text-red-500 text-xs">
            This Company is Blocked by Admin!
          </span>
        ) : (
          <span className="text-link text-xs">
            This Company is Verfied by Admin!
          </span>
        )}
      </div>
      <Button
        disabled={
          user?.role === "student" &&
          (job.isCompanyBlocked || !user?.isVerified)
        }
        value="View Job Details"
        className="w-full mt-4"
        onClick={() => navigate(link)}
      />
    </div>
  );
};

export default Card;
