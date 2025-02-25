import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosIntance";
import { Link } from "react-router-dom";
import toast from "react-hot-toast"; // For notifications

const UserOrders = () => {
  const { theme } = useSelector((state) => state.theme);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/orders/user/orders");
        const sortedOrders = response.data.orders.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(sortedOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await axiosInstance.put(`/orders/${orderId}/cancel`);
      if (response.data.success) {
        toast.success("Order canceled successfully!");
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: "Canceled" } : order
          )
        );
      } else {
        toast.error("Failed to cancel order.");
      }
    } catch (error) {
      console.error("Error canceling order:", error);
      toast.error("Could not cancel order.");
    }
  };

  if (loading) return <p className="text-center">Loading orders...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
      {orders.length === 0 ? (
        <Link to="/" className="block text-center mt-10">
          <div className="text-center p-6 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg max-w-lg">
            <p className="font-medium text-gray-800">
              We are still waiting to take your first order!
            </p>
          </div>
        </Link>
      ) : (
        <>
          <h1 className="text-center font-bold text-3xl my-6 text-gray-800">
            Your Orders
          </h1>
          <div className="w-full max-w-3xl space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
              >
                {/* Order Date & Status */}
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    📅 {new Date(order.createdAt).toLocaleString()}
                  </p>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === "Canceled"
                        ? "bg-red-200 text-red-800"
                        : "bg-blue-200 text-blue-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Order Items */}
                <div className="mt-4">
                  {order.items.map((item) => (
                    <div
                      key={item.foodItem._id}
                      className="flex items-center space-x-4 border-b pb-3"
                    >
                      <img
                        src={item.foodItem.image || "/placeholder.jpg"}
                        alt={item.foodItem.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">
                          {item.foodItem.name}
                        </h3>
                        <p className="text-gray-600">
                          ₹{item.foodItem.price} x {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Total */}
                <p className="mt-4 font-semibold text-lg text-gray-800">
                  Total: ₹{order.finalPrice}{" "}
                  {order.discount > 0 && (
                    <span className="text-green-600 text-sm">
                      (-₹{order.discount} discount)
                    </span>
                  )}
                </p>

                {/* Cancel Order Button */}
                {order.status !== "Canceled" && (
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    className="w-full mt-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition duration-200"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserOrders;
