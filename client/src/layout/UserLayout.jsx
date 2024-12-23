// import React from "react";
// import Footer from "../components/user/Footer.jsx";
// import { Outlet } from "react-router-dom";
// import UserHeader from "../components/user/UserHeader.jsx";
// import Header from "../components/user/Header.jsx";
// import { useAuth } from "../hooks/useAuth";

// const UserLayout = () => {
//   const { isAuthenticated, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-gray-500 text-lg">Checking authentication...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       {/* Conditional Header */}
//       {isAuthenticated ? <UserHeader /> : <Header />}

//       {/* Main Content */}
//       <main className="min-h-96 px-6 md:px-24 py-14">
//         <Outlet />
//       </main>

//       {/* Footer */}
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
