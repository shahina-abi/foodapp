import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosIntance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SideBar from "./SideBar";

function AdminProfile() {
  const [admin, setAdmin] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const fetchAdminProfile = async () => {
    try {
      const response = await axiosInstance.get("/admin/profile");
      setAdmin(response?.data?.data);
    } catch (error) {
      console.error("Error fetching admin profile:", error);
      toast.error("Failed to fetch admin profile.");
    }
  };

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/admin/logout");
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to logout.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white p-4 transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:w-64`}
      >
        <button
          className="text-sm bg-gray-700 p-2 rounded md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        </button>
        <SideBar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          {/* Admin Profile Information */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            {admin?.name || "Loading..."}
          </h1>
          <p className="text-lg text-gray-600 mb-6 text-center">
            {admin?.email || "Fetching email..."}
          </p>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2 w-full rounded-lg font-semibold shadow hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </main>
    </div>
  );
}

export default AdminProfile;
