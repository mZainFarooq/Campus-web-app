import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../components/common/Button";
import { Link } from "react-router-dom";
import { dashboardRoutes } from "../../routes/routes";

const AdminAllCompanies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [profileFilter, setProfileFilter] = useState("All");
  const [filter, setFilter] = useState("All");

  const companies = useSelector((state) => state.company.company);

  const TabsVal = [
    { label: "All Companies", value: "All" },
    { label: "Blocked Companies", value: "Blocked" },
    { label: "Unblocked Companies", value: "Unblocked" },
    { label: "Verified Companies", value: "Verified" },
    { label: "UnVerified Companies", value: "UnVerified" },
  ];

  const filteredCompanies = companies
    .filter((company) =>
      company.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((company) => {
      let matchFilter = true;
      let matchProfile = true;

      switch (filter) {
        case "Verified":
          matchFilter = company.isVerified;
          break;
        case "UnVerified":
          matchFilter = !company.isVerified;
          break;
        case "Blocked":
          matchFilter = company.isBlocked;
          break;
        case "Unblocked":
          matchFilter = !company.isBlocked;
          break;
        default:
          matchFilter = true;
      }

      if (profileFilter === "Complete") {
        matchProfile = company.profile?.profileUrl;
      } else if (profileFilter === "Incomplete") {
        matchProfile = !company.profile?.profileUrl;
      }

      return matchFilter && matchProfile;
    });

  return (
    <section className="min-h-screen bg-background px-4 sm:px-6 py-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-heading mb-6">
          🏢 All Companies
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search companies by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-input border border-border px-4 py-2 rounded text-sm text-text w-full sm:w-1/2"
          />
        </div>
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

        {(filter === "All" || filter === "UnVerified") && (
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
          {filteredCompanies.map((company) => (
            <Link
              key={company.uid}
              to={dashboardRoutes.profilePage.replace(":id", company.uid)}
              className={`bg-primary border border-border rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow ${
                company.isBlocked ? "opacity-70" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                {company?.profile?.profileUrl ? (
                  <img
                    src={company.profile.profileUrl}
                    alt={company.companyName}
                    className="w-14 h-14 rounded-full object-cover border border-border"
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
                    {company.companyName}
                  </h3>
                  <p className="text-sm text-text">{company.email}</p>
                  {company.isBlocked && (
                    <span className="text-xs text-red-600 font-medium">
                      🚫 Blocked
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
          {filteredCompanies.length === 0 && (
            <p className="text-text text-sm">
              No companies found with these filters.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminAllCompanies;
