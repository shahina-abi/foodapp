// // // export default UserProfile;
// // import React, { useState } from "react";
// // import { useFetch } from "../../hooks/UseFetch";
// // import { Link } from "react-router-dom";
// // //import {userprofile} from "../../pages/user/OrderDetails"

// // export const UserProfile = () => {
// //   const [profileData, isLoading, error] = useFetch("/user/profile");
// //   const [showOrders, setShowOrders] = useState(false);

// //   return (
// //     <div>
// //       <h2>Profile page</h2>

// //       <button
// //         onClick={() => setShowOrders(!showOrders)}
// //         className="btn btn-secondary"
// //       >
// //         Orders
// //       </button>
// //       {showOrders && <Orders />}
// //     </div>
// //   );
// // };
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // export const UserProfile = () => {
// //   const [user, setUser] = useState(null);
// //   const [orders, setOrders] = useState([]); // Initialize as an empty array
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [selectedOrder, setSelectedOrder] = useState(null);
// //   const [isModalOpen, setIsModalOpen] = useState(false);

// //   useEffect(() => {
// //     const fetchUserData = async () => {
// //       try {
// //         const userResponse = await axios.get("/api/user/profile");
// //         const ordersResponse = await axios.get("/api/orders");

// //         setUser(userResponse.data.data || {});
// //         setOrders(ordersResponse.data.orders || []);
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //         setError(error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchUserData();
// //   }, []);

// //   if (loading) {
// //     return <div className="text-center p-4">Loading...</div>;
// //   }

// //   if (error) {
// //     return (
// //       <div className="text-center p-4 text-red-500">Error: {error.message}</div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-100 py-10">
// //       <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
// //         <div className="flex items-center border-b pb-4 mb-4">
// //           {/* <img
// //             src={user?.avatar || "/default-avatar.png"} // Use a local image by default
// //             alt="User Avatar"
// //             className="w-20 h-20 rounded-full"
// //             onError={(e) => (e.target.src = "/default-avatar.png")} // Fallback in case of error
// //           /> */}

// //           <div className="ml-4">
// //             <h1 className="text-2xl font-bold">{user?.name}</h1>
// //             <p className="text-gray-600">{user?.email}</p>
// //           </div>
// //         </div>

// //         <h2 className="text-xl font-bold mb-4">Order History</h2>
// //         {orders?.length > 0 ? (
// //           <div className="space-y-4">
// //             {orders.map((order) => (
// //               <div
// //                 key={order._id}
// //                 className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow"
// //               >
// //                 <div>
// //                   <h3 className="font-bold">Order #{order._id}</h3>
// //                   <p>
// //                     {order.items.length} item(s) - Total: ${order.totalPrice}
// //                   </p>
// //                   <p>Status: {order.status || "Pending"}</p>
// //                 </div>
// //                 <button
// //                   onClick={() => setSelectedOrder(order)}
// //                   className="text-blue-500 hover:underline"
// //                 >
// //                   View Details
// //                 </button>
// //               </div>
// //             ))}
// //           </div>
// //         ) : (
// //           <p className="text-gray-500">No orders found.</p>
// //         )}
// //       </div>

// //       {isModalOpen && selectedOrder && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
// //           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
// //             <h3 className="text-xl font-bold mb-4">Order Details</h3>
// //             <div className="space-y-2">
// //               <p>
// //                 <strong>Order ID:</strong> {selectedOrder._id}
// //               </p>
// //               <p>
// //                 <strong>Total Price:</strong> ${selectedOrder.totalPrice}
// //               </p>
// //               <p>
// //                 <strong>Status:</strong> {selectedOrder.status || "Pending"}
// //               </p>
// //               <p>
// //                 <strong>Payment Method:</strong> {selectedOrder.paymentMethod}
// //               </p>
// //               <h4 className="font-bold mt-4">Items:</h4>
// //               <ul className="list-disc ml-5">
// //                 {selectedOrder.items.map((item) => (
// //                   <li key={item.foodItem._id}>
// //                     {item.foodItem.name} - ${item.foodItem.price} x{" "}
// //                     {item.quantity}
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //             <div className="mt-6 flex justify-between">
// //               <button
// //                 onClick={() => setIsModalOpen(false)}
// //                 className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
// //               >
// //                 Close
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default UserProfile;
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// export const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const [orders, setOrders] = useState([]); // Initialize as an empty array
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userResponse = await axios.get("/api/user/profile");
//         const ordersResponse = await axios.get("/api/orders");

//         setUser(userResponse.data.data || {});
//         setOrders(ordersResponse.data.orders || []);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   if (loading) {
//     return <div className="text-center p-4">Loading...</div>;
//   }

