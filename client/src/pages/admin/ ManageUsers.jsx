import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosIntance";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axiosInstance.get("/admin/users");
        setUsers(data.users);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id} className="p-2 border-b">
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
