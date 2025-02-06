// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { Outlet, useNavigate } from "react-router-dom";

// export const ProtectedRouteAdmin = () => {
//   const navigate = useNavigate();
//   const { isAdminAuth } = useSelector((state) => state.admin);

//   useEffect(() => {
//     if (!isAdminAuth) {
//       navigate("/admin/login");
//     }
//   }, [isAdminAuth, navigate]);

//   return isAdminAuth ? <Outlet /> : null;
// };
// import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProtectRouteAdmin = () => {
//   const { isAdminAuth } = useSelector((state) => state.admin);

//   if (!isAdminAuth) {
//     return <Navigate to="/admin/login" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectRouteAdmin;
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRouteAdmin = () => {
  const { isAdminAuth } = useSelector((state) => state.admin); // ✅ Check Redux auth state

  console.log("Admin Authenticated:", isAdminAuth);

  return isAdminAuth ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRouteAdmin;
