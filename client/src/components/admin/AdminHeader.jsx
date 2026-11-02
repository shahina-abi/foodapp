import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// Map routes to page titles
const PAGE_TITLES = {
  "/admin/dashboard": { title: "Dashboard", icon: "📊" },
  "/admin/orders": { title: "Manage Orders", icon: "📦" },
  "/admin/manage-menu": { title: "Manage Menu", icon: "🍽️" },
  "/admin/manage-restaurant": { title: "My Restaurant", icon: "🏪" },
  "/admin/users": { title: "Manage Users", icon: "👥" },
  "/admin/coupons": { title: "Coupons", icon: "🎟️" },
  "/admin/profile": { title: "Profile", icon: "👤" },
  "/admin/add-food": { title: "Add Food Item", icon: "➕" },
};

const AdminHeader = () => {
  const location = useLocation();
  const { adminData } = useSelector((state) => state.admin);

  const page = PAGE_TITLES[location.pathname] || { title: "Admin", icon: "⚙️" };

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "A";

  return (
    <header className="h-16 bg-white border-b border-gray-100 shadow-sm flex items-center justify-between px-6 sticky top-0 z-30">
      {/* ── Page title */}
      <div className="flex items-center gap-2.5">
        <span className="text-xl">{page.icon}</span>
        <h1 className="text-lg font-extrabold text-gray-900">{page.title}</h1>
      </div>

      {/* ── Right side — admin info */}
      <div className="flex items-center gap-3">
        {/* Greeting */}
        <div className="hidden sm:block text-right">
          <p className="text-xs text-gray-400">Welcome back,</p>
          <p className="text-sm font-semibold text-gray-800">
            {adminData?.name || "Admin"}
          </p>
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-white text-sm font-bold shadow-sm shadow-orange-200">
          {getInitials(adminData?.name)}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
