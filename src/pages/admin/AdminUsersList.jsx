import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../components/common/Button";
import { Link } from "react-router-dom";
import { dashboardRoutes } from "../../routes/routes";

const AdminUsersList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [profileFilter, setProfileFilter] = useState("All");

  const Allusers = useSelector((state) => state.students.students);

  const TabsVal = [
    {
      label: "All Students",
      value: "All",
    },
    {
      label: "Blocked Students",
      value: "Blocked",
    },
    {
      label: "Unblocked Students",
      value: "Unblocked",
    },
    {
      label: "Verified Students",
      value: "Verified",
    },
    {
      label: "Unverified Students",
      value: "Unverified",
    },
  ];

  const filteredUsers = Allusers.filter((user) => {
    const matchSearch = user.fullname
      ?.toLowerCase()
      ?.includes(searchTerm.toLowerCase());

    let matchFilter = true;

    if (filter === "Blocked") {
      matchFilter = user.isBlocked;
    } else if (filter === "Unblocked") {
      matchFilter = !user.isBlocked;
    } else if (filter === "Verified") {
      matchFilter = user.isVerified;
    } else if (filter === "Unverified") {
      matchFilter = !user.isVerified;
    }

    let matchProfile = true;

    if (profileFilter === "Complete") {
      matchProfile = user.profile?.profileUrl;
    } else if (profileFilter === "Incomplete") {
      matchProfile = !user.profile?.profileUrl;
    }

    return matchSearch && matchFilter && matchProfile;
  });

  return (
    <section className="min-h-screen bg-background px-4 sm:px-6 py-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-heading mb-6">
          👥 All Students
        </h1>

        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <input
            type="text"
            placeholder="Search students by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-[50%] bg-input border border-border rounded-md px-4 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-link"
          />
        </div>
        <div className="overflow-x-auto w-full ">
          <div className="flex flex-wrap gap-2 py-8">
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
        </div>

        {(filter === "All" || filter === "Unverified") && (
          <div className="mb-6 flex justify-end">
            <select
              value={profileFilter}
              onChange={(e) => setProfileFilter(e.target.value)}
              className="w-full sm:w-[200px] bg-input border border-border rounded-md px-3 py-2 text-sm text-text"
            >
              <option value="All">All Profiles</option>
              <option value="Complete">Complete Profiles</option>
              <option value="Incomplete">Incomplete Profiles</option>
            </select>
          </div>
        )}

        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <Link
              key={user.uid}
              to={dashboardRoutes.profilePage.replace(":id", user.uid)}
              className={`bg-primary border border-border rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${
                user.isBlocked ? "opacity-70" : ""
              }`}
            >
              <div>
                <div className="flex items-center gap-4">
                  {user?.profile ? (
                    <img
                      src={user?.profile?.profileUrl}
                      alt={user.profile?.fileName}
                      className="w-12 h-12 rounded-full border border-border object-cover"
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
                    <h3 className="text-base font-medium text-heading">
                      {user.fullname}
                    </h3>
                    <p className="text-sm text-text">{user.email}</p>
                    {user.isBlocked && (
                      <span className="text-xs text-red-600 font-medium">
                        🚫 Blocked
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {filteredUsers.length === 0 && (
            <p className="text-text text-sm">
              No users found with these filters.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminUsersList;
