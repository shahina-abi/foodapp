// export default ManageUsers;
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosIntance";
import { toast } from "react-toastify";
import Sidebar from "../../components/admin/SideBar";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const restaurantId = localStorage.getItem("restaurantId");

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("Unauthorized: No token found");
      if (!restaurantId) throw new Error("Restaurant ID missing");

      const { data } = await axiosInstance.get(
        `/admin/users?restaurantId=${restaurantId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (data.users.length === 0) {
        toast.info("No users found for your restaurant.");
        setUsers([]);
      } else {
        setUsers(data.users);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err.response?.data?.message);
      setError(
        err.response?.data?.message ||
          "Failed to fetch users. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBlockUser = async (userId) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("Unauthorized: No token found");

      await axiosInstance.post(
        `/admin/users/block/${userId}`,
        { blocked: true },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      toast.success("User blocked successfully.");
      fetchUsers(); // Refresh the user list
    } catch (err) {
      console.error("Failed to block user:", err.response?.data?.message);
      toast.error(err.response?.data?.message || "Failed to block user.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [restaurantId]);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

          <button
            onClick={fetchUsers}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
          >
            Refresh Users
          </button>

          {loading ? (
            <p>Loading users...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3 border">Name</th>
                    <th className="p-3 border">Email</th>
                    <th className="p-3 border">Total Orders</th>
                    <th className="p-3 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="text-center">
                      <td className="p-3 border">{user.name}</td>
                      <td className="p-3 border">{user.email}</td>
                      <td className="p-3 border">{user.totalOrders || 0}</td>
                      <td className="p-3 border">
                        <button
                          onClick={() => handleBlockUser(user._id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Block
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
