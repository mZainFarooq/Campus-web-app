import { Navigate, Outlet } from "react-router-dom";
import FullScreenLoader from "./FullScreenLoader";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dashboardRoutes } from "../routes/routes";

const UnprotectedRoute = () => {
  const [pathToNavigate, setPathToNavigate] = useState(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      let role = user.role;

      if (role === "student") {
        setPathToNavigate(dashboardRoutes.studentDashboardRoutes.root);
      } else if (role === "company") {
        setPathToNavigate(dashboardRoutes.companyDashboardRoutes.root);
      } else if (role === "admin") {
        setPathToNavigate(dashboardRoutes.adminDashboardRoutes.root);
      }
    }
  }, [user]);

  if (user === null) return <FullScreenLoader />;

  if (user && !pathToNavigate) return <FullScreenLoader />;

  if (user && pathToNavigate) {
    return <Navigate to={pathToNavigate} replace />;
  }

  return <Outlet />;
};

export default UnprotectedRoute;