//   if (error) {
//     return (
//       <div className="text-center p-4 text-red-500">Error: {error.message}</div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-10">
//       <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
//         {/* User Details Section */}
//         <div className="flex flex-col md:flex-row items-center border-b pb-4 mb-6">
//           <img
//             src={user?.avatar || "/default-avatar.png"} // Fallback to default avatar
//             alt="User Avatar"
//             className="w-24 h-24 rounded-full"
//             onError={(e) => (e.target.src = "/default-avatar.png")}
//           />
//           <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
//             <h1 className="text-2xl font-bold">{user?.name}</h1>
//             <p className="text-gray-600">{user?.email}</p>
//             <p className="text-gray-600">
//               {user?.address || "No address added"}
//             </p>
//             <Link to="/user/orders">
//               <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
//                 My Orders
//               </button>
//             </Link>
//           </div>
//         </div>

//         {/* Order History Section */}
//         <h2 className="text-xl font-bold mb-4">Order History</h2>
//         {orders?.length > 0 ? (
//           <div className="space-y-4">
//             {orders.map((order) => (
//               <div
//                 key={order._id}
//                 className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow"
//               >
//                 <div>
//                   <h3 className="font-bold">Order #{order._id}</h3>
//                   <p>
//                     {order.items.length} item(s) - Total: ${order.totalPrice}
//                   </p>
//                   <p>Status: {order.status || "Pending"}</p>
//                 </div>
//                 <button
//                   onClick={() => {
//                     setSelectedOrder(order);
//                     setIsModalOpen(true);
//                   }}
//                   className="text-blue-500 hover:underline"
//                 >
//                   View Details
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No orders found.</p>
//         )}
//       </div>

//       {/* Order Details Modal */}
//       {isModalOpen && selectedOrder && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//             <h3 className="text-xl font-bold mb-4">Order Details</h3>
//             <div className="space-y-2">
//               <p>
//                 <strong>Order ID:</strong> {selectedOrder._id}
//               </p>
//               <p>
//                 <strong>Total Price:</strong> ${selectedOrder.totalPrice}
//               </p>
//               <p>
//                 <strong>Status:</strong> {selectedOrder.status || "Pending"}
//               </p>
//               <p>
//                 <strong>Payment Method:</strong>{" "}
//                 {selectedOrder.paymentMethod || "Not specified"}
//               </p>
//               <h4 className="font-bold mt-4">Items:</h4>
//               <ul className="list-disc ml-5">
//                 {selectedOrder.items.map((item) => (
//                   <li key={item.foodItem._id}>
//                     {item.foodItem.name} - ${item.foodItem.price} x{" "}
//                     {item.quantity}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div className="mt-6 flex justify-between">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfile;

import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [avatarSrc, setAvatarSrc] = useState("/default-avatar.png"); // Initial avatar source

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get("/api/user/profile");
        const ordersResponse = await axios.get("/api/orders/user/orders");

        setUser(userResponse.data.data || {});
        setOrders(ordersResponse.data.orders || []);
        if (userResponse.data.data?.avatar) {
          setAvatarSrc(userResponse.data.data.avatar);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/api/user/profile/address", {
        address: newAddress,
      });
      setUser({ ...user, address: response.data.address });
      setNewAddress("");
      setIsAddressModalOpen(false);
    } catch (err) {
      console.error("Error updating address:", err);
    }
  };

  const handleImageError = useCallback(() => {
    if (avatarSrc !== "/default-avatar.png") {
      setAvatarSrc("/default-avatar.png"); // Fallback to default avatar
    }
  }, [avatarSrc]);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">Error: {error.message}</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* User Details Section */}
        <div className="flex flex-col md:flex-row items-center border-b pb-4 mb-6">
          <img
            src={avatarSrc}
            alt="User Avatar"
            className="w-24 h-24 rounded-full"
            onError={handleImageError} // Handle avatar load errors
          />
          <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-gray-600">
              {user?.address || "No address added"}
            </p>
            <button
              onClick={() => setIsAddressModalOpen(true)}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              {user?.address ? "Edit Address" : "Add Address"}
            </button>
            <Link to="/user/orders">
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                My Orders
              </button>
            </Link>
          </div>
        </div>

        {/* Order History Section */}
        <h2 className="text-xl font-bold mb-4">Order History</h2>
        {orders?.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow"
              >
                <div>
                  <h3 className="font-bold">Order #{order._id}</h3>
                  <p>
                    {order.items.length} item(s) - Total: ${order.totalPrice}
                  </p>
                  <p>Status: {order.status || "Pending"}</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedOrder(order);
                    setIsModalOpen(true);
                  }}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No orders found.</p>
        )}
      </div>

      {/* Address Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Update Address</h3>
            <form onSubmit={handleAddressSubmit} className="space-y-4">
              <textarea
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                placeholder="Enter your address"
                className="w-full p-3 border rounded-lg focus:outline-none"
                rows="4"
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
