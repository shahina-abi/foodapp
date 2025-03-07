// import React, { useEffect } from "react";
// import { Outlet, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { axiosInstance } from "../config/axiosIntance";
// import { saveAdmin, clearAdmin } from "../redux/features/AdminSlice.js";
// import AdminHeader from "../components/admin/AdminHeader";
// import Header from "../components/user/Header";
// import AdminFooter from "../components/admin/AdminFooter";

// export const Adminlayout = () => {
//   const { isAdminAuth } = useSelector((state) => state.admin);
//   const dispatch = useDispatch();
//   const location = useLocation();

//   const checkAdmin = async () => {
//     try {
//       const response = await axiosInstance({
//         method: "GET",
//         url: "/admin/check-admin",
//       });

//       // Save admin data if it exists
//       if (response?.data?.data) {
//         dispatch(saveAdmin(response.data.data));
//       } else {
//         dispatch(clearAdmin());
//       }
//     } catch (error) {
//       console.error("Error checking admin: ", error);
//       dispatch(clearAdmin());
//     }
//   };

//   useEffect(() => {
//     checkAdmin();
//   }, [location.pathname]);

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Header */}
//       {isAdminAuth ? <AdminHeader /> : <Header />}

//       {/* Main Content */}
//       <div className="flex-grow bg-gray-100 p-4">
//         <Outlet />
//       </div>

//       {/* Footer */}
//       <AdminFooter />
//     </div>
//   );
// };
// import React, { useEffect } from "react";
// import { Outlet, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { axiosInstance } from "../config/axiosIntance.jsx";
// import { saveAdmin, clearAdmin } from "../redux/features/AdminSlice.js";
// import AdminHeader from "../components/admin/AdminHeader";
// import Header from "../components/user/Header";
// import AdminFooter from "../components/admin/AdminFooter";

// export const Adminlayout = () => {
//   const { isAdminAuth } = useSelector((state) => state.admin);
//   const dispatch = useDispatch();
//   const location = useLocation();

//   // Function to verify admin authentication
//   const checkAdmin = async () => {
//     try {
//       const response = await axiosInstance({
//         method: "GET",
//         url: "/admin/check-admin",
//       });

//       // Save admin data if it exists
//       if (response?.data?.data) {
//         dispatch(saveAdmin(response.data.data));
//       } else {
//         dispatch(clearAdmin());
//       }
//     } catch (error) {
//       console.error("Error checking admin: ", error);
//       dispatch(clearAdmin());
//     }
//   };

//   // Check for stored token when the component mounts
//   // useEffect(() => {
//   //   const token = localStorage.getItem("adminToken");
//   //   if (token) {
//   //     dispatch(saveAdmin({ token })); // Restore session from localStorage
//   //   } else {
//   //     checkAdmin(); // Fallback to API check
//   //   }
//   // }, []);

//   // Re-check admin authentication on route change
//   useEffect(() => {
//     checkAdmin();
//   }, [location.pathname]);

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Header */}
//       {isAdminAuth ? <AdminHeader /> : <Header />}

//       {/* Main Content */}
//       <div className="flex-grow bg-gray-100 p-4">
//         <Outlet />
//       </div>

//       {/* Footer */}
//       <AdminFooter />
//     </div>
//   );
// };
import React, { useEffect, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../config/axiosIntance.jsx";
import { saveAdmin, clearAdmin } from "../redux/features/AdminSlice.js";
import AdminHeader from "../components/admin/AdminHeader";
import Sidebar from "../components/admin/SideBar";

export const AdminLayout = () => {
  const { isAdminAuth } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const location = useLocation();

  const checkAdmin = async () => {
    try {
      const response = await axiosInstance.get("/admin/check-admin");

      if (response?.data?.data) {
        dispatch(saveAdmin(response.data.data));
      } else {
        dispatch(clearAdmin());
      }
    } catch (error) {
      console.error("Error checking admin: ", error);
      dispatch(clearAdmin());
    }
  };

  useEffect(() => {
    checkAdmin();
  }, [location.pathname]);

  // Use useMemo to avoid unnecessary Sidebar re-renders
  const memoizedSidebar = useMemo(() => <Sidebar />, []);

  return (
    <div className="flex h-screen">
      {memoizedSidebar}
      <div className="flex-1 p-6 ml-64 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
