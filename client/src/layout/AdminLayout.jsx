import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/admin/AdminHeader";
import AdminFooter from "../components/admin/AdminFooter";

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <AdminHeader />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-1/4 bg-blue-700 text-white">
          <nav className="p-6">
            <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
            <ul className="space-y-4">
              <li>
                <a
                  href="/admin"
                  className="hover:bg-blue-600 block px-4 py-2 rounded-md"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/admin/users"
                  className="hover:bg-blue-600 block px-4 py-2 rounded-md"
                >
                  Manage Users
                </a>
              </li>
              <li>
                <a
                  href="/admin/orders"
                  className="hover:bg-blue-600 block px-4 py-2 rounded-md"
                >
                  Manage Orders
                </a>
              </li>
              <li>
                <a
                  href="/admin/restaurants"
                  className="hover:bg-blue-600 block px-4 py-2 rounded-md"
                >
                  Manage Restaurants
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <AdminFooter />
    </div>
  );
};

export default AdminLayout;
