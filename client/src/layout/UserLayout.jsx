import React, { useEffect } from "react";
import Footer from "../components/user/Footer.jsx";
import { Outlet, useLocation } from "react-router-dom";
import UserHeader from "../components/user/UserHeader.jsx";
import Header from "../components/user/Header.jsx";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../config/axiosIntance.jsx";
import { clearUser, saveUser } from "../redux/features/UserSlice.jsx";

export const UserLayout = () => {
  // Use isUserExist or userAuthorized to check authentication status
  const { userAuthorized } = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const checkUser = async () => {
    try {
      const response = await axiosInstance.get("/user/check", {
        withCredentials: true,
      });

      console.log("CheckUser API Response:", response.data);

      if (response.data.user) {
        console.log("Saving user to Redux:", response.data.user);
        dispatch(saveUser(response.data.user));
      } else {
        console.warn("No user found in response.");
        dispatch(clearUser());
      }
    } catch (error) {
      console.error("CheckUser Error:", error.response?.data || error.message);
      dispatch(clearUser());
    }
  };

  useEffect(() => {
    checkUser(); // Check user authentication on location change
  }, [location.pathname]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Render UserHeader if userAuthorized or isUserExist, otherwise render Header */}
      {userAuthorized ? <UserHeader /> : <Header />}

      {/* Main Content */}
      <main className="min-h-96 px-6 md:px-24 py-14">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UserLayout;
