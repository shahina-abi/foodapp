// // // export default CartPage;
// // import React, { useEffect, useState } from "react";
// // import { axiosInstance } from "../../config/axiosIntance";
// // import { toast, ToastContainer } from "react-toastify";
// // import { loadStripe } from "@stripe/stripe-js";
// // import "react-toastify/dist/ReactToastify.css";
// // import CartCard from "../../components/user/CartCard";

// // export const CartPage = () => {
// //   const [cartItems, setCartItems] = useState([]);
// //   const [cartData, setCartData] = useState({});
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [couponCode, setCouponCode] = useState("");
// //   const [appliedCoupon, setAppliedCoupon] = useState(""); // Track the applied coupon
// //   const [discount, setDiscount] = useState(0);
// //   const [finalAmount, setFinalAmount] = useState(0);
// //   const [paymentLoading, setPaymentLoading] = useState(false);

// //   useEffect(() => {
// //     fetchCartItems();
// //   }, []);

// //   // Fetch cart items from backend
// //   const fetchCartItems = async () => {
// //     try {
// //       const { data } = await axiosInstance.get("/cart/getcart");
// //       if (data.success) {
// //         setCartItems(data.cart.items || []);
// //         setCartData(data.cart);
// //         setFinalAmount(data.cart.totalPrice || 0);
// //       } else {
// //         throw new Error("Failed to load cart items");
// //       }
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Error fetching cart.");
// //       setCartItems([]);
// //       setCartData({});
// //       setFinalAmount(0);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// //   const handleRemoveItem = async (foodItemId) => {
// //     try {
// //       const { data } = await axiosInstance.delete("/cart/remove", {
// //         data: { foodItemId },
// //       });

// //       console.log("Delete response:", data); //  Debugging log

// //       if (!data.success) return toast.error("Failed to remove item.");

// //       toast.success("Item removed successfully!");

// //       // Safe state update for cart items
// //       setCartItems((prevItems = []) => {
// //         const updatedItems = prevItems.filter(
// //           (item) => item.foodItem?._id !== foodItemId
// //         );

// //         // Recalculate total amount
// //         const updatedTotal = updatedItems.reduce(
// //           (sum, item) => sum + item.foodItem?.price * item.quantity,
// //           0
// //         );

// //         // Apply discount if any
// //         const updatedFinalAmount = updatedTotal - (discount || 0);

// //         // Update the state
// //         setFinalAmount(updatedFinalAmount);
// //         setCartData({ ...cartData, totalPrice: updatedTotal });

// //         return updatedItems;
// //       });
// //     } catch (err) {
// //       console.error("Error removing item:", err.message || err);
// //       toast.error("Could not remove item.");
// //     }
// //   };

// //   // Update item quantity in the cart
// //   const handleUpdateQuantity = async (foodItemId, quantity) => {
// //     if (quantity <= 0) {
// //       toast.error("Quantity must be at least 1.");
// //       return;
// //     }
// //     try {
// //       const response = await axiosInstance.put("/cart/update", {
// //         foodItemId,
// //         quantity,
// //       });
// //       if (response.data.success) {
// //         toast.success("Cart updated!");
// //         fetchCartItems();
// //       } else {
// //         toast.error("Failed to update cart.");
// //       }
// //     } catch (err) {
// //       toast.error("Error updating cart.");
// //     }
// //   };

// //   const applyCoupon = async () => {
// //     if (!couponCode) return;

// //     try {
// //       const response = await axiosInstance.post("/coupons/apply", {
// //         couponCode,
// //         cartTotal: cartData.totalPrice,
// //       });

// //       if (response.data.success) {
// //         const { discount, finalAmount } = response.data;
// //         setDiscount(discount);
// //         setFinalAmount(finalAmount);
// //         setAppliedCoupon(couponCode);
// //         toast.success("Coupon applied successfully!");
// //       }
// //     } catch (error) {
// //       console.error("Error applying coupon:", error);
// //       toast.error(error.response?.data?.message || "Failed to apply coupon.");
// //     }
// //   };

// //   // Checkout with discount
// //   const makePayment = async () => {
// //     if (finalAmount < 41) {
// //       toast.error("Cart total must be at least ₹41 to proceed to payment.");
// //       return;
// //     }

