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

// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// export const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [newAddress, setNewAddress] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userResponse = await axios.get("/api/users/profile", {
//           withCredentials: true,
//         });
//         const ordersResponse = await axios.get("/api/orders/user/orders", {
//           withCredentials: true,
//         });

//         setUser(userResponse.data.data);
//         setOrders(ordersResponse.data.orders);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const updateAddress = async () => {
//     try {
//       const response = await axios.put(
//         "/api/users/profile/address",
//         { address: newAddress },
//         { withCredentials: true }
//       );
//       setUser({ ...user, address: response.data.address });
//       setNewAddress("");
//     } catch (err) {
//       console.error("Error updating address:", err);
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="container mx-auto">
//       <div className="profile-card bg-white p-6 rounded shadow">
//         <h2 className="text-2xl font-bold">{user.name}</h2>
//         <p>{user.email}</p>
//         <p>{user.mobile}</p>
//         <p>{user.address || "No address added"}</p>

//         <div className="mt-4">
//           <textarea
//             className="border rounded p-2 w-full"
//             placeholder="Update address"
//             value={newAddress}
//             onChange={(e) => setNewAddress(e.target.value)}
//           />
//           <button
//             className="bg-blue-500 text-white px-4 py-2 mt-2"
//             onClick={updateAddress}
//           >
//             Save Address
//           </button>
//         </div>
//       </div>

//       <div className="orders mt-6">
//         <h3 className="text-xl font-bold">Order History</h3>
//         {orders.map((order) => (
//           <div
//             key={order._id}
//             className="order-card bg-gray-100 p-4 rounded mt-2"
//           >
//             <p>Order ID: {order._id}</p>
//             <p>Total: ${order.totalPrice}</p>
//             <p>Status: {order.status}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const { data } = await axios.get("/api/user/profile", {
//           withCredentials: true,
//         });

//         if (!data || !data.data) {
//           throw new Error("Invalid API response");
//         }

//         setUser(data.data);
//       } catch (err) {
//         console.error("Error fetching user profile:", err.response || err);

//         setError({
//           statusText: err.response?.statusText || "Error",
//           message: err.response?.data?.message || "Failed to fetch user data",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   if (loading) {
//     return <div className="text-center p-4">Loading user profile...</div>;
//   }

//   if (error) {
//     return (
//       <div className="text-center p-4 text-red-500">
//         {error.message || "An error occurred."}
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-10">
//       <div className="container mx-auto bg-white p-6 rounded-lg shadow-md max-w-lg">
//         {/* Profile Picture */}
//         <div className="flex flex-col items-center">
//           <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 font-bold text-2xl mb-4">
//             {user?.name?.charAt(0).toUpperCase() || "?"}
//           </div>
//           <h1 className="text-2xl font-bold">{user?.name || "N/A"}</h1>
//           <p className="text-gray-500">{user?.email || "N/A"}</p>
//         </div>

//         {/* User Details */}
//         <div className="mt-6 space-y-4">
//           <div className="flex justify-between">
//             <span className="text-gray-600 font-medium">Mobile:</span>
//             <span className="text-gray-800">
//               {user?.mobile || "Not Provided"}
//             </span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600 font-medium">Address:</span>
//             <span className="text-gray-800">
//               {user?.address || "No address available"}
//             </span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600 font-medium">Account Status:</span>
//             <span
//               className={`text-sm ${
//                 user?.isActive ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {user?.isActive ? "Active" : "Deactivated"}
//             </span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600 font-medium">Admin Status:</span>
//             <span
//               className={`text-sm ${
//                 user?.isAdmin ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {user?.isAdmin ? "Yes" : "No"}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosIntance"; // Custom axios instance
import toast from "react-hot-toast";
import { UserRound } from "lucide-react";
import Loading from "../../components/user/Loading"; // Assuming you have a Loading component

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance({
        url: "/user/profile",
        method: "GET",
        withCredentials: true, // Include cookies for authentication
      });

      console.log("User profile response:", response.data);
      setUser(response.data.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to fetch user profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axiosInstance({
        url: "/user/log-out",
        method: "POST",
        withCredentials: true,
      });

      toast.success("User logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div className="text-center p-4 text-red-500">
        <p>Unable to load user profile.</p>
      </div>
    );
  }

  return (
    <div className="profile-container min-h-screen bg-gray-100 py-10">
      <div className="profile-card container mx-auto bg-white p-6 rounded-lg shadow-md max-w-md text-center">
        {/* Profile Icon */}
        <UserRound className="profile-icon text-gray-500 mx-auto mb-4 w-16 h-16" />

        {/* User Details */}
        <h1 className="profile-email text-lg font-bold text-gray-800">
          {user.email}
        </h1>
        <h2 className="profile-name text-xl font-semibold text-gray-800">
          {user.name}
        </h2>

        <div className="user-details mt-6 space-y-4 text-left">
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Mobile:</span>
            <span className="text-gray-800">
              {user.mobile || "Not Provided"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Address:</span>
            <span className="text-gray-800">
              {user.address || "No address available"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Account Status:</span>
            <span
              className={`text-sm ${
                user.isActive ? "text-green-600" : "text-red-600"
              }`}
            >
              {user.isActive ? "Active" : "Deactivated"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Admin Status:</span>
            <span
              className={`text-sm ${
                user.isAdmin ? "text-green-600" : "text-red-600"
              }`}
            >
              {user.isAdmin ? "Yes" : "No"}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="button-group mt-6 flex justify-between">
          <button
            onClick={handleLogout}
            className="btn btn-error px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
          <Link to={"/user/edit"}>
            <button className="btn btn-primary px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Edit Profile
            </button>
          </Link>
          <Link to={"/user/orders"}>
            <button className="btn btn-primary px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              View Orders
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
