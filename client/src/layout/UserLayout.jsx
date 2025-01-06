// import React, { useEffect } from "react";
// import Header from "../components/user/Header";
// import Footer from "../components/user/Footer";
// import { Outlet, useLocation } from "react-router-dom";
// import UserHeader from "../components/user/UserHeader";
// import { axiosInstance } from "../config/axiosIntance";
// import { useDispatch, useSelector } from "react-redux";
// import { clearUser, saveUser } from "../redux/features/UserSlice";

// export const UserLayout = () => {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const { user, isAuthenticated } = useSelector((state) => state.user);

//   const checkUser = async () => {
//     try {
//       const response = await axiosInstance({
//         method: "GET",
//         url: "/users/check",
//       });
//       dispatch(saveUser(response?.data?.data));
//     } catch (error) {
//       dispatch(clearUser());
//     }
//   };

//   useEffect(() => {
//     checkUser();
//   }, [location.pathname]);

//   return (
//     <div className="">
//       {isAuthenticated ? <UserHeader /> : <Header />}
//       <div className="min-h-96 px-24 py-14">
//         <Outlet />
//       </div>
//       <Footer />
//     </div>
//   );
// };
// export default UserLayout;
import React from "react";
import Footer from "../components/user/Footer.jsx";
import { Outlet } from "react-router-dom";
import UserHeader from "../components/user/UserHeader.jsx";
import Header from "../components/user/Header.jsx";
import { useAuth } from "../hooks/useAuth";

const UserLayout = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Render UserHeader if authenticated, otherwise render Header */}
      {isAuthenticated ? <UserHeader /> : <Header />}

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