// //     setPaymentLoading(true);
// //     try {
// //       const stripe = await loadStripe(
// //         import.meta.env.VITE_STRIPE_Publishable_key
// //       );
// //       const response = await axiosInstance.post(
// //         "/payment/create-checkout-session",
// //         {
// //           cartItems,
// //           discount,
// //         }
// //       );

// //       if (response.data.success) {
// //         await stripe.redirectToCheckout({ sessionId: response.data.sessionId });
// //       } else {
// //         toast.error(
// //           response.data.message || "Failed to create checkout session."
// //         );
// //       }
// //     } catch (error) {
// //       console.error("Payment error:", error);
// //       toast.error(error.message || "Failed to process payment.");
// //     } finally {
// //       setPaymentLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="max-w-7xl mx-auto p-6">
// //       <ToastContainer
// //         position="top-center"
// //         autoClose={5000}
// //         hideProgressBar={false}
// //       />

// //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //         {/* Cart Items Section */}
// //         <div className="lg:col-span-2 bg-white shadow rounded-lg p-6">
// //           <h2 className="text-2xl font-semibold mb-4 text-gray-800">
// //             Your Cart
// //           </h2>
// //           {loading ? (
// //             <p className="text-gray-500">Loading cart items...</p>
// //           ) : error ? (
// //             <p className="text-red-500">{error}</p>
// //           ) : cartItems?.length > 0 ? (
// //             cartItems.map((item) => (
// //               <CartCard
// //                 key={item.foodItem._id}
// //                 foodItem={item.foodItem}
// //                 quantity={item.quantity}
// //                 onRemove={handleRemoveItem}
// //                 onUpdateQuantity={handleUpdateQuantity}
// //               />
// //             ))
// //           ) : (
// //             <p className="text-gray-500">Your cart is empty.</p>
// //           )}
// //         </div>

// //         {/* Price Summary Section */}
// //         <div className="bg-gray-100 shadow rounded-lg p-6">
// //           <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
// //             Price Summary
// //           </h2>
// //           <p className="text-lg">
// //             Total Price: ₹{cartData.totalPrice?.toFixed(2)}
// //           </p>
// //           {discount > 0 && (
// //             <p className="text-green-600">Discount: -₹{discount.toFixed(2)}</p>
// //           )}
// //           <p className="text-lg">Final Amount: ₹{finalAmount.toFixed(2)}</p>
// //           <div className="mt-4">
// //             <input
// //               type="text"
// //               value={couponCode}
// //               onChange={(e) => setCouponCode(e.target.value)}
// //               placeholder="Enter coupon code"
// //               className="w-full border rounded-md p-2"
// //             />
// //             <button
// //               onClick={applyCoupon}
// //               disabled={loading || !couponCode.trim()}
// //               className="w-full bg-blue-600 text-white py-2 rounded-md mt-2"
// //             >
// //               {loading ? "Applying..." : "Apply Coupon"}
// //             </button>
// //           </div>
// //           <button
// //             onClick={makePayment}
// //             disabled={loading || paymentLoading}
// //             className="w-full mt-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md"
// //           >
// //             {paymentLoading ? "Processing Payment..." : "Proceed to Payment"}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CartPage;
// // export default CartPage;
// import React, { useEffect, useState } from "react";
// import { axiosInstance } from "../../config/axiosIntance";
// import { toast, ToastContainer } from "react-toastify";
// import { loadStripe } from "@stripe/stripe-js";
// import "react-toastify/dist/ReactToastify.css";
// import CartCard from "../../components/user/CartCard";

// export const CartPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [cartData, setCartData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [couponCode, setCouponCode] = useState("");
//   const [appliedCoupon, setAppliedCoupon] = useState(""); // Track the applied coupon
//   const [discount, setDiscount] = useState(0);
//   const [finalAmount, setFinalAmount] = useState(0);
//   const [paymentLoading, setPaymentLoading] = useState(false);

//   useEffect(() => {
//     fetchCartItems();
//   }, []);

