// src/pages/CartPage.jsx
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosIntance";
import { CartItem } from "../../components/Card"; // Ensure you have this component
import { loadStripe } from "@stripe/stripe-js";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartData, setCartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch cart items from the backend
  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/cart");
      setCartItems(data.cart.items || []);
      setCartData(data.cart);
      setFinalAmount(data.cart.totalPrice || 0);
      setError(null);
    } catch (err) {
      setError("No items in the cart to show.");
    } finally {
      setLoading(false);
    }
  };

  // Remove an item from the cart
  const handleRemoveItem = async (foodItemId) => {
    try {
      const response = await axiosInstance.delete("/cart/remove", {
        data: { foodItemId },
      });
      if (response.data.success) {
        toast.success("Item removed successfully!");
        fetchCartItems(); // Refresh cart after removal
      } else {
        toast.error("Failed to remove item.");
      }
    } catch (err) {
      toast.error("Error removing item from cart.");
    }
  };

  // Update quantity of an item
  const handleQuantityChange = async (foodItemId, quantity) => {
    try {
      const response = await axiosInstance.put("/cart/update", {
        foodItemId,
        quantity,
      });
      if (response.data.success) {
        toast.success("Cart updated!");
        fetchCartItems(); // Refresh cart after update
      } else {
        toast.error("Failed to update cart.");
      }
    } catch (err) {
      toast.error("Error updating cart.");
    }
  };

  // Apply a coupon code
  const applyCoupon = async () => {
    try {
      const response = await axiosInstance.post("/coupons/checkout", {
        couponCode,
        cartId: cartData._id,
      });
      if (response.data.success) {
        setDiscount(response.data.discount || 0);
        setFinalAmount(response.data.finalAmount || cartData.totalPrice);
        toast.success("Coupon applied successfully!");
      } else {
        toast.error("Invalid coupon code.");
      }
    } catch (err) {
      toast.error("Failed to apply coupon.");
    }
  };

  // Handle payment
  const makePayment = async () => {
    setPaymentLoading(true);
    try {
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
      );
      if (!stripe) {
        toast.error("Stripe failed to load.");
        return;
      }

      const { data } = await axiosInstance.post(
        "/payment/create-checkout-session",
        {
          products: cartItems,
          amountInCents: Math.max(finalAmount * 100, 5000), // Minimum charge of ₹50
        }
      );

      if (data.sessionId) {
        const result = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });
        if (result.error) {
          toast.error("Payment failed. Please try again.");
        }
      } else {
        toast.error("Error creating checkout session.");
      }
    } catch (err) {
      toast.error("Payment error. Please try again.");
    } finally {
      setPaymentLoading(false);
    }
  };

  // Fetch cart items on page load
  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="container mx-auto px-4 py-5">
      <div className="row g-4">
        {/* Cart Items Section */}
        <div className="col-md-8">
          <div className="card shadow-lg p-4 bg-white rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
            {loading ? (
              <p className="text-gray-500">Loading cart items...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem
                  key={item.foodItem._id}
                  item={item}
                  onRemove={() => handleRemoveItem(item.foodItem._id)}
                  onQuantityChange={(quantity) =>
                    handleQuantityChange(item.foodItem._id, quantity)
                  }
                />
              ))
            ) : (
              <p className="text-gray-500">Your cart is empty.</p>
            )}
          </div>
        </div>

        {/* Price Summary Section */}
        <div className="col-md-4">
          <div className="card shadow-lg bg-light p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-center mb-4">
              Price Summary
            </h2>
            <p className="text-lg font-medium">
              Total Price:{" "}
              <span className="text-primary">
                ${cartData.totalPrice?.toFixed(2)}
              </span>
            </p>

            {/* Coupon Section */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Have a coupon?</h3>
              <div className="input-group">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="form-control"
                />
                <button onClick={applyCoupon} className="btn btn-primary">
                  Apply
                </button>
              </div>
            </div>

            {/* Discount Information */}
            {discount > 0 && (
              <div className="mt-3 text-success">
                <p>Discount: -${discount.toFixed(2)}</p>
              </div>
            )}

            {/* Final Amount */}
            <p className="mt-4 text-lg font-medium">
              Final Amount:{" "}
              <span className="text-success">${finalAmount.toFixed(2)}</span>
            </p>

            {/* Payment Button */}
            <button
              className={`btn btn-success w-100 mt-4 ${
                paymentLoading ? "disabled" : ""
              }`}
              onClick={makePayment}
              disabled={loading || paymentLoading}
            >
              {paymentLoading ? "Processing Payment..." : "Proceed to Payment"}
            </button>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};
