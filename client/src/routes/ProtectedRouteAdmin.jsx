import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRouteAdmin = () => {
  // Config navigate
  const navigate = useNavigate();

  // Get seller authentication status
  const { isAdminAuth } = useSelector((state) => state.admin);

  // Redirect
  if (!isAdminAuth) {
    navigate("/admin/login");
    return;
  }

  return isAdminAuth && <Outlet />;
};
// import { useSelector } from "react-redux";
// import { Outlet, useNavigate } from "react-router-dom";

// export const ProtectedRouteAdmin = () => {
//   const navigate = useNavigate();
//   const { isAdminExist } = useSelector((state) => state.admin);

//   if (!isAdminExist) {
//     navigate("/admin/login");
//     return null; // Prevent rendering if not authenticated
//   }

//   return <Outlet />;
// };