//   // Fetch cart items from backend
//   const fetchCartItems = async () => {
//     try {
//       const { data } = await axiosInstance.get("/cart/getcart");
//       if (data.success) {
//         setCartItems(data.cart.items || []);
//         setCartData(data.cart);
//         setFinalAmount(data.cart.totalPrice || 0);
//       } else {
//         throw new Error("Failed to load cart items");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Error fetching cart.");
//       setCartItems([]);
//       setCartData({});
//       setFinalAmount(0);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleRemoveItem = async (foodItemId) => {
//     try {
//       const { data } = await axiosInstance.delete("/cart/remove", {
//         data: { foodItemId },
//       });

//       console.log("Delete response:", data); //  Debugging log

//       if (!data.success) return toast.error("Failed to remove item.");

//       toast.success("Item removed successfully!");

//       // Safe state update for cart items
//       setCartItems((prevItems = []) => {
//         const updatedItems = prevItems.filter(
//           (item) => item.foodItem?._id !== foodItemId
//         );

//         // Recalculate total amount
//         const updatedTotal = updatedItems.reduce(
//           (sum, item) => sum + item.foodItem?.price * item.quantity,
//           0
//         );

//         // Apply discount if any
//         const updatedFinalAmount = updatedTotal - (discount || 0);

//         // Update the state
//         setFinalAmount(updatedFinalAmount);
//         setCartData({ ...cartData, totalPrice: updatedTotal });

//         return updatedItems;
//       });
//     } catch (err) {
//       console.error("Error removing item:", err.message || err);
//       toast.error("Could not remove item.");
//     }
//   };

//   // Update item quantity in the cart
//   const handleUpdateQuantity = async (foodItemId, quantity) => {
//     if (quantity <= 0) {
//       toast.error("Quantity must be at least 1.");
//       return;
//     }
//     try {
//       const response = await axiosInstance.put("/cart/update", {
//         foodItemId,
//         quantity,
//       });
//       if (response.data.success) {
//         toast.success("Cart updated!");
//         fetchCartItems();
//       } else {
//         toast.error("Failed to update cart.");
//       }
//     } catch (err) {
//       toast.error("Error updating cart.");
//     }
//   };

//   const applyCoupon = async () => {
//     if (!couponCode) return;

//     try {
//       const response = await axiosInstance.post("/coupons/apply", {
//         couponCode,
//         cartTotal: cartData.totalPrice,
//       });

//       if (response.data.success) {
//         const { discount, finalAmount } = response.data;
//         setDiscount(discount);
//         setFinalAmount(finalAmount);
//         setAppliedCoupon(couponCode);
//         toast.success("Coupon applied successfully!");
//       }
//     } catch (error) {
//       console.error("Error applying coupon:", error);
//       toast.error(error.response?.data?.message || "Failed to apply coupon.");
//     }
//   };

//   // Checkout with discount
//   const makePayment = async () => {
//     if (finalAmount < 41) {
//       toast.error("Cart total must be at least ₹41 to proceed to payment.");
//       return;
//     }

//     setPaymentLoading(true);
//     try {
//       const stripe = await loadStripe(
//         import.meta.env.VITE_STRIPE_Publishable_key
//       );
//       const response = await axiosInstance.post(
//         "/payment/create-checkout-session",
//         {
//           cartItems,
//           discount,
//         }
//       );

//       if (response.data.success) {
//         await stripe.redirectToCheckout({ sessionId: response.data.sessionId });
//       } else {
//         toast.error(
//           response.data.message || "Failed to create checkout session."
//         );
//       }
//     } catch (error) {
//       console.error("Payment error:", error);
//       toast.error(error.message || "Failed to process payment.");
//     } finally {
//       setPaymentLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <ToastContainer
//         position="top-center"
//         autoClose={5000}
//         hideProgressBar={false}
//       />

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Cart Items Section */}
//         <div className="lg:col-span-2 bg-white shadow rounded-lg p-6">
//           <h2 className="text-2xl font-semibold mb-4 text-gray-800">
//             Your Cart
//           </h2>
//           {loading ? (
//             <p className="text-gray-500">Loading cart items...</p>
//           ) : error ? (
//             <p className="text-red-500">{error}</p>
//           ) : cartItems?.length > 0 ? (
//             cartItems.map((item) => (
//               <CartCard
//                 key={item.foodItem._id}
//                 foodItem={item.foodItem}
//                 quantity={item.quantity}
//                 onRemove={handleRemoveItem}
//                 onUpdateQuantity={handleUpdateQuantity}
//               />
//             ))
//           ) : (
//             <p className="text-gray-500">Your cart is empty.</p>
//           )}
//         </div>

