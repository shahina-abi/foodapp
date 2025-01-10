import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OrderDetails() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch user and order data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRes = await axios.get("/api/user/profile");
        setUser(userRes.data.user);

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

  // Open modal with order details
  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  // Cancel order
  const cancelOrder = async (orderId) => {
    try {
      const res = await axios.patch(`/api/orders/${orderId}/cancel`);
      if (res.data.success) {
        // Update orders list
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: "Canceled" } : order
          )
        );
        // Update selected order in the modal
        setSelectedOrder((prev) =>
          prev ? { ...prev, status: "Canceled" } : null
        );
        alert("Order canceled successfully");
      }
    } catch (error) {
      console.error("Failed to cancel order:", error);
      alert("Failed to cancel order. Please try again.");
    }
  };

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
                <button
                  onClick={() => openModal(order)}
                  className="text-orange-500 hover:text-orange-600"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-4/5 max-w-lg">
            <h3 className="text-2xl font-bold mb-4">Order Details</h3>
            <div className="space-y-2">
              <p>
                <strong>Order ID:</strong> {selectedOrder._id}
              </p>
              <p>
                <strong>Total Price:</strong> ${selectedOrder.totalPrice}
              </p>
              <p>
                <strong>Status:</strong> {selectedOrder.status || "Pending"}
              </p>
              <p>
                <strong>Payment Method:</strong> {selectedOrder.paymentMethod}
              </p>
              <h4 className="font-bold mt-4">Items:</h4>
              <ul className="list-disc ml-5">
                {selectedOrder.items.map((item, index) => (
                  <li key={index}>
                    {item.foodItem.name} - ${item.foodItem.price} x{" "}
                    {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition duration-300"
              >
                Close
              </button>
              {selectedOrder.status !== "Canceled" && (
                <button
                  onClick={() => cancelOrder(selectedOrder._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
