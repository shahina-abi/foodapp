import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-6">
      <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              to="/admin/dashboard"
              className="block p-2 hover:bg-gray-700 rounded"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className="block p-2 hover:bg-gray-700 rounded"
            >
              Manage Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin/orders"
              className="block p-2 hover:bg-gray-700 rounded"
            >
              Manage Orders
            </Link>
          </li>
          <li>
            <Link
              to="/admin/restaurants"
              className="block p-2 hover:bg-gray-700 rounded"
            >
              Manage Restaurants
            </Link>
          </li>
          <li>
            <Link
              to="/admin/coupons"
              className="block p-2 hover:bg-gray-700 rounded"
            >
              Manage coupons
            </Link>
          </li>
          <li>
            <Link
              to="/admin/profile"
              className="block p-2 hover:bg-gray-700 rounded"
            >
              Profile
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                localStorage.removeItem("adminToken");
                window.location.href = "/admin/login";
              }}
              className="w-full text-left p-2 hover:bg-gray-700 rounded"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
