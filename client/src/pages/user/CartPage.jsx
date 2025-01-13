import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosIntance";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartCard from "../../components/user/CartCard";

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
    try {
      const { data } = await axiosInstance.get("/cart/getcart");

      if (data.success && data.cart) {
        setCartItems(data.cart.items || []);
        setCartData(data.cart);
        setFinalAmount(data.cart.totalPrice || 0);
        setError(null);
      } else {
        setCartItems([]);
        setCartData({});
        setFinalAmount(0);
        setError("No items in the cart to show.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching cart.");
      setCartItems([]);
      setCartData({});
      setFinalAmount(0);
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
    if (isNaN(quantity) || quantity <= 0) {
      toast.error("Invalid quantity. Please enter a valid number.");
      return;
    }
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

  // const applyCoupon = async () => {
  //   try {
  //     const response = await axiosInstance.post("/coupons/checkout", {
  //       couponCode,
  //       cartId: cartData._id,
  //     });
  //     if (response.data.success) {
  //       setDiscount(response.data.discount || 0);
  //       setFinalAmount(response.data.finalAmount || cartData.totalPrice);
  //       toast.success("Coupon applied successfully!");
  //     } else {
  //       toast.error("Invalid coupon code.");
  //     }
  //   } catch (err) {
  //     toast.error("Failed to apply coupon.");
  //   }
  // };
  const applyCoupon = async () => {
    setLoading(true); // Show loading indicator
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
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  // const makePayment = async () => {
  //   try {
  //     const stripe = await loadStripe(
  //       import.meta.env.VITE_STRIPE_Publishable_key
  //     );

  //     const session = await axiosInstance({
  //       url: "/payment/create-checkout-session",
  //       method: "POST",
  //       data: { cartItems: cartItems?.items },
  //     });

  //     console.log(session, "=======session");
  //     const result = stripe.redirectToCheckout({
  //       // sessionId: session.data.sessionId,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const makePayment = async () => {
  //   setPaymentLoading(true);
  //   try {
  //     const stripe = await loadStripe(
  //       import.meta.env.VITE_STRIPE_Publishable_key
  //     );

  //     const session = await axiosInstance.post(
  //       "/payment/create-checkout-session",
  //       {
  //         cartItems, // Send correctly formatted cart items
  //       }
  //     );

  //     if (session.data.success) {
  //       await stripe.redirectToCheckout({ sessionId: session.data.sessionId });
  //     } else {
  //       toast.error("Failed to initiate payment session.");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("An error occurred while processing the payment.");
  //   } finally {
  //     setPaymentLoading(false);
  //   }
  // };
  const makePayment = async () => {
    setPaymentLoading(true);
    try {
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_Publishable_key
      );

      const session = await axiosInstance.post(
        "/payment/create-checkout-session",
        {
          cartItems,
          discount, // Pass the applied discount
        }
      );

      if (session.data.success) {
        await stripe.redirectToCheckout({ sessionId: session.data.sessionId });
      } else {
        toast.error("Failed to initiate payment session.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while processing the payment.");
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
            <div>
              {cartItems.map((item) => (
                <CartCard
                  key={item.foodItem._id}
                  foodItem={item.foodItem}
                  quantity={item.quantity}
                  onRemove={handleRemoveItem}
                  onUpdateQuantity={handleQuantityChange}
                />
              ))}
            </div>
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
              disabled={loading || !couponCode.trim()}
              className={`w-full bg-blue-600 text-white py-2 rounded-md mt-2 ${
                loading ? "bg-gray-400 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
            >
              {loading ? "Applying..." : "Apply Coupon"}
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
