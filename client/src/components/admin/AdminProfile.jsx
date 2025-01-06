import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosIntance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SideBar from "./SideBar";

function AdminProfile() {
  const [admin, setAdmin] = useState({});
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
      <aside className="w-64 bg-gray-800 text-white">
        <SideBar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {admin?.name || "Admin Name"}
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              {admin?.email || "admin@example.com"}
            </p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminProfile;
