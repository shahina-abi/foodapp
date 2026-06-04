// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { axiosInstance } from "../../config/axiosIntance";
// import { Link } from "react-router-dom";
// import toast from "react-hot-toast"; // For notifications

// const UserOrders = () => {
//   const { theme } = useSelector((state) => state.theme);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axiosInstance.get("/orders/user/orders");
//         const sortedOrders = response.data.orders.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setOrders(sortedOrders);
//       } catch (err) {
//         console.error("Error fetching orders:", err);
//         setError("Failed to fetch orders. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleCancelOrder = async (orderId) => {
//     try {
//       const response = await axiosInstance.put(`/orders/${orderId}/cancel`);
//       if (response.data.success) {
//         toast.success("Order canceled successfully!");
//         setOrders((prevOrders) =>
//           prevOrders.map((order) =>
//             order._id === orderId ? { ...order, status: "Canceled" } : order
//           )
//         );
//       } else {
//         toast.error("Failed to cancel order.");
//       }
//     } catch (error) {
//       console.error("Error canceling order:", error);
//       toast.error("Could not cancel order.");
//     }
//   };

//   if (loading) return <p className="text-center">Loading orders...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
//       {orders.length === 0 ? (
//         <Link to="/" className="block text-center mt-10">
//           <div className="text-center p-6 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg max-w-lg">
//             <p className="font-medium text-gray-800">
//               We are still waiting to take your first order!
//             </p>
//           </div>
//         </Link>
//       ) : (
//         <>
//           <h1 className="text-center font-bold text-3xl my-6 text-gray-800">
//             Your Orders
//           </h1>
//           <div className="w-full max-w-3xl space-y-6">
//             {orders.map((order) => (
//               <div
//                 key={order._id}
//                 className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
//               >
//                 {/* Order Date & Status */}
//                 <div className="flex justify-between items-center">
//                   <p className="text-sm text-gray-600">
//                     📅 {new Date(order.createdAt).toLocaleString()}
//                   </p>
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                       order.status === "Canceled"
//                         ? "bg-red-200 text-red-800"
//                         : "bg-blue-200 text-blue-800"
//                     }`}
//                   >
//                     {order.status}
//                   </span>
//                 </div>

//                 {/* Order Items */}
//                 <div className="mt-4">
//                   {order.items.map((item) => (
//                     <div
//                       key={item.foodItem._id}
//                       className="flex items-center space-x-4 border-b pb-3"
//                     >
//                       <img
//                         src={item.foodItem.image || "/placeholder.jpg"}
//                         alt={item.foodItem.name}
//                         className="w-16 h-16 rounded-lg object-cover"
//                       />
//                       <div className="flex-1">
//                         <h3 className="font-semibold text-gray-800">
//                           {item.foodItem.name}
//                         </h3>
//                         <p className="text-gray-600">
//                           ₹{item.foodItem.price} x {item.quantity}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Order Total */}
//                 <p className="mt-4 font-semibold text-lg text-gray-800">
//                   Total: ₹{order.finalPrice}{" "}
//                   {order.discount > 0 && (
//                     <span className="text-green-600 text-sm">
//                       (-₹{order.discount} discount)
//                     </span>
//                   )}
//                 </p>

//                 {/* Cancel Order Button */}
//                 {order.status !== "Canceled" && (
//                   <button
//                     onClick={() => handleCancelOrder(order._id)}
//                     className="w-full mt-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition duration-200"
//                   >
//                     Cancel Order
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default UserOrders;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosIntance";
import toast from "react-hot-toast";

// ── Status config
const STATUS_CONFIG = {
  Pending: {
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    dot: "bg-yellow-500",
    icon: "🕐",
  },
  Preparing: {
    color: "bg-blue-100 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
    icon: "👨‍🍳",
  },
  "Out for Delivery": {
    color: "bg-purple-100 text-purple-700 border-purple-200",
    dot: "bg-purple-500",
    icon: "🛵",
  },
  Completed: {
    color: "bg-green-100 text-green-700 border-green-200",
    dot: "bg-green-500",
    icon: "✅",
  },
  Canceled: {
    color: "bg-red-100 text-red-700 border-red-200",
    dot: "bg-red-500",
    icon: "❌",
  },
};

const getStatus = (status) => STATUS_CONFIG[status] || STATUS_CONFIG["Pending"];

// ── Order progress steps
const ORDER_STEPS = ["Pending", "Preparing", "Out for Delivery", "Completed"];
const getStepIndex = (status) => ORDER_STEPS.indexOf(status);

