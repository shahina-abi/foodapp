// export default ManageOrders;
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosIntance";
import toast from "react-hot-toast";
import Sidebar from "../../components/admin/SideBar";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const restaurantId = localStorage.getItem("restaurantId"); // Get `restaurantId`
        if (!restaurantId) {
          toast.error("❌ No restaurant found for this admin.");
          return;
        }

        console.log("Fetching orders for restaurantId:", restaurantId); // Debug log

        const token = localStorage.getItem("adminToken"); // Get admin token
        if (!token) {
          toast.error("❌ No token found. Please log in again.");
          return;
        }

        const { data } = await axiosInstance.get(
          `/admin/orders?restaurantId=${restaurantId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        console.log("API Response:", data); // Debug log

        if (data.orders.length === 0) {
          toast("No orders found for your restaurant."); // Use toast instead of toast.info
        }

        setOrders(data.orders);
      } catch (err) {
        console.error("Failed to fetch orders:", err); // Log the full error object
        toast.error("Failed to fetch orders. Please try again later."); // Show error toast
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch orders. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axiosInstance.put(`/admin/orders/${orderId}`, {
        status: newStatus,
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success("Order status updated!");
    } catch (err) {
      toast.error("Failed to update order");
    }
  };

  if (loading) return <p className="text-center">Loading orders...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      <div className="w-full p-6">
        <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>
        <div className="overflow-x-auto bg-white p-6 rounded-lg shadow">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 border">Order ID</th>
                <th className="p-3 border">User</th>
                <th className="p-3 border">Items</th>
                <th className="p-3 border">Total Price</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="text-center">
                  <td className="p-3 border">{order._id}</td>
                  <td className="p-3 border">
                    {order.user?.name || "Unknown"}
                  </td>
                  <td className="p-3 border">
                    <ul>
                      {order.items.map((item) => (
                        <li key={item.foodItem._id}>
                          {item.foodItem.name} x {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-3 border">₹{order.totalPrice}</td>
                  <td className="p-3 border">
                    <span
                      className={`px-2 py-1 rounded ${
                        order.status === "Delivered"
                          ? "bg-green-500 text-white"
                          : order.status === "Pending"
                          ? "bg-yellow-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 border">
                    <select
                      className="p-2 border rounded"
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order._id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Canceled">Canceled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
