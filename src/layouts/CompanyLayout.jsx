import { useState } from "react";
import CompanySidebar from "../components/company/CompanySidebar";
import Header from "../components/common/Header";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useFirestoreListener from "../firebase/userHandling";
import { setJobs } from "../features/companyJobsSlice";
import DashboardLoader from "../components/DashboardLoader";
import NotVerifiedNotice from "../components/NotVerifiedNotice";

const CompanyLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useFirestoreListener({
    dispatch,
    action: setJobs,
    collectionName: "jobs",
    condition: ["postedBy", "==", user?.uid],
  });

  return (
    <div className="flex h-screen overflow-hidden bg-background text-text">
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block absolute md:relative z-50`}
      >
        <CompanySidebar
          onClose={() => setIsSidebarOpen(false)}
          isOpen={isSidebarOpen}
        />
      </div>
      <div className="flex flex-col flex-1">
        <Header onOpen={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-content p-4">
          {!user?.isVerified && <NotVerifiedNotice user={user} />}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CompanyLayout;