//         {/* Price Summary Section */}
//         <div className="bg-gray-100 shadow rounded-lg p-6">
//           <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
//             Price Summary
//           </h2>
//           <p className="text-lg">
//             Total Price: ₹{cartData.totalPrice?.toFixed(2)}
//           </p>
//           {discount > 0 && (
//             <p className="text-green-600">Discount: -₹{discount.toFixed(2)}</p>
//           )}
//           <p className="text-lg">Final Amount: ₹{finalAmount.toFixed(2)}</p>
//           <div className="mt-4">
//             <input
//               type="text"
//               value={couponCode}
//               onChange={(e) => setCouponCode(e.target.value)}
//               placeholder="Enter coupon code"
//               className="w-full border rounded-md p-2"
//             />
//             <button
//               onClick={applyCoupon}
//               disabled={loading || !couponCode.trim()}
//               className="w-full bg-blue-600 text-white py-2 rounded-md mt-2"
//             >
//               {loading ? "Applying..." : "Apply Coupon"}
//             </button>
//           </div>
//           <button
//             onClick={makePayment}
//             disabled={loading || paymentLoading}
//             className="w-full mt-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md"
//           >
//             {paymentLoading ? "Processing Payment..." : "Proceed to Payment"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // export default CartPage;
// import React, { useEffect, useState } from "react";
// import { axiosInstance } from "../../config/axiosIntance";
// import { toast, ToastContainer } from "react-toastify";
// import { loadStripe } from "@stripe/stripe-js";
// import { useNavigate } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";

// // ── Single cart item row
// const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
//   const { foodItem, quantity } = item;
//   // ✅ Backend stores prices in INR directly — no * 83 conversion
//   const unitPrice = foodItem?.price
//     ? parseFloat(foodItem.price).toFixed(0)
//     : "0";
//   const totalPrice = foodItem?.price
//     ? (parseFloat(foodItem.price) * quantity).toFixed(0)
//     : "0";
//   const [updating, setUpdating] = useState(false);

//   const handleQty = async (newQty) => {
//     if (newQty < 1) return;
//     setUpdating(true);
//     await onUpdateQuantity(foodItem._id, newQty);
//     setUpdating(false);
//   };

//   return (
//     <div className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
//       {/* Image */}
//       <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
//         <img
//           src={
//             foodItem?.image ||
//             "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&q=70"
//           }
//           alt={foodItem?.name}
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Info */}
//       <div className="flex-1 min-w-0">
//         <h3 className="font-semibold text-gray-900 text-sm leading-tight truncate">
//           {foodItem?.name}
//         </h3>
//         <p className="text-gray-500 text-xs mt-0.5">₹{unitPrice} per item</p>
//         {/* Qty controls */}
//         <div className="flex items-center gap-2 mt-2">
//           <button
//             onClick={() => handleQty(quantity - 1)}
//             disabled={updating || quantity <= 1}
//             className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm flex items-center justify-center transition-colors disabled:opacity-40"
//           >
//             −
//           </button>
//           <span className="text-sm font-semibold text-gray-900 w-5 text-center">
//             {quantity}
//           </span>
//           <button
//             onClick={() => handleQty(quantity + 1)}
//             disabled={updating}
//             className="w-7 h-7 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm flex items-center justify-center transition-colors disabled:opacity-40"
//           >
//             +
//           </button>
//         </div>
//       </div>

//       {/* Price + remove */}
//       <div className="flex flex-col items-end justify-between flex-shrink-0">
//         <button
//           onClick={() => onRemove(foodItem._id)}
//           className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
//         >
//           <svg
//             width="15"
//             height="15"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={2}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>
//         <p className="text-base font-bold text-gray-900">₹{totalPrice}</p>
//       </div>
//     </div>
//   );
// };

