import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRouteAdmin = () => {
  const { isAdminAuth } = useSelector((state) => state.admin); // ✅ Check Redux auth state

  console.log("Admin Authenticated:", isAdminAuth);

  return isAdminAuth ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRouteAdmin;
