import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../config/axiosIntance";
import { saveadmin, clearadmin } from "../redux/features/AdminSlice";
import AdminHeader from "../components/admin/AdminHeader";
import Header from "../components/user/Header";
import AdminFooter from "../components/admin/AdminFooter";

export const Adminlayout = () => {
  const { isAdminExist } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const location = useLocation();

  const checkAdmin = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/admin/check-admin",
      });

      // Save admin data if it exists
      if (response?.data?.data) {
        dispatch(saveadmin(response.data.data));
      } else {
        dispatch(clearadmin());
      }
    } catch (error) {
      console.error("Error checking admin: ", error);
      dispatch(clearadmin());
    }
  };

  useEffect(() => {
    checkAdmin();
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      {isAdminExist ? <AdminHeader /> : <Header />}

      {/* Main Content */}
      <div className="flex-grow bg-gray-100 p-4">
        <Outlet />
      </div>

      {/* Footer */}
      <AdminFooter />
    </div>
  );
};
