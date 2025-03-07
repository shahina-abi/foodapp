// export default PaymentSuccess;
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosInstance } from "../../config/axiosIntance";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract the session ID from the query parameters
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");
  // clear cart
  const clearCart = async () => {
    try {
      const response = await axiosInstance.delete("/cart/clear");
      if (response.data.success) {
        toast.success("Cart cleared successfully!");
      } else {
        toast.error("Failed to clear cart.");
      }
    } catch (error) {
      console.error("Error clearing cart:", error.message);
      // toast.error("Could not clear cart.");
    }
  };
  // Fetch session status
  const fetchSessionStatus = async (sessionId) => {
    try {
      const response = await axiosInstance.get(
        `/payment/session-status?session_id=${sessionId}`
      );
      if (response.data.success) {
        console.log("Payment Details:", response.data);
        setOrderDetails(response.data.order); // Save the order details to state
        toast.success("Payment confirmed! Your order is being processed.");
        // Clear cart after successful payment
        clearCart();
      } else {
        toast.error(response.data.message || "Failed to confirm payment.");
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching session status:", error.message);
      toast.error("An error occurred while confirming the payment.");
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionStatus(sessionId);
    } else {
      setError("Missing session ID. Unable to verify payment.");
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return <div>Loading payment confirmation...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // Place the return block you shared here
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
      <h2 className="text-xl font-semibold mt-4">Order Details</h2>
      <ul className="mt-4">
        {orderDetails?.items?.length > 0 ? (
          orderDetails.items.map((item) => (
            <li key={item.foodItem?._id || "unknown"} className="border-b py-2">
              {item.foodItem?.name || "Unknown Item"} - ₹
              {item.foodItem?.price || 0} x {item.quantity || 0}
            </li>
          ))
        ) : (
          <p>No items found in this order.</p>
        )}
      </ul>
      <p className="mt-4 text-lg">
        <strong>Total Price:</strong> ₹{orderDetails?.totalPrice || 0}
      </p>
      {orderDetails?.discount > 0 && (
        <p className="mt-2 text-green-600">
          <strong>Discount:</strong> -₹{orderDetails?.discount || 0}
        </p>
      )}
      <p className="mt-2 text-lg">
        <strong>Final Price:</strong> ₹{orderDetails?.finalPrice || 0}
      </p>
    </div>
  );
};

export default PaymentSuccess;