// // ── Summary row
// const SummaryRow = ({ label, value, highlight, large }) => (
//   <div
//     className={`flex justify-between items-center ${large ? "mt-3 pt-3 border-t border-gray-200" : ""}`}
//   >
//     <span
//       className={
//         large ? "text-base font-bold text-gray-900" : "text-sm text-gray-500"
//       }
//     >
//       {label}
//     </span>
//     <span
//       className={`font-semibold ${highlight ? "text-green-600" : large ? "text-xl font-extrabold text-gray-900" : "text-gray-800"}`}
//     >
//       {value}
//     </span>
//   </div>
// );

// // ── Main CartPage
// export const CartPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [cartData, setCartData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [couponCode, setCouponCode] = useState("");
//   const [appliedCoupon, setAppliedCoupon] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const [finalAmount, setFinalAmount] = useState(0);
//   const [paymentLoading, setPaymentLoading] = useState(false);
//   const [couponLoading, setCouponLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCartItems();
//   }, []);

//   const fetchCartItems = async () => {
//     try {
//       const { data } = await axiosInstance.get("/cart/getcart");
//       if (data.success) {
//         setCartItems(data.cart.items || []);
//         setCartData(data.cart);
//         // ✅ totalPrice is already in INR from backend
//         setFinalAmount(data.cart.totalPrice || 0);
//       } else throw new Error("Failed to load cart");
//     } catch (err) {
//       setError(err.response?.data?.message || "Error fetching cart.");
//       setCartItems([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRemoveItem = async (foodItemId) => {
//     try {
//       const { data } = await axiosInstance.delete("/cart/remove", {
//         data: { foodItemId },
//       });
//       if (!data.success) return toast.error("Failed to remove item.");
//       toast.success("Item removed");
//       setCartItems((prev) => {
//         const updated = prev.filter(
//           (item) => item.foodItem?._id !== foodItemId,
//         );
//         const total = updated.reduce(
//           (s, i) => s + parseFloat(i.foodItem?.price) * i.quantity,
//           0,
//         );
//         setFinalAmount(total - (discount || 0));
//         setCartData((d) => ({ ...d, totalPrice: total }));
//         return updated;
//       });
//     } catch {
//       toast.error("Could not remove item.");
//     }
//   };

//   const handleUpdateQuantity = async (foodItemId, quantity) => {
//     if (quantity <= 0) return;
//     try {
//       const res = await axiosInstance.put("/cart/update", {
//         foodItemId,
//         quantity,
//       });
//       if (res.data.success) fetchCartItems();
//       else toast.error("Failed to update cart.");
//     } catch {
//       toast.error("Error updating cart.");
//     }
//   };

//   const applyCoupon = async () => {
//     if (!couponCode.trim()) return;
//     setCouponLoading(true);
//     try {
//       const res = await axiosInstance.post("/coupons/apply", {
//         couponCode,
//         cartTotal: cartData.totalPrice,
//       });
//       if (res.data.success) {
//         const { discount: d, finalAmount: fa } = res.data;
//         setDiscount(d);
//         setFinalAmount(fa);
//         setAppliedCoupon(couponCode);
//         toast.success("🎉 Coupon applied!");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Invalid coupon code.");
//     } finally {
//       setCouponLoading(false);
//     }
//   };

//   const makePayment = async () => {
//     // ✅ Just check cart isn't empty — backend handles minimum amount
//     if (cartItems.length === 0) {
//       toast.error("Your cart is empty.");
//       return;
//     }
//     setPaymentLoading(true);
//     try {
//       const stripe = await loadStripe(
//         import.meta.env.VITE_STRIPE_Publishable_key,
//       );
//       const res = await axiosInstance.post("/payment/create-checkout-session", {
//         cartItems,
//         discount,
//       });
//       if (res.data.success) {
//         await stripe.redirectToCheckout({ sessionId: res.data.sessionId });
//       } else {
//         toast.error(res.data.message || "Failed to start checkout.");
//       }
//     } catch (err) {
//       // ✅ Show backend error message (e.g. minimum amount)
//       const msg =
//         err.response?.data?.message || err.message || "Payment failed.";
//       toast.error(msg);
//     } finally {
//       setPaymentLoading(false);
//     }
//   };