const OrderProgress = ({ status }) => {
  if (status === "Canceled")
    return (
      <div className="flex items-center gap-2 mt-3 p-3 bg-red-50 rounded-xl border border-red-100">
        <span className="text-red-500 text-sm">
          ❌ This order was cancelled
        </span>
      </div>
    );

  const currentStep = getStepIndex(status);
  return (
    <div className="flex items-center gap-0 mt-4">
      {ORDER_STEPS.map((step, i) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center gap-1 flex-1">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                i < currentStep
                  ? "bg-orange-500 border-orange-500 text-white"
                  : i === currentStep
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "bg-white border-gray-200 text-gray-400"
              }`}
            >
              {i <= currentStep ? "✓" : i + 1}
            </div>
            <span
              className={`text-xs text-center leading-tight ${
                i <= currentStep
                  ? "text-orange-500 font-medium"
                  : "text-gray-400"
              }`}
            >
              {step}
            </span>
          </div>
          {i < ORDER_STEPS.length - 1 && (
            <div
              className={`h-0.5 flex-1 mb-5 ${i < currentStep ? "bg-orange-400" : "bg-gray-200"}`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// ── Single order card
const OrderCard = ({ order, onCancel }) => {
  const [expanded, setExpanded] = useState(false);
  const statusConf = getStatus(order.status);
  const date = new Date(order.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const totalINR = (
    parseFloat(order.finalPrice || order.totalPrice || 0) * 83
  ).toFixed(0);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${statusConf.color}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${statusConf.dot}`} />
              {statusConf.icon} {order.status}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">📅 {date}</p>
          <p className="text-xs text-gray-400 font-mono mt-0.5 truncate">
            #{order._id?.slice(-8).toUpperCase()}
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-lg font-extrabold text-gray-900">₹{totalINR}</p>
          {order.discount > 0 && (
            <p className="text-xs text-green-600">
              -₹{(order.discount * 83).toFixed(0)} off
            </p>
          )}
          <p className="text-xs text-gray-400">
            {order.items?.length} item{order.items?.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Items preview */}
      <div className="px-5 pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          {order.items?.slice(0, 3).map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 bg-gray-50 rounded-lg px-2 py-1"
            >
              <div className="w-6 h-6 rounded overflow-hidden bg-gray-200 flex-shrink-0">
                {item.foodItem?.image ? (
                  <img
                    src={item.foodItem.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs">
                    🍽️
                  </div>
                )}
              </div>
              <span className="text-xs text-gray-700 font-medium truncate max-w-[80px]">
                {item.foodItem?.name}
              </span>
              <span className="text-xs text-gray-400">×{item.quantity}</span>
            </div>
          ))}
          {order.items?.length > 3 && (
            <span className="text-xs text-gray-400">
              +{order.items.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Progress tracker */}
      <div className="px-5 pb-4">
        <OrderProgress status={order.status} />
      </div>

      {/* Expand / actions */}
      <div className="border-t border-gray-50 px-5 py-3 flex items-center justify-between gap-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-orange-500 font-medium hover:underline flex items-center gap-1"
        >
          {expanded ? "Hide details ▲" : "View details ▼"}
        </button>
        <div className="flex gap-2">
          {order.status === "Pending" && (
            <button
              onClick={() => onCancel(order._id)}
              className="text-xs font-medium text-red-500 border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-gray-50 px-5 py-4 bg-gray-50">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Order Items
          </h4>
          <div className="space-y-2">
            {order.items?.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white rounded-xl p-3"
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  {item.foodItem?.image ? (
                    <img
                      src={item.foodItem.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      🍽️
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.foodItem?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    ₹{(parseFloat(item.foodItem?.price || 0) * 83).toFixed(0)} ×{" "}
                    {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-bold text-gray-900">
                  ₹
                  {(
                    parseFloat(item.foodItem?.price || 0) *
                    83 *
                    item.quantity
                  ).toFixed(0)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 space-y-1">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Subtotal</span>
              <span>
                ₹{(parseFloat(order.totalPrice || 0) * 83).toFixed(0)}
              </span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-xs text-green-600">
                <span>Discount</span>
                <span>
                  −₹{(parseFloat(order.discount || 0) * 83).toFixed(0)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm font-bold text-gray-900">
              <span>Total Paid</span>
              <span className="text-orange-500">₹{totalINR}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Main page
const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/orders/user/orders");
        const sorted = (response.data.orders || []).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setOrders(sorted);
      } catch (err) {
        setError("Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await axiosInstance.put(`/orders/${orderId}/cancel`);
      if (response.data.success) {
        toast.success("Order cancelled successfully");
        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderId ? { ...o, status: "Canceled" } : o,
          ),
        );
      } else {
        toast.error("Failed to cancel order.");
      }
    } catch {
      toast.error("Could not cancel order.");
    }
  };

  const filters = [
    "All",
    "Pending",
    "Preparing",
    "Out for Delivery",
    "Completed",
    "Canceled",
  ];
  const filtered =
    filter === "All" ? orders : orders.filter((o) => o.status === filter);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">😕</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate("/restaurants")}
            className="bg-orange-500 text-white px-6 py-2 rounded-xl font-medium"
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-16 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-extrabold text-gray-900">
              My Orders
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({orders.length})
              </span>
            </h1>
            <Link
              to="/restaurants"
              className="text-sm text-orange-500 font-medium hover:underline"
            >
              + New Order
            </Link>
          </div>
          {/* Filter pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filter === f
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders list */}
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🛵</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              No orders yet
            </h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven't ordered anything yet!
            </p>
            <Link
              to="/restaurants"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition-all"
            >
              Browse Restaurants
            </Link>
          </div>
        ) : (
          filtered.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              onCancel={handleCancelOrder}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UserOrders;
