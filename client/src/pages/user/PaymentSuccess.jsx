// // export default PaymentSuccess;
// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { axiosInstance } from "../../config/axiosIntance";
// import toast from "react-hot-toast";

// const PaymentSuccess = () => {
//   const location = useLocation();
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Extract the session ID from the query parameters
//   const queryParams = new URLSearchParams(location.search);
//   const sessionId = queryParams.get("session_id");
//   // clear cart
//   const clearCart = async () => {
//     try {
//       const response = await axiosInstance.delete("/cart/clear");
//       if (response.data.success) {
//         toast.success("Cart cleared successfully!");
//       } else {
//         toast.error("Failed to clear cart.");
//       }
//     } catch (error) {
//       console.error("Error clearing cart:", error.message);
//       // toast.error("Could not clear cart.");
//     }
//   };
//   // Fetch session status
//   const fetchSessionStatus = async (sessionId) => {
//     try {
//       const response = await axiosInstance.get(
//         `/payment/session-status?session_id=${sessionId}`
//       );
//       if (response.data.success) {
//         console.log("Payment Details:", response.data);
//         setOrderDetails(response.data.order); // Save the order details to state
//         toast.success("Payment confirmed! Your order is being processed.");
//         // Clear cart after successful payment
//         clearCart();
//       } else {
//         toast.error(response.data.message || "Failed to confirm payment.");
//         setError(response.data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching session status:", error.message);
//       toast.error("An error occurred while confirming the payment.");
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (sessionId) {
//       fetchSessionStatus(sessionId);
//     } else {
//       setError("Missing session ID. Unable to verify payment.");
//       setLoading(false);
//     }
//   }, [sessionId]);

//   if (loading) {
//     return <div>Loading payment confirmation...</div>;
//   }

//   if (error) {
//     return <div className="text-red-500">{error}</div>;
//   }

//   // Place the return block you shared here
//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
//       <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
//       <h2 className="text-xl font-semibold mt-4">Order Details</h2>
//       <ul className="mt-4">
//         {orderDetails?.items?.length > 0 ? (
//           orderDetails.items.map((item) => (
//             <li key={item.foodItem?._id || "unknown"} className="border-b py-2">
//               {item.foodItem?.name || "Unknown Item"} - ₹
//               {item.foodItem?.price || 0} x {item.quantity || 0}
//             </li>
//           ))
//         ) : (
//           <p>No items found in this order.</p>
//         )}
//       </ul>
//       <p className="mt-4 text-lg">
//         <strong>Total Price:</strong> ₹{orderDetails?.totalPrice || 0}
//       </p>
//       {orderDetails?.discount > 0 && (
//         <p className="mt-2 text-green-600">
//           <strong>Discount:</strong> -₹{orderDetails?.discount || 0}
//         </p>
//       )}
//       <p className="mt-2 text-lg">
//         <strong>Final Price:</strong> ₹{orderDetails?.finalPrice || 0}
//       </p>
//     </div>
//   );
// };

// export default PaymentSuccess;
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { axiosInstance } from "../../config/axiosIntance";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");

  const clearCart = async () => {
    try {
      await axiosInstance.delete("/cart/clear");
    } catch {}
  };

  const fetchSessionStatus = async (sessionId) => {
    try {
      const response = await axiosInstance.get(
        `/payment/session-status?session_id=${sessionId}`,
      );
      if (response.data.success) {
        setOrderDetails(response.data.order);
        clearCart();
      } else {
        setError(response.data.message || "Failed to confirm payment.");
      }
    } catch (error) {
      setError("An error occurred while confirming your payment.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sessionId) fetchSessionStatus(sessionId);
    else {
      setError("Missing session ID.");
      setLoading(false);
    }
  }, [sessionId]);

  // ── Loading
  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">
            Confirming your payment...
          </p>
        </div>
      </div>
    );

  // ── Error
  if (error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <Link
            to="/restaurants"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition-all"
          >
            Back to Restaurants
          </Link>
        </div>
      </div>
    );

  const subtotal = parseFloat(orderDetails?.totalPrice || 0) * 83;
  const disc = parseFloat(orderDetails?.discount || 0) * 83;
  const final = parseFloat(orderDetails?.finalPrice || 0) * 83;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success header */}
        <div className="text-center mb-8">
          {/* Animated checkmark */}
          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-200">
            <svg
              width="36"
              height="36"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Payment Successful! 🎉
          </h1>
          <p className="text-gray-500">
            Your order has been placed and is being prepared.
          </p>
        </div>

        {/* Order card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
          {/* Order ID header */}
          <div className="bg-orange-500 px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-xs font-medium uppercase tracking-wide">
                Order ID
              </p>
              <p className="text-white font-mono font-bold text-sm truncate max-w-[240px]">
                {orderDetails?._id || sessionId?.slice(0, 20) + "..."}
              </p>
            </div>
            <div className="bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              ✅ Confirmed
            </div>
          </div>

          {/* Items list */}
          <div className="p-6">
            <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
              Order Items
            </h2>

            <div className="space-y-3">
              {orderDetails?.items?.length > 0 ? (
                orderDetails.items.map((item, i) => (
                  <div
                    key={item.foodItem?._id || i}
                    className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0"
                  >
                    {/* Food image */}
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      {item.foodItem?.image ? (
                        <img
                          src={item.foodItem.image}
                          alt={item.foodItem?.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl">
                          🍽️
                        </div>
                      )}
                    </div>
                    {/* Name + qty */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {item.foodItem?.name || "Unknown Item"}
                      </p>
                      <p className="text-xs text-gray-500">
                        ₹
                        {(parseFloat(item.foodItem?.price || 0) * 83).toFixed(
                          0,
                        )}{" "}
                        × {item.quantity}
                      </p>
                    </div>
                    {/* Line total */}
                    <p className="text-sm font-bold text-gray-900 flex-shrink-0">
                      ₹
                      {(
                        parseFloat(item.foodItem?.price || 0) *
                        83 *
                        item.quantity
                      ).toFixed(0)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm text-center py-4">
                  No items found
                </p>
              )}
            </div>

            {/* Price breakdown */}
            <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(0)}</span>
              </div>
              {disc > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>−₹{disc.toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-extrabold text-gray-900 pt-2 border-t border-gray-100">
                <span>Total Paid</span>
                <span className="text-orange-500">
                  ₹{final > 0 ? final.toFixed(0) : subtotal.toFixed(0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Status tracker */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Order Status</h3>
          <div className="flex items-center gap-0">
            {["Order Placed", "Preparing", "On the Way", "Delivered"].map(
              (step, i) => (
                <React.Fragment key={step}>
                  <div className="flex flex-col items-center gap-1.5 flex-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        i === 0
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {i === 0 ? "✓" : i + 1}
                    </div>
                    <span
                      className={`text-xs text-center leading-tight ${
                        i === 0
                          ? "text-orange-500 font-semibold"
                          : "text-gray-400"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                  {i < 3 && (
                    <div
                      className={`h-0.5 flex-1 mb-5 ${i === 0 ? "bg-orange-200" : "bg-gray-100"}`}
                    />
                  )}
                </React.Fragment>
              ),
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/user/orders"
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl text-center transition-all active:scale-95"
          >
            View My Orders
          </Link>
          <Link
            to="/restaurants"
            className="flex-1 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3.5 rounded-xl text-center transition-all"
          >
            Order Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
