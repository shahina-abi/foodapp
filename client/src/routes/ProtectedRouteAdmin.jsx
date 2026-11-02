// import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProtectedRouteAdmin = () => {
//   const { isAdminAuth } = useSelector((state) => state.admin); // ✅ Check Redux auth state

//   console.log("Admin Authenticated:", isAdminAuth);

//   return isAdminAuth ? <Outlet /> : <Navigate to="/admin/login" replace />;
// };

// export default ProtectedRouteAdmin;
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRouteAdmin = ({ children }) => {
  const { isAdminAuth } = useSelector((state) => state.admin);

  if (!isAdminAuth) {
    return <Navigate to="/admin/login" replace />;
  }

  return children; // ← renders <AdminLayout /> which has its own <Outlet />
};

export default ProtectedRouteAdmin;
