import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectRoute = () => {
  const { userAuthorized } = useSelector((state) => state.user);

  if (!userAuthorized) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return <Outlet />; // Render child routes if authenticated
};
