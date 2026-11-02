// import React from "react";
// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="w-64 bg-gray-800 text-white h-screen p-6">
//       <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
//       <nav>
//         <ul className="space-y-4">
//           <li>
//             <Link
//               to="/admin/dashboard"
//               className="block p-2 hover:bg-gray-700 rounded"
//             >
//               Dashboard
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/admin/users"
//               className="block p-2 hover:bg-gray-700 rounded"
//             >
//               Manage Users
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/admin/orders"
//               className="block p-2 hover:bg-gray-700 rounded"
//             >
//               Manage Orders
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/admin/restaurants"
//               className="block p-2 hover:bg-gray-700 rounded"
//             >
//               Manage Restaurants
//             </Link>
//             <li>
//               <Link
//                 to="/admin/manage-menu"
//                 className="block hover:text-blue-400"
//               >
//                 Manage Menu
//               </Link>
//             </li>
//           </li>
//           <li>
//             <Link
//               to="/admin/coupons"
//               className="block p-2 hover:bg-gray-700 rounded"
//             >
//               Manage coupons
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/admin/profile"
//               className="block p-2 hover:bg-gray-700 rounded"
//             >
//               Profile
//             </Link>
//           </li>
//           <li>
//             <button
//               onClick={() => {
//                 localStorage.removeItem("adminToken");
//                 window.location.href = "/admin/login";
//               }}
//               className="w-full text-left p-2 hover:bg-gray-700 rounded"
//             >
//               Logout
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAdmin } from "../../redux/features/AdminSlice.js";

const NAV_ITEMS = [
  { to: "/admin/dashboard", icon: "📊", label: "Dashboard" },
  { to: "/admin/orders", icon: "📦", label: "Manage Orders" },
  { to: "/admin/manage-menu", icon: "🍽️", label: "Manage Menu" },
  { to: "/admin/manage-restaurant", icon: "🏪", label: "My Restaurant" },
  { to: "/admin/users", icon: "👥", label: "Manage Users" },
  { to: "/admin/coupons", icon: "🎟️", label: "Coupons" },
  { to: "/admin/profile", icon: "👤", label: "Profile" },
];

const Sidebar = React.memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Clear all admin data
    dispatch(clearAdmin());
    localStorage.removeItem("adminToken");
    localStorage.removeItem("restaurantId");
    navigate("/admin/login");
  };

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-gray-900 flex flex-col z-40 border-r border-gray-800">
      {/* ── Logo */}
      <div className="px-5 py-5 border-b border-gray-800 flex items-center gap-3">
        <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center text-lg shadow-lg shadow-orange-500/20">
          🏪
        </div>
        <div>
          <p className="text-white font-extrabold text-base leading-tight">
            FoodBae
          </p>
          <p className="text-gray-500 text-xs">Admin Portal</p>
        </div>
      </div>

      {/* ── Nav links */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-orange-500 text-white shadow-sm shadow-orange-500/30"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span className="text-base w-5 text-center">{item.icon}</span>
              {item.label}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Bottom section — Back to site + Logout */}
      <div className="px-3 py-4 border-t border-gray-800 space-y-1">
        {/* Back to FoodBae */}
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-all duration-200"
        >
          <span className="text-base w-5 text-center">🏠</span>
          Back to FoodBae
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200"
        >
          <span className="text-base w-5 text-center">🚪</span>
          Logout
        </button>
      </div>
    </div>
  );
});

export default Sidebar;
