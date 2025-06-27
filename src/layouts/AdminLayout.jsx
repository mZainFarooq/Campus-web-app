import { useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import Header from "../components/common/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import { useDispatch, useSelector } from "react-redux";
import useFirestoreListener from "../firebase/userHandling";
import { setStudents } from "../features/allStudentsSlice";
import { setCompanies } from "../features/allCompaniesSlice";
import { setJobs } from "../features/companyJobsSlice";
import { setAllJobs } from "../features/allJobsSlice";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useFirestoreListener({
    dispatch,
    action: setStudents,
    collectionName: "users",

    condition: ["role", "==", "student"],
  });

  useFirestoreListener({
    dispatch,
    action: setCompanies,
    collectionName: "users",
    condition: ["role", "==", "company"],
  });

  useFirestoreListener({
    dispatch,
    action: setAllJobs,
    collectionName: "jobs",
    condition: false,
  });

  return (
    <div className="flex h-screen overflow-hidden bg-background text-text">
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block absolute md:relative z-50`}
      >
        <AdminSidebar
          onClose={() => setIsSidebarOpen(false)}
          isOpen={isSidebarOpen}
        />
      </div>
      <div className="flex flex-col flex-1">
        <Header onOpen={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-content  p-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
