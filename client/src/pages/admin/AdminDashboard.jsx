import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosIntance"; // Import axios instance
import Sidebar from "../../components/admin/SideBar";
import Chart from "../../components/admin/Chart";
import StatsCard from "../../components/admin/ StatsCard";
const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, orders: 0, revenue: 0 });
  const [orderStatus, setOrderStatus] = useState([0, 0, 0]); // Delivered, Pending, Canceled
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("adminToken"); // ✅ Get token from storage
        if (!token) throw new Error("Unauthorized: No token found");

        const { data } = await axiosInstance.get("/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setStats({
          users: data.usersCount,
          orders: data.ordersCount,
          revenue: data.totalRevenue,
        });

        setOrderStatus([
          data.deliveredOrders,
          data.pendingOrders,
          data.canceledOrders,
        ]);
      } catch (err) {
        console.error("Error fetching stats:", err.response?.data?.message);
        setError(err.response?.data?.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {loading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard
                title="Total Users"
                value={stats.users}
                color="bg-blue-500"
              />
              <StatsCard
                title="Total Orders"
                value={stats.orders}
                color="bg-green-500"
              />
              <StatsCard
                title="Total Revenue"
                value={`₹${stats.revenue}`}
                color="bg-yellow-500"
              />
            </div>

            {/* Order Status Chart */}
            <div className="mt-10 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Order Status Overview</h2>
              <Chart
                data={{
                  labels: ["Delivered", "Pending", "Canceled"],
                  datasets: [
                    {
                      data: orderStatus,
                      backgroundColor: ["#4caf50", "#ffc107", "#f44336"],
                    },
                  ],
                }}
                type="pie"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
