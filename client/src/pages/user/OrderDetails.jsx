// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { axiosInstance } from "../../config/axiosIntance";
// import { Link } from "react-router-dom";

// const UserOrders = () => {
//   const { theme } = useSelector((state) => state.theme); // Get theme
//   const [orders, setOrders] = useState([]); // Store order data

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         const response = await axiosInstance.get("/order/get-user-orders");
//         const sortedOrders = response.data?.data?.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setOrders(sortedOrders);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchOrderDetails();
//   }, []);

//   const textColor = theme ? "text-black" : "text-white";

//   return (
//     <div className="min-h-screen p-4">
//       {orders.length !== 0 && (
//         <h1 className={`text-center font-bold text-2xl my-5 ${textColor}`}>
//           Orders
//         </h1>
//       )}
//       {orders.length === 0 && (
//         <Link to="/" className="block text-center mt-10">
//           <div className="text-center p-6 bg-gray-200 dark:bg-gray-800 rounded-lg">
//             <p className={`font-medium ${textColor}`}>
//               We are still waiting to take your first order!
//             </p>
//           </div>
//         </Link>
//       )}
//       <div className="space-y-6">
//         {orders?.map((order) => (
//           <div key={order._id}>
//             {order.products.map((product) => (
//               <div
//                 key={product._id}
//                 className={`flex flex-wrap justify-between items-center p-4 rounded-lg shadow ${
//                   theme ? "bg-yellow-100" : "bg-gray-300"
//                 }`}
//               >
//                 <div className="w-full sm:w-1/6">
//                   <img
//                     src={product.productId.image}
//                     alt={product.productId.title}
//                     className="w-full h-auto object-contain rounded"
//                   />
//                 </div>
//                 <div className="w-full sm:w-1/4 text-center">
//                   <p className="font-medium">{product.productId.title}</p>
//                 </div>
//                 <div className="w-full sm:w-1/6 text-center">
//                   <p>{product.quantity}</p>
//                 </div>
//                 <div className="w-full sm:w-1/6 text-center">
//                   <p>₹{product.productId.price * product.quantity}</p>
//                 </div>
//                 <div className="w-full sm:w-1/6 text-center">
//                   {order.returnApprovalStatus === "approved" ||
//                   order.returnApprovalStatus === "rejected" ? (
//                     <p className={theme ? "text-yellow-600" : "text-red-600"}>
//                       {order.returnApprovalStatus === "approved"
//                         ? `Returned (${new Date(
//                             order.updatedAt
//                           ).toLocaleDateString()})`
//                         : `Rejected (${new Date(
//                             order.updatedAt
//                           ).toLocaleDateString()})`}
//                     </p>
//                   ) : (
//                     <Link to={`/user/return/${order._id}`}>
//                       <button
//                         className={`py-2 px-4 rounded font-semibold ${
//                           theme
//                             ? "bg-yellow-500 text-white"
//                             : "bg-black text-white"
//                         }`}
//                       >
//                         Return
//                       </button>
//                     </Link>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserOrders;
// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { axiosInstance } from "../../config/axiosIntance";
// import { Link } from "react-router-dom";

// const UserOrders = () => {
//   const { theme } = useSelector((state) => state.theme); // Get theme
//   const [orders, setOrders] = useState([]); // Store order data
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         const response = await axiosInstance.get("/orders/user/orders"); // Corrected API path
//         const sortedOrders = response.data.orders.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setOrders(sortedOrders);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch orders. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrderDetails();
//   }, []);

//   const textColor = theme ? "text-black" : "text-white";

//   if (loading) {
//     return <p className="text-center">Loading orders...</p>;
//   }

//   if (error) {
//     return <p className="text-center text-red-500">{error}</p>;
//   }

//   return (
//     <div className="min-h-screen p-4">
//       {orders.length === 0 ? (
//         <Link to="/" className="block text-center mt-10">
//           <div className="text-center p-6 bg-gray-200 dark:bg-gray-800 rounded-lg">
//             <p className={`font-medium ${textColor}`}>
//               We are still waiting to take your first order!
//             </p>
//           </div>
//         </Link>
//       ) : (
//         <>
//           <h1 className={`text-center font-bold text-2xl my-5 ${textColor}`}>
//             Orders
//           </h1>
//           <div className="space-y-6">
//             {orders.map((order) => (
//               <div key={order._id}>
//                 {order.items.map((item) => (
//                   <div
//                     key={item._id}
//                     className={`flex flex-wrap justify-between items-center p-4 rounded-lg shadow ${
//                       theme ? "bg-yellow-100" : "bg-gray-300"
//                     }`}
//                   >
//                     <div className="w-full sm:w-1/6">
//                       <img
//                         src={item.foodItem.image}
//                         alt={item.foodItem.title}
//                         className="w-full h-auto object-contain rounded"
//                       />
//                     </div>
//                     <div className="w-full sm:w-1/4 text-center">
//                       <p className="font-medium">{item.foodItem.title}</p>
//                     </div>
//                     <div className="w-full sm:w-1/6 text-center">
//                       <p>{item.quantity}</p>
//                     </div>
//                     <div className="w-full sm:w-1/6 text-center">
//                       <p>₹{item.foodItem.price * item.quantity}</p>
//                     </div>
//                   </div>
//                 ))}
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
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosIntance";
import { Link } from "react-router-dom";

const UserOrders = () => {
  const { theme } = useSelector((state) => state.theme);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/orders/user/orders");
        const sortedOrders = response.data.orders.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(sortedOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const textColor = theme ? "text-black" : "text-white";

  if (loading) {
    return <p className="text-center">Loading orders...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen p-4">
      {orders.length === 0 ? (
        <Link to="/" className="block text-center mt-10">
          <div className="text-center p-6 bg-gray-200 dark:bg-gray-800 rounded-lg">
            <p className={`font-medium ${textColor}`}>
              We are still waiting to take your first order!
            </p>
          </div>
        </Link>
      ) : (
        <>
          <h1 className={`text-center font-bold text-2xl my-5 ${textColor}`}>
            Your Orders
          </h1>
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className={`p-4 rounded-lg shadow ${
                  theme ? "bg-yellow-100" : "bg-gray-300"
                }`}
              >
                <h2 className="font-bold text-lg">Order ID: {order._id}</h2>
                <p className="text-sm text-gray-600">
                  Placed on: {new Date(order.createdAt).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Status: {order.status}</p>
                <div className="mt-4 space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.foodItem._id}
                      className="flex justify-between"
                    >
                      <span>{item.foodItem.name}</span>
                      <span>
                        ₹{item.foodItem.price} x {item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 font-semibold">
                  Total: ₹{order.finalPrice}{" "}
                  {order.discount > 0 && (
                    <span className="text-green-600">
                      (-₹{order.discount} discount)
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserOrders;
