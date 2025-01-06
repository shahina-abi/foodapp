import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="h-full min-h-screen bg-gray-800 text-white">
      <div className="flex flex-col p-6">
        {/* Admin Dashboard Header */}
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Admin Dashboard
        </h1>

        {/* Navigation Links */}
        <nav>
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/admin/profile"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/restaurants"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                Manage Restaurants
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                Manage Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                Manage Users
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