//   // ── Empty cart state
//   if (!loading && cartItems.length === 0)
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center px-4">
//           <div className="text-7xl mb-4">🛒</div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">
//             Your cart is empty
//           </h2>
//           <p className="text-gray-500 mb-6">
//             Looks like you haven't added anything yet.
//           </p>
//           <button
//             onClick={() => navigate("/restaurants")}
//             className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition-all active:scale-95"
//           >
//             Browse Restaurants
//           </button>
//         </div>
//       </div>
//     );

//   // ✅ All prices in INR — no conversion needed
//   const deliveryFee = 30;
//   const subtotal = parseFloat(cartData.totalPrice || 0);
//   const disc = parseFloat(discount || 0);
//   const total = (subtotal + deliveryFee - disc).toFixed(0);

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <ToastContainer
//         position="bottom-right"
//         autoClose={3000}
//         hideProgressBar
//       />

//       {/* Header */}
//       <div className="bg-white border-b border-gray-100 shadow-sm">
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
//           <button
//             onClick={() => navigate(-1)}
//             className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors"
//           >
//             <svg
//               width="18"
//               height="18"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M15 19l-7-7 7-7"
//               />
//             </svg>
//           </button>
//           <h1 className="text-xl font-extrabold text-gray-900">
//             Your Cart
//             <span className="ml-2 text-sm font-normal text-gray-400">
//               ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
//             </span>
//           </h1>
//         </div>
//       </div>

//       <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
//         {loading ? (
//           <div className="flex justify-center py-20">
//             <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
//           </div>
//         ) : error ? (
//           <div className="text-center py-20 text-red-500">{error}</div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
//             {/* Cart items */}
//             <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//               <h2 className="text-base font-bold text-gray-900 mb-4">
//                 Order Items
//               </h2>
//               {cartItems.map((item) => (
//                 <CartItem
//                   key={item.foodItem._id}
//                   item={item}
//                   onRemove={handleRemoveItem}
//                   onUpdateQuantity={handleUpdateQuantity}
//                 />
//               ))}
//             </div>

//             {/* Summary */}
//             <div className="lg:col-span-2 space-y-4">
//               {/* Coupon */}
//               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
//                 <h3 className="text-sm font-bold text-gray-900 mb-3">
//                   🎟️ Promo Code
//                 </h3>
//                 {appliedCoupon ? (
//                   <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center justify-between">
//                     <div>
//                       <p className="text-green-700 font-semibold text-sm">
//                         {appliedCoupon}
//                       </p>
//                       <p className="text-green-600 text-xs">
//                         Saving ₹{disc.toFixed(0)}
//                       </p>
//                     </div>
//                     <span className="text-green-500 text-lg">✓</span>
//                   </div>
//                 ) : (
//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       value={couponCode}
//                       onChange={(e) =>
//                         setCouponCode(e.target.value.toUpperCase())
//                       }
//                       onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
//                       placeholder="Enter code"
//                       className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 uppercase tracking-widest"
//                     />
//                     <button
//                       onClick={applyCoupon}
//                       disabled={couponLoading || !couponCode.trim()}
//                       className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-all active:scale-95"
//                     >
//                       {couponLoading ? "..." : "Apply"}
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* Price summary */}
//               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
//                 <h3 className="text-sm font-bold text-gray-900 mb-4">
//                   Price Summary
//                 </h3>
//                 <div className="space-y-3">
//                   <SummaryRow
//                     label="Subtotal"
//                     value={`₹${subtotal.toFixed(0)}`}
//                   />
//                   <SummaryRow label="Delivery fee" value={`₹${deliveryFee}`} />
//                   {disc > 0 && (
//                     <SummaryRow
//                       label={`Coupon (${appliedCoupon})`}
//                       value={`−₹${disc.toFixed(0)}`}
//                       highlight
//                     />
//                   )}
//                   <SummaryRow label="Total" value={`₹${total}`} large />
//                 </div>

