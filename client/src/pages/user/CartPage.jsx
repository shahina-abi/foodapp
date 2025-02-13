// import React, { useEffect, useState } from "react";
// import { axiosInstance } from "../../config/axiosIntance";
// import { useNavigate } from "react-router-dom";
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
//   const [discount, setDiscount] = useState(0);
//   const [finalAmount, setFinalAmount] = useState(0);
//   const [paymentLoading, setPaymentLoading] = useState(false);

//   const navigate = useNavigate();

//   const fetchCartItems = async () => {
//     try {
//       const { data } = await axiosInstance.get("/cart/getcart");
//       if (data.success) {
//         setCartItems(data.cart.items || []);
//         setCartData(data.cart);
//         setFinalAmount(data.cart.totalPrice || 0);
//         setError(null);
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

//   // Handle coupon application
//   const applyCoupon = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.post("/coupons/checkout", {
//         couponCode,
//         cartId: cartData._id,
//       });
//       if (response.data.success) {
//         const discountAmount = response.data.discount || 0;
//         setDiscount(discountAmount);
//         setFinalAmount(cartData.totalPrice - discountAmount);
//         toast.success("Coupon applied successfully!");
//       } else {
//         toast.error(response.data.message || "Invalid coupon code.");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to apply coupon.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   // Handle adding an item to the cart
//   const handleAddItem = async (foodItemId, quantity) => {
//     try {
//       const response = await axiosInstance.post("/cart/add", {
//         foodItemId,
//         quantity,
//       });
//       if (response.data.success) {
//         toast.success("Item added to cart!");
//         fetchCartItems();
//       } else {
//         toast.error("Failed to add item to cart.");
//       }
//     } catch (error) {
//       console.error("Error adding item to cart:", error.message);
//       toast.error("Error adding item to cart. Please try again.");
//     }
//   };

//   const handleRemoveItem = async (foodItemId) => {
//     try {
//       const response = await axiosInstance.delete("/cart/remove", {
//         data: { foodItemId },
//       });
//       if (response.data.success) {
//         toast.success("Item removed successfully!");
//         fetchCartItems();
//       } else {
//         toast.error("Failed to remove item.");
//       }
//     } catch (err) {
//       toast.error("Error removing item from cart.");
//     }
//   };

//   const handleQuantityChange = async (foodItemId, quantity) => {
//     if (isNaN(quantity) || quantity <= 0) {
//       toast.error("Invalid quantity. Please enter a valid number.");
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

//   // const makePayment = async () => {
//   //   if (finalAmount < 41) {
//   //     toast.error("Cart total must be at least ₹41 to proceed to payment.");
//   //     return;
//   //   }

//   //   setPaymentLoading(true);
//   //   try {
//   //     const stripe = await loadStripe(
//   //       import.meta.env.VITE_STRIPE_Publishable_key
//   //     );

//   //     const session = await axiosInstance.post(
//   //       "/payment/create-checkout-session",
//   //       {
//   //         cartItems,
//   //         discount,
//   //       }
//   //     );

//   //     if (session.data.success) {
//   //       await stripe.redirectToCheckout({ sessionId: session.data.sessionId });
//   //     } else {
//   //       toast.error(
//   //         session.data.message || "Failed to initiate payment session."
//   //       );
//   //     }
//   //   } catch (error) {
//   //     console.error("Payment error:", error.response?.data || error.message);
//   //     toast.error(
//   //       error.response?.data?.error ||
//   //         "An error occurred while processing the payment."
//   //     );
//   //   } finally {
//   //     setPaymentLoading(false);
//   //   }
//   // };
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

//       const session = await axiosInstance.post(
//         "/payment/create-checkout-session",
//         {
//           cartItems,
//           couponCode, // Pass the entered coupon code
//         }
//       );

//       if (session.data.success) {
//         await stripe.redirectToCheckout({ sessionId: session.data.sessionId });
//       } else {
//         toast.error(
//           session.data.message || "Failed to initiate payment session."
//         );
//       }
//     } catch (error) {
//       console.error("Payment error:", error.message);
//       toast.error("An error occurred while processing the payment.");
//     } finally {
//       setPaymentLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCartItems();
//   }, []);

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <ToastContainer
//         position="top-center"
//         autoClose={5000}
//         hideProgressBar={false}
//       />

