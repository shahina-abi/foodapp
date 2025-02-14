import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosIntance";
import { Link } from "react-router-dom";

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

  const textColor = theme ? "text-black" : "text-white";

  if (loading) {
    return <p className="text-center">Loading orders...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen p-4">
      {orders.length === 0 ? (
        <Link to="/" className="block text-center mt-10">
          <div className="text-center p-6 bg-gray-200 dark:bg-gray-800 rounded-lg">
            <p className={`font-medium ${textColor}`}>
              We are still waiting to take your first order!
            </p>
          </div>
        </Link>
      ) : (
        <>
          <h1 className={`text-center font-bold text-2xl my-5 ${textColor}`}>
            Your Orders
          </h1>
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className={`p-4 rounded-lg shadow ${
                  theme ? "bg-yellow-100" : "bg-gray-300"
                }`}
              >
                <h2 className="font-bold text-lg">Order ID: {order._id}</h2>
                <p className="text-sm text-gray-600">
                  Placed on: {new Date(order.createdAt).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Status: {order.status}</p>
                <div className="mt-4 space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.foodItem._id}
                      className="flex justify-between"
                    >
                      <span>{item.foodItem.name}</span>
                      <span>
                        ₹{item.foodItem.price} x {item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 font-semibold">
                  Total: ₹{order.finalPrice}{" "}
                  {order.discount > 0 && (
                    <span className="text-green-600">
                      (-₹{order.discount} discount)
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserOrders;
