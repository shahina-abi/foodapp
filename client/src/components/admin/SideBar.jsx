import React from "react";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div className="drawer">
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col min-h-screen bg-gray-100">
        {/* Main content */}
        <label
          htmlFor="admin-drawer"
          className="btn btn-primary drawer-button m-4"
        >
          Open Sidebar
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="admin-drawer"
          className="drawer-overlay"
          aria-label="close sidebar"
        ></label>
        <ul className="menu bg-gray-800 text-white min-h-full w-80 p-4">
          <li className="mb-2 text-lg font-semibold text-gray-300">
            Admin Dashboard
          </li>
          <li className="border-b border-gray-700 mb-2"></li>

          <li>
            <Link
              to="/admin/profile"
              className="text-gray-300 hover:text-white hover:bg-gray-700 rounded p-2"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/admin/restaurants/create"
              className="text-gray-300 hover:text-white hover:bg-gray-700 rounded p-2"
            >
              Create Restaurant
            </Link>
          </li>
          <li>
            <Link
              to="/admin/restaurants"
              className="text-gray-300 hover:text-white hover:bg-gray-700 rounded p-2"
            >
              Show Restaurants
            </Link>
          </li>
          <li>
            <Link
              to="/admin/fooditems/allfood"
              className="text-gray-300 hover:text-white hover:bg-gray-700 rounded p-2"
            >
              Show Menu
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className="text-gray-300 hover:text-white hover:bg-gray-700 rounded p-2"
            >
              Manage Users
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
