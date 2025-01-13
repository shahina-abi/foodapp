import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosIntance";
import toast from "react-hot-toast";
import Loading from "../../components/user/Loading";

const PaymentSuccess = ({ clearCart }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("PaymentSuccess triggered: clearing cart");

    // Clear cart on the server
    axiosInstance
      .delete("/cart/clear", { withCredentials: true })
      .then((response) => {
        console.log("Cart cleared successfully:", response.data);
        clearCart(); // Clear cart on the client
        toast.success(response.data.message || "Cart cleared successfully!");
      })
      .catch((error) => {
        console.error(
          "Error clearing cart:",
          error.response?.data || error.message
        );
        toast.error("Failed to clear the cart. Try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [clearCart]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="payment-success-container text-center p-4 rounded shadow-lg">
        <h2 className="text-success mb-3">Payment Successful!</h2>
        <p className="text-secondary mb-4">
          Thank you for your order. Your payment has been processed
          successfully.
        </p>
        <Link to="/">
          <button className="btn btn-primary">Back To Home</button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
