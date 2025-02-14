// export default CartPage;
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosIntance";
import { toast, ToastContainer } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import "react-toastify/dist/ReactToastify.css";
import CartCard from "../../components/user/CartCard";

export const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartData, setCartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(""); // Track the applied coupon
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Fetch cart items from backend
  const fetchCartItems = async () => {
    try {
      const { data } = await axiosInstance.get("/cart/getcart");
      if (data.success) {
        setCartItems(data.cart.items || []);
        setCartData(data.cart);
        setFinalAmount(data.cart.totalPrice || 0);
      } else {
        throw new Error("Failed to load cart items");
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
      const { data } = await axiosInstance.delete("/cart/remove", {
        data: { foodItemId },
      });

      console.log("Delete response:", data); //  Debugging log

      if (!data.success) return toast.error("Failed to remove item.");

      toast.success("Item removed successfully!");

      // Safe state update for cart items
      setCartItems((prevItems = []) => {
        const updatedItems = prevItems.filter(
          (item) => item.foodItem?._id !== foodItemId
        );

        // Recalculate total amount
        const updatedTotal = updatedItems.reduce(
          (sum, item) => sum + item.foodItem?.price * item.quantity,
          0
        );

        // Apply discount if any
        const updatedFinalAmount = updatedTotal - (discount || 0);

        // Update the state
        setFinalAmount(updatedFinalAmount);
        setCartData({ ...cartData, totalPrice: updatedTotal });

        return updatedItems;
      });
    } catch (err) {
      console.error("Error removing item:", err.message || err);
      toast.error("Could not remove item.");
    }
  };

  // Update item quantity in the cart
  const handleUpdateQuantity = async (foodItemId, quantity) => {
    if (quantity <= 0) {
      toast.error("Quantity must be at least 1.");
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

  const applyCoupon = async () => {
    if (!couponCode) return;

    try {
      const response = await axiosInstance.post("/coupons/apply", {
        couponCode,
        cartTotal: cartData.totalPrice,
      });

      if (response.data.success) {
        const { discount, finalAmount } = response.data;
        setDiscount(discount);
        setFinalAmount(finalAmount);
        setAppliedCoupon(couponCode);
        toast.success("Coupon applied successfully!");
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      toast.error(error.response?.data?.message || "Failed to apply coupon.");
    }
  };

  // Checkout with discount
  const makePayment = async () => {
    if (finalAmount < 41) {
      toast.error("Cart total must be at least ₹41 to proceed to payment.");
      return;
    }

    setPaymentLoading(true);
    try {
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_Publishable_key
      );
      const response = await axiosInstance.post(
        "/payment/create-checkout-session",
        {
          cartItems,
          discount,
        }
      );

      if (response.data.success) {
        await stripe.redirectToCheckout({ sessionId: response.data.sessionId });
      } else {
        toast.error(
          response.data.message || "Failed to create checkout session."
        );
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.message || "Failed to process payment.");
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
      />

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
          ) : cartItems?.length > 0 ? (
            cartItems.map((item) => (
              <CartCard
                key={item.foodItem._id}
                foodItem={item.foodItem}
                quantity={item.quantity}
                onRemove={handleRemoveItem}
                onUpdateQuantity={handleUpdateQuantity}
              />
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
            Total Price: ₹{cartData.totalPrice?.toFixed(2)}
          </p>
          {discount > 0 && (
            <p className="text-green-600">Discount: -₹{discount.toFixed(2)}</p>
          )}
          <p className="text-lg">Final Amount: ₹{finalAmount.toFixed(2)}</p>
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
              className="w-full bg-blue-600 text-white py-2 rounded-md mt-2"
            >
              {loading ? "Applying..." : "Apply Coupon"}
            </button>
          </div>
          <button
            onClick={makePayment}
            disabled={loading || paymentLoading}
            className="w-full mt-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md"
          >
            {paymentLoading ? "Processing Payment..." : "Proceed to Payment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