//                 <button
//                   onClick={makePayment}
//                   disabled={paymentLoading || loading}
//                   className="w-full mt-6 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold py-4 rounded-2xl text-base transition-all active:scale-95 shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
//                 >
//                   {paymentLoading ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       Processing...
//                     </>
//                   ) : (
//                     <>
//                       <svg
//                         width="18"
//                         height="18"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                         strokeWidth={2}
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
//                         />
//                       </svg>
//                       Proceed to Payment
//                     </>
//                   )}
//                 </button>
//                 <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
//                   🔒 Secured by Stripe
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartPage;
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosIntance";
import { toast, ToastContainer } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

// ── Single cart item row
const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const { foodItem, quantity } = item;
  // ✅ Backend stores prices in INR directly — no * 83 conversion
  const unitPrice = foodItem?.price
    ? (parseFloat(foodItem.price) * 83).toFixed(0)
    : "0";
  const totalPrice = foodItem?.price
    ? (parseFloat(foodItem.price) * 83 * quantity).toFixed(0)
    : "0";
  const [updating, setUpdating] = useState(false);

  const handleQty = async (newQty) => {
    if (newQty < 1) return;
    setUpdating(true);
    await onUpdateQuantity(foodItem._id, newQty);
    setUpdating(false);
  };

  return (
    <div className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
      {/* Image */}
      <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
        <img
          src={
            foodItem?.image ||
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&q=70"
          }
          alt={foodItem?.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight truncate">
          {foodItem?.name}
        </h3>
        <p className="text-gray-500 text-xs mt-0.5">₹{unitPrice} per item</p>
        {/* Qty controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => handleQty(quantity - 1)}
            disabled={updating || quantity <= 1}
            className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm flex items-center justify-center transition-colors disabled:opacity-40"
          >
            −
          </button>
          <span className="text-sm font-semibold text-gray-900 w-5 text-center">
            {quantity}
          </span>
          <button
            onClick={() => handleQty(quantity + 1)}
            disabled={updating}
            className="w-7 h-7 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm flex items-center justify-center transition-colors disabled:opacity-40"
          >
            +
          </button>
        </div>
      </div>

      {/* Price + remove */}
      <div className="flex flex-col items-end justify-between flex-shrink-0">
        <button
          onClick={() => onRemove(foodItem._id)}
          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
        >
          <svg
            width="15"
            height="15"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <p className="text-base font-bold text-gray-900">₹{totalPrice}</p>
      </div>
    </div>
  );
};

// ── Summary row
const SummaryRow = ({ label, value, highlight, large }) => (
  <div
    className={`flex justify-between items-center ${large ? "mt-3 pt-3 border-t border-gray-200" : ""}`}
  >
    <span
      className={
        large ? "text-base font-bold text-gray-900" : "text-sm text-gray-500"
      }
    >
      {label}
    </span>
    <span
      className={`font-semibold ${highlight ? "text-green-600" : large ? "text-xl font-extrabold text-gray-900" : "text-gray-800"}`}
    >
      {value}
    </span>
  </div>
);

