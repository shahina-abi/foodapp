import React, { useEffect, useState } from "react";

import { axiosInstance } from "../../config/axiosIntance";
import { toast } from "react-toastify";

const AdminProfile = () => {
  const [admin, setAdmin] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedAdmin, setUpdatedAdmin] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const token = localStorage.getItem("adminToken"); // ✅ Get token from storage
        if (!token) {
          setError("Unauthorized: No token provided");
          return;
        }

        const { data } = await axiosInstance.get("/admin/profile", {
          headers: { Authorization: `Bearer ${token}` }, // ✅ Attach token
          withCredentials: true,
        });

        setAdmin(data.data);
        setUpdatedAdmin({ name: data.data.name, email: data.data.email });
      } catch (err) {
        setError("Failed to fetch admin profile");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken"); // ✅ Ensure token is sent
      if (!token) {
        toast.error("Unauthorized: No token provided");
        return;
      }

      const response = await axiosInstance.put(
        "/admin/edit-profile",
        updatedAdmin,
        {
          headers: { Authorization: `Bearer ${token}` }, // ✅ Attach token
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setAdmin(updatedAdmin);
        setEditMode(false);
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (err) {
      toast.error("Error updating profile");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Admin Profile</h1>

      {!editMode ? (
        <div>
          <p className="mb-2">
            <strong>Name:</strong> {admin.name}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {admin.email}
          </p>
          <p className="mb-2">
            <strong>Role:</strong> Admin
          </p>
          <button
            onClick={() => setEditMode(true)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              value={updatedAdmin.name}
              onChange={(e) =>
                setUpdatedAdmin({ ...updatedAdmin, name: e.target.value })
              }
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              value={updatedAdmin.email}
              onChange={(e) =>
                setUpdatedAdmin({ ...updatedAdmin, email: e.target.value })
              }
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminProfile;
