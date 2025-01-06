import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosIntance";
import toast from "react-hot-toast";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/admin/users"); // Fetch users from admin route
        const usersWithDefaults = response.data.map((user) => ({
          ...user,
          blocked: user.blocked ?? false, // Set default blocked value
        }));
        setUsers(usersWithDefaults);
      } catch (err) {
        setError("Failed to fetch users.");
        console.error("Error fetching users:", err);
        toast.error("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle delete user
  const handleDelete = async (userId) => {
    try {
      await axiosInstance.delete(`/admin/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
      toast.success("User deleted successfully.");
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Failed to delete user.");
    }
  };

  // Handle block/unblock user
  const handleBlockToggle = async (userId, currentBlockStatus) => {
    try {
      const newBlockStatus = !currentBlockStatus;
      await axiosInstance.post(`/admin/users/block/${userId}`, {
        blocked: newBlockStatus,
      });
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, blocked: newBlockStatus } : user
        )
      );
      toast.success(
        newBlockStatus
          ? "User blocked successfully."
          : "User unblocked successfully."
      );
    } catch (err) {
      console.error("Error updating block status:", err);
      toast.error("Failed to update user block status.");
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">User List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    className={`py-2 px-4 rounded ${
                      user.blocked
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-yellow-500 hover:bg-yellow-600"
                    } text-white font-semibold mr-2`}
                    onClick={() => handleBlockToggle(user._id, user.blocked)}
                  >
                    {user.blocked ? "Unblock" : "Block"}
                  </button>
                  <button
                    className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded font-semibold"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
