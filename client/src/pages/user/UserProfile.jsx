import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function UserProfile() {
  const [user, setUser] = useState(null); // User data
  const [orders, setOrders] = useState([]); // Orders list
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch user and order data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user profile data
        const userRes = await axios.get("/api/user/profile");
        setUser(userRes.data.user);

        // Fetch user orders
        const ordersRes = await axios.get("/api/orders/user");
        setOrders(ordersRes.data.orders);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
        {/* User Info Section */}
        <div className="flex items-center space-x-4 border-b pb-4 mb-4">
          <img
            src="https://via.placeholder.com/80"
            alt="User Avatar"
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold">{user?.name || "User Name"}</h2>
            <p className="text-gray-600">{user?.email || "user@example.com"}</p>
          </div>
        </div>

        {/* My Orders Button */}
        <div className="flex justify-end">
          <Link
            to="/orders"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md shadow-md transition duration-300"
          >
            My Orders
          </Link>
        </div>

        {/* Orders List */}
        <h3 className="text-xl font-bold mt-8 mb-4">Order History</h3>
        {orders.length === 0 ? (
          <p className="text-gray-600">No orders found.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="p-4 bg-gray-50 shadow rounded-md flex justify-between items-center"
              >
                <div>
                  <h4 className="font-bold text-lg">Order #{order._id}</h4>
                  <p className="text-gray-600">
                    {order.items.length} item(s) - Total: ${order.totalPrice}
                  </p>
                  <p className="text-sm text-gray-500">
                    Status: {order.status || "Pending"}
                  </p>
                </div>
                <Link
                  to={`/orders/${order._id}`}
                  className="text-orange-500 hover:text-orange-600"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
