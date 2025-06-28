import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  handleLogout,
  handleReadDataFromFirestore,
} from "../firebase/authHandling";
import { useEffect, useState } from "react";
import DashboardLoader from "../components/DashboardLoader";
import Button from "../components/common/Button";
import {
  handleToggleBlockCompanyWithJobs,
  handleupdateUsers,
} from "../firebase/userHandling";
import { ADMIN_UID } from "../routes/routes";

const ProfilePage = () => {
  const { id } = useParams();
  const routeLocation = useLocation();
  const pathname = routeLocation.pathname;

  const AllUsers = useSelector((state) => state.students.students);
  const AllCompanies = useSelector((state) => state.company.company);

  const loggedInUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id === ADMIN_UID) {
        setUser({
          role: "admin",
          fullname: "Admin",
          email: "admin@gmail.com",
          profile: {
            profileUrl:
              "https://ucarecdn.com/644b62a0-3b7c-4c33-b0e9-31ca8085c223/",
          },
        });
        return;
      }
      if (id === loggedInUser?.uid) {
        setUser(loggedInUser);
        return;
      }

      if (pathname.includes("/admin")) {
        const student = AllUsers.find((u) => u.uid === id);
        const company = AllCompanies.find((u) => u.uid === id);
        if (student) return setUser(student);
        if (company) return setUser(company);

        const userData = await handleReadDataFromFirestore(id);
        return setUser(userData);
      }

      if (pathname.includes("/student")) {
        const student = AllUsers.find((u) => u.uid === id);
        if (student) return setUser(student);

        const userData = await handleReadDataFromFirestore(id);
        return setUser(userData);
      }

      if (pathname.includes("/company")) {
        const company = AllCompanies.find((u) => u.uid === id);
        if (company) return setUser(company);

        const userData = await handleReadDataFromFirestore(id);
        return setUser(userData);
      }
    };

    fetchData();
  }, [id, pathname, AllUsers, AllCompanies, loggedInUser?.uid]);

  if (!user) return <DashboardLoader />;

  const handleToggle = (type) => {
    let name;
    if (user?.role === "company") {
      name = user?.companyName;
    } else {
      name = user?.fullname;
    }
    let notification;
    if (type === "verify") {
      notification = "Now " + name + " is verified user";
      const data = {
        isVerified: true,
      };
      handleupdateUsers(user.uid, data, notification);
    } else if (type === "block") {
      notification = "Now " + name + " is block";
      handleToggleBlockCompanyWithJobs(
        user.uid,
        true,
        notification,
        dispatch,
        AllCompanies,
        AllUsers,
        type
      );
    } else if (type === "unblock") {
      notification = "Now " + name + " is unblock user";
      handleToggleBlockCompanyWithJobs(user.uid, false, notification);
    }
  };

  const {
    role,
    fullname,
    email,
    profile,
    username,
    tagline,
    skills,
    education,
    resume,
    aboutMe,
    socials,
    companyName,
    industry,
    hiringRoles,
    location,
    employees,
    aboutCompany,
    talentPreferences,
  } = user;

  return (
    <section className="min-h-screen bg-background px-6 py-10">
      <div>
        {role !== "admin" && (
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-primary border border-border p-6 rounded-2xl shadow mb-10">
            {profile?.profileUrl ? (
              <div className="w-28 h-28 rounded-full bg-content border border-border overflow-hidden">
                <img
                  src={profile?.profileUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className=" w-28 h-28 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 flex justify-center items-end relative">
                <svg
                  className="w-24 h-24 text-gray-400 -bottom-2 absolute"
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

            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-heading">
                {role === "company" ? companyName : fullname}
              </h2>
              <p className="text-text text-sm">
                {role === "company" ? industry : tagline}
              </p>
              <p className="text-text text-sm mt-1">Email: {email}</p>
            </div>
          </div>
        )}

        {role === "admin" && (
          <>
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-primary border border-border p-6 rounded-2xl shadow mb-10">
              <div className="w-28 h-28 rounded-full bg-content border border-border overflow-hidden">
                <img
                  src={
                    "https://ucarecdn.com/644b62a0-3b7c-4c33-b0e9-31ca8085c223/"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-heading">The Admin</h2>
                <p className="text-text text-sm">
                  Your CampusApp administrator!
                </p>
                <p className="text-text text-sm mt-1">Email: admin@gmail.com</p>
              </div>
            </div>
            <div className="bg-primary border border-border p-6 rounded-xl shadow mb-8">
              <h3 className="text-heading text-xl font-semibold mb-2">
                🛡️ About the Admin
              </h3>
              <p className="text-text text-sm leading-relaxed">
                Welcome to CampusApp! As the administrator of this platform, my
                role is to ensure everything runs smoothly, fairly, and securely
                for all users — students, companies, and future employers. I'm
                here to oversee activities, verify profiles, and maintain the
                integrity of our growing professional community.
              </p>
            </div>
            <div className="bg-primary border border-border p-6 rounded-xl shadow mb-8">
              <h3 className="text-heading text-xl font-semibold mb-2">
                🔒 Verification Process
              </h3>
              <p className="text-text text-sm leading-relaxed mb-3">
                Before users can fully access all platform features — whether
                it's applying for jobs or posting them — they must first
                complete their profiles.
              </p>
              <p className="text-text text-sm leading-relaxed mb-3">
                Once a profile is complete, it comes to me for manual
                verification. I personally review:
              </p>
              <ul className="list-disc list-inside text-sm text-text space-y-1 mb-3">
                <li>
                  <strong>Student profiles</strong> to ensure they’ve uploaded
                  valid information, resumes, and completed basic details.
                </li>
                <li>
                  <strong>Company profiles</strong> to confirm they are
                  legitimate, trustworthy employers with real hiring intentions.
                </li>
              </ul>
              <p className="text-text text-sm leading-relaxed">
                Only after successful verification can a user apply for jobs or
                post new ones. This step helps us protect the platform from
                spam, fake profiles, and misuse.
              </p>
            </div>

            <h3 className="text-heading text-xl font-semibold mb-4">
              🛡️ Admin Capabilities
            </h3>

            <div className="bg-primary border border-border p-6 rounded-xl shadow mb-8">
              <h4 className="text-heading text-base font-semibold mb-2">
                📂 Profile Access
              </h4>
              <p className="text-text text-sm leading-relaxed mb-2">
                As the admin, I can view all profiles on the platform — whether
                the user is a verified student, an unverified one, a hiring
                company, or even another admin. This access helps me monitor for
                misuse, fake credentials, or any potential red flags.
              </p>
              <p className="text-text text-sm leading-relaxed mb-4">
                However, I do not alter profile content unless it’s part of the
                verification or blocking process.{" "}
                <strong>Your data remains yours — always.</strong>
              </p>
            </div>

            <div className="bg-primary border border-border p-6 rounded-xl shadow mb-8">
              <h4 className="text-heading text-base font-semibold mb-2">
                🛑 Block / Unblock Functionality
              </h4>
              <p className="text-text text-sm leading-relaxed mb-2">
                Although we do not currently have a public reporting system, my
                admin panel allows me to block or unblock any student or company
                at any time.
              </p>
              <p className="text-text text-sm leading-relaxed mb-2">
                If I notice any user spreading inappropriate content, violating
                platform guidelines, or misrepresenting themselves, I can
                temporarily or permanently block their access to ensure a safe
                environment for all users.
              </p>
              <p className="text-text text-sm leading-relaxed mb-4">
                Similarly, if a previously blocked user corrects their mistakes
                or appeals, I also have the authority to reactivate their
                account.
              </p>
            </div>

            <div className="bg-primary border border-border p-6 rounded-xl shadow mb-8">
              <h4 className="text-heading text-base font-semibold mb-2">
                💼 Job Listings Oversight
              </h4>
              <p className="text-text text-sm leading-relaxed mb-2">
                Although I can view all job listings posted by companies, I do
                not have the authority to edit or delete job posts myself. The
                only action I can take in relation to jobs is to block or
                unblock the company that posted them — if I find their behavior
                or job post to be suspicious or inappropriate.
              </p>
              <p className="text-text text-sm leading-relaxed">
                This allows companies to maintain control over their listings
                while still giving admin the ability to keep the platform clean
                and fair.
              </p>
            </div>

            <div className="bg-primary border border-border p-6 rounded-xl shadow mb-8">
              <h3 className="text-heading text-xl font-semibold mb-4">
                🙌 Final Word
              </h3>
              <p className="text-text text-sm leading-relaxed mb-3">
                My goal as admin is simple:{" "}
                <strong>
                  To maintain a trusted, supportive, and opportunity-driven
                  environment for students and companies alike.
                </strong>
              </p>
              <p className="text-text text-sm leading-relaxed mb-3">
                If you see a profile that doesn’t feel right or come across
                something that seems off, feel free to reach out directly to the
                support team. While a formal reporting feature isn’t yet active,
                I regularly monitor the platform to ensure your safety and a
                great user experience.
              </p>
              <p className="text-text text-sm leading-relaxed">
                Thank you for helping make{" "}
                <span className="font-medium">CampusApp</span> a better place!
              </p>
            </div>
          </>
        )}
        {role !== "admin" && (
          <>
            <div className="bg-primary border border-border p-6 rounded-xl shadow mb-8">
              <h3 className="text-heading text-xl font-semibold mb-2">
                🧑‍💻 About
              </h3>
              <p className="text-text text-sm leading-relaxed whitespace-pre-wrap break-words break-all overflow-hidden">
                {role === "company" ? aboutCompany : aboutMe?.about}
              </p>
            </div>
            <div className="bg-primary border border-border p-6 rounded-xl shadow mb-8">
              <h3 className="text-heading text-xl font-semibold mb-2">
                {role === "company" ? "🎯 Hiring Roles" : "💡 Skills"}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {(role === "company" ? hiringRoles : skills)?.map(
                  (item, index) => (
                    <li
                      key={index}
                      className="bg-content text-text text-sm px-3 py-1 rounded-full"
                    >
                      {item.value}
                    </li>
                  )
                )}
              </ul>
            </div>

            {role === "student" && (
              <div className="bg-primary border border-border p-6 rounded-xl shadow mb-8">
                <h3 className="text-heading text-xl font-semibold mb-4">
                  🎓 Education Details
                </h3>

                <div className="space-y-2 text-sm text-text">
                  <div>
                    <p className="font-semibold text-heading">Qualification</p>
                    <p>{education?.qualification}</p>
                  </div>

                  <div>
                    <p className="font-semibold text-heading">
                      College/Institute
                    </p>
                    <p>{education?.institute}</p>
                  </div>

                  <div>
                    <p className="font-semibold text-heading">Passing Year</p>
                    <p>{education?.year}</p>
                  </div>
                </div>
              </div>
            )}

            {role === "company" && (
              <div className="bg-primary border border-border p-6 rounded-xl shadow mb-8">
                <h3 className="text-heading text-xl font-semibold mb-4">
                  🏢 Company Details
                </h3>

                <div className="space-y-2 text-sm text-text">
                  <div>
                    <p className="font-semibold text-heading">
                      Total Employees
                    </p>
                    <p>{employees}</p>
                  </div>

                  <div>
                    <p className="font-semibold text-heading">
                      Company Location
                    </p>
                    <p>{location}</p>
                  </div>

                  <div>
                    <p className="font-semibold text-heading">
                      Talent Preferences
                    </p>
                    <p className="text-text text-sm leading-relaxed whitespace-pre-wrap break-words break-all overflow-hidden">
                      {talentPreferences}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {role === "student" && resume?.resumeUrl && (
              <div className="bg-primary border border-border p-6 rounded-xl shadow mb-8">
                <h3 className="text-heading text-xl font-semibold mb-2">
                  📄 Resume
                </h3>
                <p className="text-text text-sm mb-3">
                  Resume Uploaded:{" "}
                  <span className="font-medium">{resume?.fileName}</span>
                </p>
                <a
                  href={resume.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-link text-white px-4 py-2 rounded-lg text-sm inline-block"
                >
                  Open Resume
                </a>
              </div>
            )}

            <div className="bg-primary border border-border p-6 rounded-xl shadow mb-8">
              <h3 className="text-heading text-xl font-semibold mb-4">
                🔗 Socials
              </h3>
              <ul className="text-sm text-text list-disc list-inside space-y-1">
                {role === "student" ? (
                  <>
                    {socials?.linkedin && (
                      <li>
                        LinkedIn:{" "}
                        <a
                          href={socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-link underline"
                        >
                          LinkedIn Profile
                        </a>
                      </li>
                    )}
                    {socials?.github && (
                      <li>
                        GitHub:{" "}
                        <a
                          href={socials.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-link underline"
                        >
                          GitHub Profile
                        </a>
                      </li>
                    )}
                    {socials?.portfolio && (
                      <li>
                        Portfolio:{" "}
                        <a
                          href={socials.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-link underline"
                        >
                          Portfolio Link
                        </a>
                      </li>
                    )}
                  </>
                ) : (
                  <>
                    {socials?.linkedin && (
                      <li>
                        LinkedIn:{" "}
                        <a
                          href={socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-link underline"
                        >
                          LinkedIn Profile
                        </a>
                      </li>
                    )}
                    {socials?.website && (
                      <li>
                        Website:{" "}
                        <a
                          href={socials.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-link underline"
                        >
                          Visit Website
                        </a>
                      </li>
                    )}
                    {socials?.facebook && (
                      <li>
                        Facebook:{" "}
                        <a
                          href={socials.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-link underline"
                        >
                          Facebook Page
                        </a>
                      </li>
                    )}
                  </>
                )}
              </ul>
            </div>

            {loggedInUser?.role === "admin" && id !== loggedInUser?.uid && (
              <div className="flex justify-center ">
                {user?.resume?.resumeUrl || user?.employees ? (
                  !user?.isVerified ? (
                    <Button
                      value={
                        user?.role === "student"
                          ? "Verify User"
                          : "Verify Company"
                      }
                      onClick={() => handleToggle("verify")}
                    />
                  ) : user?.isBlocked ? (
                    <Button
                      value={
                        user?.role === "student"
                          ? "UnBlock User"
                          : "Unblock Company"
                      }
                      onClick={() => handleToggle("unblock")}
                    />
                  ) : (
                    <Button
                      value={
                        user?.role === "student"
                          ? "Block User"
                          : "Block Company"
                      }
                      onClick={() => handleToggle("block")}
                    />
                  )
                ) : (
                  <p className="text-xs text-red-500 ">
                    Profile is not completed yet to do any action.
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>
      {loggedInUser?.uid === id && (
        <div className="flex justify-end">
          <Button
            value="Logout"
            onClick={() => handleLogout(dispatch, navigate)}
          />
        </div>
      )}
    </section>
  );
};

export default ProfilePage;