//       {/* Cart Content */}
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
//           ) : cartItems.length > 0 ? (
//             <div>
//               {cartItems.map((item) => (
//                 <CartCard
//                   key={item.foodItem._id}
//                   foodItem={item.foodItem}
//                   quantity={item.quantity}
//                   onRemove={handleRemoveItem}
//                   onUpdateQuantity={handleQuantityChange}
//                 />
//               ))}
//             </div>
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
//             Total Price:{" "}
//             <span className="font-semibold">
//               ₹{cartData.totalPrice?.toFixed(2)}
//             </span>
//           </p>
//           {discount > 0 && (
//             <p className="text-green-600">Discount: -₹{discount.toFixed(2)}</p>
//           )}
//           <p className="text-lg">
//             Final Amount:{" "}
//             <span className="font-semibold text-green-600">
//               ₹{finalAmount.toFixed(2)}
//             </span>
//           </p>

//           {/* Coupon Section */}
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
//               className={`w-full bg-blue-600 text-white py-2 rounded-md mt-2 ${
//                 loading ? "bg-gray-400 cursor-not-allowed" : "hover:bg-blue-700"
//               }`}
//             >
//               {loading ? "Applying..." : "Apply Coupon"}
//             </button>
//           </div>

//           <button
//             onClick={makePayment}
//             disabled={loading || paymentLoading}
//             className={`w-full mt-4 py-2 text-white rounded-md ${
//               paymentLoading ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
//             }`}
//           >
//             {paymentLoading ? "Processing Payment..." : "Proceed to Payment"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

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

//   // Remove an item from the cart
//   const handleRemoveItem = async (foodItemId) => {
//     try {
//       const response = await axiosInstance.delete("/cart/remove", {
//         data: { foodItemId },
//       });
//       if (response.data.success) {
//         toast.success("Item removed successfully!");
//         fetchCartItems();
//       } else {
//         toast.error("Failed to remove item.");
//       }
//     } catch (err) {
//       toast.error("Error removing item from cart.");
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

//   // Apply a coupon code to the cart
//   const applyCoupon = async () => {
//     if (!couponCode) return;

//     try {
//       const response = await axiosInstance.post("/coupons/validate", {
//         couponCode: couponCode, // Enter "TEST50" here
//       });

//       if (response.data.success) {
//         // Calculate discount amount
//         const discountAmount =
//           (cartData.totalPrice * response.data.discountPercentage) / 100;
//         setDiscount(discountAmount);
//         setFinalAmount(cartData.totalPrice - discountAmount);
//         setAppliedCoupon(couponCode);
//         toast.success("Coupon applied successfully!");
//       }
//     } catch (error) {
//       console.error("Error applying coupon:", error);
//       toast.error(error.response?.data?.message || "Failed to apply coupon");
//     }
//   };

//   const makePayment = async () => {
//     if (finalAmount < 41) {
//       toast.error("Cart total must be at least ₹41 to proceed to payment.");
//       return;
//     }

//     setPaymentLoading(true);
//     try {
//       // Initialize Stripe
//       const stripe = await loadStripe(
//         import.meta.env.VITE_STRIPE_Publishable_key
//       );
//       if (!stripe) {
//         throw new Error("Stripe failed to initialize");
//       }

//       // Create checkout session
//       const response = await axiosInstance.post(
//         "/payment/create-checkout-session",
//         {
//           cartItems,
//           couponCode: appliedCoupon,
//         }
//       );

//       if (!response.data.success || !response.data.sessionId) {
//         throw new Error("Failed to create checkout session");
//       }

//       // Handle redirect
//       const result = await stripe.redirectToCheckout({
//         sessionId: response.data.sessionId,
//       });

//       if (result.error) {
//         throw new Error(result.error.message);
//       }
//     } catch (error) {
//       console.error("Payment error:", error);
//       toast.error(error.message || "Payment processing failed");
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
//           ) : cartItems.length > 0 ? (
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

  // Remove an item from the cart
  // const handleRemoveItem = async (foodItemId) => {
  //   try {
  //     const response = await axiosInstance.delete("/cart/remove", {
  //       data: { foodItemId },
  //     });
  //     if (response.data.success) {
  //       toast.success("Item removed successfully!");
  //       fetchCartItems();
  //     } else {
  //       toast.error("Failed to remove item.");
  //     }
  //   } catch (err) {
  //     toast.error("Error removing item from cart.");
  //   }
  // };
  const handleRemoveItem = async (foodItemId) => {
    try {
      const response = await axiosInstance.delete("/cart/remove", {
        data: { foodItemId },
      });

      console.log("Delete response:", response.data); // ✅ Debugging log

      if (response.data.success) {
        toast.success("Item removed successfully!");
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.foodItem._id !== foodItemId)
        );
      } else {
        toast.error("Failed to remove item.");
      }
    } catch (err) {
      console.error("Error deleting item:", err); // ✅ Check for errors
      toast.error("Error removing item from cart.");
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

  //Checkout with discount
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
          ) : cartItems.length > 0 ? (
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
