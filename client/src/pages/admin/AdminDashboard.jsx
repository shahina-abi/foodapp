// // export default AdminDashboard;
// import React, { useEffect, useState } from "react";
// import { axiosInstance } from "../../config/axiosIntance"; // Import axios instance
// import Sidebar from "../../components/admin/SideBar";
// import Chart from "../../components/admin/Chart";
// import StatsCard from "../../components/admin/ StatsCard";
// import { toast } from "react-toastify";

// const AdminDashboard = () => {
//   const [stats, setStats] = useState({ users: 0, orders: 0, revenue: 0 });
//   const [orderStatus, setOrderStatus] = useState([0, 0, 0]); // Delivered, Pending, Canceled
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const token = localStorage.getItem("adminToken");
//         const restaurantId = localStorage.getItem("restaurantId");

//         if (!token || !restaurantId) {
//           throw new Error("Unauthorized or missing restaurant ID.");
//         }

//         const { data } = await axiosInstance.get(
//           `/admin/stats?restaurantId=${restaurantId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//             withCredentials: true,
//           }
//         );

//         setStats({
//           users: data.usersCount,
//           orders: data.ordersCount,
//           revenue: data.totalRevenue,
//         });

//         setOrderStatus([
//           data.deliveredOrders,
//           data.pendingOrders,
//           data.canceledOrders,
//         ]);
//       } catch (err) {
//         console.error("Error fetching stats:", err.response?.data?.message);
//         setError(err.response?.data?.message || "Failed to load data.");
//         toast.error(err.response?.data?.message || "Failed to fetch data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex-1 p-6 bg-gray-100 min-h-screen">
//         <h1 className="text-3xl font-bold mb-6">Restaurant Dashboard</h1>

//         {loading ? (
//           <p>Loading data...</p>
//         ) : error ? (
//           <p className="text-red-500">{error}</p>
//         ) : (
//           <>
//             {/* Stats Section */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <StatsCard
//                 title="Total Customers"
//                 value={stats.users}
//                 color="bg-blue-500"
//               />
//               <StatsCard
//                 title="Total Orders"
//                 value={stats.orders}
//                 color="bg-green-500"
//               />
//               <StatsCard
//                 title="Total Revenue"
//                 value={`₹${stats.revenue}`}
//                 color="bg-yellow-500"
//               />
//             </div>

//             {/* Order Status Chart */}
//             <div className="mt-10 bg-white p-6 rounded-lg shadow">
//               <h2 className="text-xl font-bold mb-4">Order Status Overview</h2>
//               <Chart
//                 data={{
//                   labels: ["Delivered", "Pending", "Canceled"],
//                   datasets: [
//                     {
//                       data: orderStatus,
//                       backgroundColor: ["#4caf50", "#ffc107", "#f44336"],
//                     },
//                   ],
//                 }}
//                 type="pie"
//               />
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosIntance";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import toast from "react-hot-toast";