// ── Main CartPage
export const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartData, setCartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const { data } = await axiosInstance.get("/cart/getcart");
      if (data.success) {
        setCartItems(data.cart.items || []);
        setCartData(data.cart);
        // ✅ totalPrice is already in INR from backend
        setFinalAmount(data.cart.totalPrice || 0);
      } else throw new Error("Failed to load cart");
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching cart.");
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (foodItemId) => {
    try {
      const { data } = await axiosInstance.delete("/cart/remove", {
        data: { foodItemId },
      });
      if (!data.success) return toast.error("Failed to remove item.");
      toast.success("Item removed");
      setCartItems((prev) => {
        const updated = prev.filter(
          (item) => item.foodItem?._id !== foodItemId,
        );
        const total = updated.reduce(
          (s, i) => s + parseFloat(i.foodItem?.price) * i.quantity,
          0,
        );
        setFinalAmount(total - (discount || 0));
        setCartData((d) => ({ ...d, totalPrice: total }));
        return updated;
      });
    } catch {
      toast.error("Could not remove item.");
    }
  };

  const handleUpdateQuantity = async (foodItemId, quantity) => {
    if (quantity <= 0) return;
    try {
      const res = await axiosInstance.put("/cart/update", {
        foodItemId,
        quantity,
      });
      if (res.data.success) fetchCartItems();
      else toast.error("Failed to update cart.");
    } catch {
      toast.error("Error updating cart.");
    }
  };

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    try {
      const res = await axiosInstance.post("/coupons/apply", {
        couponCode,
        cartTotal: cartData.totalPrice,
      });
      if (res.data.success) {
        const { discount: d, finalAmount: fa } = res.data;
        setDiscount(d);
        setFinalAmount(fa);
        setAppliedCoupon(couponCode);
        toast.success("🎉 Coupon applied!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid coupon code.");
    } finally {
      setCouponLoading(false);
    }
  };

  const makePayment = async () => {
    // ✅ Just check cart isn't empty — backend handles minimum amount
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    setPaymentLoading(true);
    try {
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_Publishable_key,
      );
      const res = await axiosInstance.post("/payment/create-checkout-session", {
        cartItems,
        discount,
      });
      if (res.data.success) {
        await stripe.redirectToCheckout({ sessionId: res.data.sessionId });
      } else {
        toast.error(res.data.message || "Failed to start checkout.");
      }
    } catch (err) {
      // ✅ Show backend error message (e.g. minimum amount)
      const msg =
        err.response?.data?.message || err.message || "Payment failed.";
      toast.error(msg);
    } finally {
      setPaymentLoading(false);
    }
  };

  // ── Empty cart state
  if (!loading && cartItems.length === 0)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-7xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added anything yet.
          </p>
          <button
            onClick={() => navigate("/restaurants")}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition-all active:scale-95"
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );

  // ✅ totalPrice from backend is USD — convert to INR
  const deliveryFee = 30;
  const subtotal = parseFloat(cartData.totalPrice || 0) * 83;
  const disc = parseFloat(discount || 0) * 83;
  const total = (subtotal + deliveryFee - disc).toFixed(0);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
      />

      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <svg
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-xl font-extrabold text-gray-900">
            Your Cart
            <span className="ml-2 text-sm font-normal text-gray-400">
              ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
            </span>
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Cart items */}
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-base font-bold text-gray-900 mb-4">
                Order Items
              </h2>
              {cartItems.map((item) => (
                <CartItem
                  key={item.foodItem._id}
                  item={item}
                  onRemove={handleRemoveItem}
                  onUpdateQuantity={handleUpdateQuantity}
                />
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-2 space-y-4">
              {/* Coupon */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="text-sm font-bold text-gray-900 mb-3">
                  🎟️ Promo Code
                </h3>
                {appliedCoupon ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center justify-between">
                    <div>
                      <p className="text-green-700 font-semibold text-sm">
                        {appliedCoupon}
                      </p>
                      <p className="text-green-600 text-xs">
                        Saving ₹{disc.toFixed(0)}
                      </p>
                    </div>
                    <span className="text-green-500 text-lg">✓</span>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) =>
                        setCouponCode(e.target.value.toUpperCase())
                      }
                      onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                      placeholder="Enter code"
                      className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 uppercase tracking-widest"
                    />
                    <button
                      onClick={applyCoupon}
                      disabled={couponLoading || !couponCode.trim()}
                      className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-all active:scale-95"
                    >
                      {couponLoading ? "..." : "Apply"}
                    </button>
                  </div>
                )}
              </div>

              {/* Price summary */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="text-sm font-bold text-gray-900 mb-4">
                  Price Summary
                </h3>
                <div className="space-y-3">
                  <SummaryRow
                    label="Subtotal"
                    value={`₹${subtotal.toFixed(0)}`}
                  />
                  <SummaryRow label="Delivery fee" value={`₹${deliveryFee}`} />
                  {disc > 0 && (
                    <SummaryRow
                      label={`Coupon (${appliedCoupon})`}
                      value={`−₹${disc.toFixed(0)}`}
                      highlight
                    />
                  )}
                  <SummaryRow label="Total" value={`₹${total}`} large />
                </div>

                <button
                  onClick={makePayment}
                  disabled={paymentLoading || loading}
                  className="w-full mt-6 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold py-4 rounded-2xl text-base transition-all active:scale-95 shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
                >
                  {paymentLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                      Proceed to Payment
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                  🔒 Secured by Stripe
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
