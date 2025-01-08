import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosIntance";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { toast, ToastContainer } from "react-toastify";
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
      const { data } = await axiosInstance.get("/cart/getcart");
      setCartItems(data.cart.fooditems || []);
      setCartData(data.cart);
      setFinalAmount(data.cart.totalPrice || 0);
      setError(null);
    } catch (err) {
      setError("No items in the cart to show.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (foodItemId) => {
    try {
      const response = await axiosInstance.delete("/cart/remove", {
        data: { foodItemId },
      });
      if (response.data.success) {
        toast.success("Item removed successfully!");
        fetchCartItems();
      } else {
        toast.error("Failed to remove item.");
      }
    } catch (err) {
      toast.error("Error removing item from cart.");
    }
  };

  const handleQuantityChange = async (foodItemId, quantity) => {
    try {
      const response = await axiosInstance.put("/cart/update", {
        foodItemId,
        quantity,
      });
      if (response.data.success) {
        toast.success("Cart updated!");
        fetchCartItems();
      } else {
        toast.error("Failed to update cart.");
      }
    } catch (err) {
      toast.error("Error updating cart.");
    }
  };

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
          amountInCents: Math.max(finalAmount * 100, 5000),
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

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
      />

      {/* Cart Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items Section */}
        <div className="lg:col-span-2 bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Your Cart
          </h2>
          {loading ? (
            <p className="text-gray-500">Loading cart items...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.foodItem._id}
                className="flex justify-between items-center py-4 border-b"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-800">
                    {item.foodItem.name}
                  </h3>
                  <p className="text-gray-600">Price: ${item.foodItem.price}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <div className="flex space-x-4 items-center">
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      handleQuantityChange(
                        item.foodItem._id,
                        parseInt(e.target.value)
                      )
                    }
                    className="border rounded-md px-2 w-16"
                  />
                  <button
                    onClick={() => handleRemoveItem(item.foodItem._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
        </div>

        {/* Price Summary Section */}
        <div className="bg-gray-100 shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Price Summary
          </h2>
          <p className="text-lg">
            Total Price:{" "}
            <span className="font-semibold">
              ${cartData.totalPrice?.toFixed(2)}
            </span>
          </p>
          {discount > 0 && (
            <p className="text-green-600">Discount: -${discount.toFixed(2)}</p>
          )}
          <p className="text-lg">
            Final Amount:{" "}
            <span className="font-semibold text-green-600">
              ${finalAmount.toFixed(2)}
            </span>
          </p>

          {/* Coupon Section */}
          <div className="mt-4">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="w-full border rounded-md p-2"
            />
            <button
              onClick={applyCoupon}
              className="w-full bg-blue-600 text-white py-2 rounded-md mt-2 hover:bg-blue-700"
            >
              Apply Coupon
            </button>
          </div>

          <button
            onClick={makePayment}
            disabled={loading || paymentLoading}
            className={`w-full mt-4 py-2 text-white rounded-md ${
              paymentLoading ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {paymentLoading ? "Processing Payment..." : "Proceed to Payment"}
          </button>
        </div>
      </div>
    </div>
  );
};
