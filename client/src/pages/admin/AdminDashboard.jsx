import React, { useEffect, useState } from "react";
import {
  fetchAdminProfile,
  fetchAllUsers,
  fetchAllOrders,
} from "../../services/adminServices";

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const adminData = await fetchAdminProfile(token);
        setAdmin(adminData.admin);

        const usersData = await fetchAllUsers(token);
        setUsers(usersData.users);

        const ordersData = await fetchAllOrders(token);
        setOrders(ordersData.orders);
      } catch (error) {
        console.error("Failed to fetch admin dashboard data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Welcome, {admin?.name}</h1>
      <h2>Users: {users.length}</h2>
      <h2>Orders: {orders.length}</h2>
    </div>
  );
};

export default AdminDashboard;