// ── Stat card
const StatCard = ({ title, value, icon, trend, color }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
        <p className="text-3xl font-extrabold text-gray-900">{value}</p>
        {trend && (
          <p className="text-xs text-green-600 font-medium mt-1">↑ {trend}</p>
        )}
      </div>
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${color}`}
      >
        {icon}
      </div>
    </div>
  </div>
);

// ── Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-4 py-3">
        {label && <p className="text-xs text-gray-500 mb-1">{label}</p>}
        {payload.map((p, i) => (
          <p
            key={i}
            className="text-sm font-bold"
            style={{ color: p.color || p.fill }}
          >
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const PIE_COLORS = ["#F97316", "#3B82F6", "#EF4444", "#8B5CF6"];

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, orders: 0, revenue: 0 });
  const [orderStatus, setOrderStatus] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const restaurantId = localStorage.getItem("restaurantId");

      if (!token || !restaurantId) {
        throw new Error("Unauthorized or missing restaurant ID.");
      }

      const headers = { Authorization: `Bearer ${token}` };

      // Fetch stats + orders in parallel
      const [statsRes, ordersRes] = await Promise.all([
        axiosInstance.get(`/admin/stats?restaurantId=${restaurantId}`, {
          headers,
          withCredentials: true,
        }),
        axiosInstance.get(`/admin/orders?restaurantId=${restaurantId}`, {
          headers,
          withCredentials: true,
        }),
      ]);

      const data = statsRes.data;
      setStats({
        users: data.usersCount || 0,
        orders: data.ordersCount || 0,
        revenue: ((data.totalRevenue || 0) * 83).toFixed(0),
      });

      setOrderStatus(
        [
          { name: "Completed", value: data.deliveredOrders || 0 },
          { name: "Pending", value: data.pendingOrders || 0 },
          { name: "Canceled", value: data.canceledOrders || 0 },
          { name: "Preparing", value: data.preparingOrders || 0 },
        ].filter((s) => s.value > 0),
      );

      // Recent 5 orders
      const allOrders = ordersRes.data.orders || [];
      const sorted = [...allOrders].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      setRecentOrders(sorted.slice(0, 5));
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Failed to load dashboard.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // Build bar chart data from recent orders grouped by date
  const buildBarData = () => {
    const map = {};
    recentOrders.forEach((o) => {
      const day = new Date(o.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      });
      map[day] = (map[day] || 0) + 1;
    });
    return Object.entries(map).map(([date, orders]) => ({ date, orders }));
  };

  const STATUS_COLORS = {
    Pending: "bg-yellow-100 text-yellow-700",
    Preparing: "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
    Canceled: "bg-red-100 text-red-700",
    "Out for Delivery": "bg-purple-100 text-purple-700",
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-4xl mb-3">😕</div>
          <p className="text-red-500 font-medium mb-3">{error}</p>
          <button
            onClick={fetchDashboard}
            className="bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <button
          onClick={fetchDashboard}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-xl text-sm transition-all active:scale-95"
        >
          🔄 Refresh
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Customers"
          value={stats.users}
          icon="👥"
          color="bg-blue-50"
        />
        <StatCard
          title="Total Orders"
          value={stats.orders}
          icon="📦"
          color="bg-orange-50"
        />
        <StatCard
          title="Revenue (INR)"
          value={`₹${stats.revenue}`}
          icon="💰"
          color="bg-green-50"
        />
        <StatCard
          title="Active Today"
          value={
            recentOrders.filter((o) => {
              const today = new Date().toDateString();
              return new Date(o.createdAt).toDateString() === today;
            }).length
          }
          icon="🔥"
          color="bg-red-50"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie chart — order status */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 mb-1">
            Order Status Breakdown
          </h2>
          <p className="text-xs text-gray-400 mb-4">
            Distribution of all orders by status
          </p>
          {orderStatus.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
              No order data yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={orderStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {orderStatus.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(v) => (
                    <span className="text-xs text-gray-600">{v}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Bar chart — orders per day */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 mb-1">
            Recent Order Activity
          </h2>
          <p className="text-xs text-gray-400 mb-4">
            Orders placed over recent days
          </p>
          {buildBarData().length === 0 ? (
            <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
              No recent orders
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={buildBarData()} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="orders"
                  name="Orders"
                  fill="#F97316"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Recent orders table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900">Recent Orders</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Last 5 orders across your restaurant
            </p>
          </div>
          <Link
            to="/admin/orders"
            className="text-xs text-orange-500 font-semibold hover:underline"
          >
            View all →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm">
            No orders yet
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Order
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Customer
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Items
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Total
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => {
                  const date = new Date(order.createdAt).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    },
                  );
                  return (
                    <tr
                      key={order._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <p className="text-xs font-mono font-bold text-gray-900">
                          #{order._id?.slice(-8).toUpperCase()}
                        </p>
                        <p className="text-xs text-gray-400">{date}</p>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold">
                            {(order.user?.name || "U")[0].toUpperCase()}
                          </div>
                          <span className="text-sm text-gray-700">
                            {order.user?.name || "Unknown"}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm text-gray-600">
                          {order.items?.length} item
                          {order.items?.length !== 1 ? "s" : ""}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-gray-900">
                          ₹{(parseFloat(order.totalPrice || 0) * 83).toFixed(0)}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            STATUS_COLORS[order.status] ||
                            "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Manage Orders",
            to: "/admin/orders",
            icon: "📦",
            color: "bg-orange-50 hover:bg-orange-100 border-orange-100",
          },
          {
            label: "Manage Menu",
            to: "/admin/manage-menu",
            icon: "🍽️",
            color: "bg-blue-50 hover:bg-blue-100 border-blue-100",
          },
          {
            label: "Manage Coupons",
            to: "/admin/coupons",
            icon: "🎟️",
            color: "bg-purple-50 hover:bg-purple-100 border-purple-100",
          },
          {
            label: "Manage Restaurant",
            to: "/admin/manage-restaurant",
            icon: "🏪",
            color: "bg-green-50 hover:bg-green-100 border-green-100",
          },
        ].map((action) => (
          <Link
            key={action.to}
            to={action.to}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border text-center transition-all duration-200 ${action.color}`}
          >
            <span className="text-2xl">{action.icon}</span>
            <span className="text-xs font-semibold text-gray-700">
              {action.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
