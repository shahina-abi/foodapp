// // src/pages/user/UserProfile.jsx

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { axiosInstance } from "../../config/axiosIntance"; // Custom axios instance
// import toast from "react-hot-toast";
// import { UserRound } from "lucide-react";
// import Loading from "../../components/user/Loading"; // Loading component

// const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   //Fetch user details on component mount
//   const fetchUserDetails = async () => {
//     try {
//       setLoading(true);

//       const response = await axiosInstance({
//         url: "/user/profile",
//         method: "GET",
//         withCredentials: true, // Include cookies for authentication
//       });

//       console.log("User profile response:", response.data);
//       setUser(response.data.data);
//     } catch (error) {
//       console.error("Error fetching user profile:", error);
//       toast.error("Failed to fetch user profile. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Logout Function
//   const handleLogout = async () => {
//     try {
//       await axiosInstance({
//         url: "/user/log-out",
//         method: "POST",
//         withCredentials: true,
//       });

//       toast.success("User logged out successfully");
//       navigate("/login");
//     } catch (error) {
//       console.error("Error logging out:", error);
//       toast.error("Failed to log out. Please try again.");
//     }
//   };

//   // Profile Update Function
//   const handleProfileUpdate = async (updatedUserData) => {
//     try {
//       const response = await axiosInstance({
//         url: "/user/edit-profile",
//         method: "PUT",
//         data: updatedUserData,
//         withCredentials: true,
//       });

//       if (response.status === 200) {
//         toast.success("Profile updated successfully");
//         navigate("/profile");
//       } else {
//         throw new Error("Invalid response from server");
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       toast.error("Failed to update profile. Please try again.");
//     }
//   };

//   if (loading) return <Loading />;

//   if (!user) {
//     return (
//       <div className="text-center p-4 text-red-500">
//         <p>Unable to load user profile.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="profile-container min-h-screen bg-gray-100 py-10">
//       <div className="profile-card container mx-auto bg-white p-6 rounded-lg shadow-md max-w-md text-center">
//         {/* Profile Icon */}
//         <UserRound className="profile-icon text-gray-500 mx-auto mb-4 w-16 h-16" />

//         {/* User Details */}
//         <h1 className="profile-email text-lg font-bold text-gray-800">
//           {user.email}
//         </h1>
//         <h2 className="profile-name text-xl font-semibold text-gray-800">
//           {user.name}
//         </h2>

//         <div className="user-details mt-6 space-y-4 text-left">
//           <div className="flex justify-between">
//             <span className="text-gray-600 font-medium">Mobile:</span>
//             <span className="text-gray-800">
//               {user.mobile || "Not Provided"}
//             </span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600 font-medium">Address:</span>
//             <span className="text-gray-800">
//               {user.address || "No address available"}
//             </span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600 font-medium">Account Status:</span>
//             <span
//               className={`text-sm ${
//                 user.isActive ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {user.isActive ? "Active" : "Deactivated"}
//             </span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600 font-medium">Admin Status:</span>
//             <span
//               className={`text-sm ${
//                 user.isAdmin ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {user.isAdmin ? "Yes" : "No"}
//             </span>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="button-group mt-6 flex justify-between">
//           <button
//             onClick={handleLogout}
//             className="btn btn-error px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//           >
//             Logout
//           </button>
//           <Link to={"/user/edit"}>
//             <button className="btn btn-primary px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
//               Edit Profile
//             </button>
//           </Link>
//           <Link to={"/user/orders"}>
//             <button className="btn btn-primary px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
//               View Orders
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;
// // import React, { useState, useEffect } from "react";
// // import { axiosInstance } from "../../config/axiosIntance";
// // import { useNavigate, Link } from "react-router-dom"; // Import Link
// // import toast from "react-hot-toast";
// // import { UserRound } from "lucide-react";
// // import Loading from "../../components/user/Loading";

// // const UserProfile = () => {
// //   const [user, setUser] = useState({});
// //   const [editMode, setEditMode] = useState(false); // 🔥 Toggle Edit Mode
// //   const [loading, setLoading] = useState(true);
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     mobile: "",
// //     address: "",
// //   });

// //   const navigate = useNavigate();

// //   // Fetch User Profile
// //   useEffect(() => {
// //     const fetchUserDetails = async () => {
// //       try {
// //         setLoading(true);
// //         const response = await axiosInstance.get("/user/profile", {
// //           withCredentials: true,
// //         });
// //         setUser(response.data.data);
// //         setFormData({
// //           name: response.data.data.name,
// //           email: response.data.data.email,
// //           mobile: response.data.data.mobile || "",
// //           address: response.data.data.address || "",
// //         });
// //       } catch (error) {
// //         console.error("Error fetching user profile:", error);
// //         toast.error("Failed to load profile. Please try again.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchUserDetails();
// //   }, []);

// //   // Handle Input Change
// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   // Handle Profile Update
// //   const handleProfileUpdate = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axiosInstance.put("/user/edit-profile", formData, {
// //         withCredentials: true,
// //       });

// //       if (response.status === 200) {
// //         toast.success("Profile updated successfully!");
// //         setUser(response.data.data); // Update displayed data
// //         setEditMode(false); // Exit Edit Mode
// //       }
// //     } catch (error) {
// //       console.error("Error updating profile:", error);
// //       toast.error("Update failed. Try again.");
// //     }
// //   };

// //   // Logout Function
// //   const handleLogout = async () => {
// //     try {
// //       await axiosInstance.post("/user/log-out", {}, { withCredentials: true });
// //       toast.success("User logged out successfully");
// //       navigate("/login");
// //     } catch (error) {
// //       console.error("Error logging out:", error);
// //       toast.error("Failed to log out. Please try again.");
// //     }
// //   };

// //   if (loading) return <Loading />;

// //   return (
// //     <div className="profile-container min-h-screen bg-gray-100 py-10">
// //       <div className="profile-card container mx-auto bg-white p-6 rounded-lg shadow-md max-w-md text-center">
// //         <UserRound className="profile-icon text-gray-500 mx-auto mb-4 w-16 h-16" />

// //         {/* Profile View Mode */}
// //         {!editMode ? (
// //           <>
// //             <h1 className="profile-email text-lg font-bold text-gray-800">
// //               {user.email}
// //             </h1>
// //             <h2 className="profile-name text-xl font-semibold text-gray-800">
// //               {user.name}
// //             </h2>

// //             <div className="user-details mt-6 space-y-4 text-left">
// //               <div className="flex justify-between">
// //                 <span className="text-gray-600 font-medium">Mobile:</span>
// //                 <span className="text-gray-800">
// //                   {user.mobile || "Not Provided"}
// //                 </span>
// //               </div>
// //               <div className="flex justify-between">
// //                 <span className="text-gray-600 font-medium">Address:</span>
// //                 <span className="text-gray-800">
// //                   {user.address || "No address available"}
// //                 </span>
// //               </div>
// //             </div>

// //             {/* Buttons */}
// //             <div className="button-group mt-6 flex justify-between">
// //               <button
// //                 onClick={handleLogout}
// //                 className="btn btn-error px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
// //               >
// //                 Logout
// //               </button>
// //               <button
// //                 onClick={() => setEditMode(true)}
// //                 className="btn btn-primary px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
// //               >
// //                 Edit Profile
// //               </button>
// //               {/* Add Order Button */}
// //               <Link to="/order">
// //                 <button className="btn btn-success px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
// //                   Place Order
// //                 </button>
// //               </Link>
// //             </div>
// //           </>
// //         ) : (
// //           // 🔥 Profile Edit Mode
// //           <form onSubmit={handleProfileUpdate} className="space-y-4">
// //             <label className="block text-gray-700">Name</label>
// //             <input
// //               type="text"
// //               name="name"
// //               value={formData.name}
// //               onChange={handleChange}
// //               className="w-full p-2 border border-gray-300 rounded"
// //             />

// //             <label className="block text-gray-700">Email</label>
// //             <input
// //               type="email"
// //               name="email"
// //               value={formData.email}
// //               readOnly
// //               className="w-full p-2 border border-gray-300 rounded bg-gray-100"
// //             />

// //             <label className="block text-gray-700">Mobile</label>
// //             <input
// //               type="text"
// //               name="mobile"
// //               value={formData.mobile}
// //               onChange={handleChange}
// //               className="w-full p-2 border border-gray-300 rounded"
// //             />

// //             <label className="block text-gray-700">Address</label>
// //             <input
// //               type="text"
// //               name="address"
// //               value={formData.address}
// //               onChange={handleChange}
// //               className="w-full p-2 border border-gray-300 rounded"
// //             />

// //             {/* Buttons */}
// //             <div className="button-group flex justify-between">
// //               <button
// //                 type="button"
// //                 onClick={() => setEditMode(false)}
// //                 className="btn btn-secondary px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 type="submit"
// //                 className="btn btn-success px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
// //               >
// //                 Save Changes
// //               </button>
// //             </div>
// //           </form>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default UserProfile;
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { axiosInstance } from "../../config/axiosIntance"; // Custom axios instance
// import toast from "react-hot-toast";
// import { UserRound } from "lucide-react";
// import Loading from "../../components/user/Loading"; // Loading component

// const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false); // ✅ Add error state
//   const navigate = useNavigate();

//   // ✅ Fetch user details when the component mounts
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         setLoading(true);
//         setError(false); // Reset error state before fetching

//         const response = await axiosInstance.get("/user/profile", {
//           withCredentials: true,
//         });

//         console.log("User profile response:", response.data);

//         // ✅ Ensure correct data structure
//         setUser(response.data.data || response.data);
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//         setError(true); // ✅ Set error state
//         toast.error("Failed to fetch user profile. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserDetails();
//   }, []); // ✅ Run only once when component mounts

//   // ✅ Logout Function
//   const handleLogout = async () => {
//     try {
//       await axiosInstance.post("/user/log-out", {}, { withCredentials: true });

//       toast.success("User logged out successfully");
//       navigate("/login");
//     } catch (error) {
//       console.error("Error logging out:", error);
//       toast.error("Failed to log out. Please try again.");
//     }
//   };

//   // ✅ Profile Update Function
//   const handleProfileUpdate = async (updatedUserData) => {
//     try {
//       const response = await axiosInstance.put(
//         "/user/edit-profile",
//         updatedUserData,
//         {
//           withCredentials: true,
//         }
//       );

//       if (response.status === 200) {
//         toast.success("Profile updated successfully");
//         navigate("/profile");
//       } else {
//         throw new Error("Invalid response from server");
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       toast.error("Failed to update profile. Please try again.");
//     }
//   };

//   // ✅ Show loading spinner while fetching
//   if (loading) return <Loading />;

//   // ✅ Show error message if the API call fails
//   if (error || !user) {
//     return (
//       <div className="text-center p-4 text-red-500">
//         <p>Unable to load user profile.</p>
//         <button
//           onClick={() => window.location.reload()}
//           className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="profile-container min-h-screen bg-gray-100 py-10">
//       <div className="profile-card container mx-auto bg-white p-6 rounded-lg shadow-md max-w-md text-center">
//         {/* Profile Icon */}
//         <UserRound className="profile-icon text-gray-500 mx-auto mb-4 w-16 h-16" />

//         {/* User Details */}
//         <h1 className="profile-email text-lg font-bold text-gray-800">
//           {user.email}
//         </h1>
//         <h2 className="profile-name text-xl font-semibold text-gray-800">
//           {user.name}
//         </h2>

//         <div className="user-details mt-6 space-y-4 text-left">
//           <div className="flex justify-between">
//             <span className="text-gray-600 font-medium">Mobile:</span>
//             <span className="text-gray-800">
//               {user.mobile || "Not Provided"}
//             </span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600 font-medium">Address:</span>
//             <span className="text-gray-800">
//               {user.address || "No address available"}
//             </span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600 font-medium">Account Status:</span>
//             <span
//               className={`text-sm ${
//                 user.isActive ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {user.isActive ? "Active" : "Deactivated"}
//             </span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600 font-medium">Admin Status:</span>
//             <span
//               className={`text-sm ${
//                 user.isAdmin ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {user.isAdmin ? "Yes" : "No"}
//             </span>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="button-group mt-6 flex justify-between">
//           <button
//             onClick={handleLogout}
//             className="btn btn-error px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//           >
//             Logout
//           </button>
//           <Link to={"/user/edit"}>
//             <button className="btn btn-primary px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
//               Edit Profile
//             </button>
//           </Link>
//           <Link to={"/user/orders"}>
//             <button className="btn btn-primary px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
//               View Orders
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosIntance"; // Custom axios instance
import toast from "react-hot-toast";
import { UserRound } from "lucide-react";
import Loading from "../../components/user/Loading"; // Loading component

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await axiosInstance.get("/user/profile", {
          withCredentials: true,
        });

        console.log("User profile response:", response.data);

        const userData = response.data.data || response.data;
        setUser(userData);
        setUpdatedUser({
          name: userData.name,
          email: userData.email,
          mobile: userData.mobile,
          address: userData.address,
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError(true);
        toast.error("Failed to fetch user profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(
        "/user/edit-profile",
        updatedUser,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setUser(updatedUser);
        setEditMode(false);
        toast.success("Profile updated successfully!");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/user/log-out", {}, { withCredentials: true });

      toast.success("User logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <p className="text-red-500 font-semibold">
            Unable to load user profile.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <UserRound className="text-gray-500 w-16 h-16 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
        </div>

        {!editMode ? (
          <div className="mt-6 space-y-4">
            <div className="bg-gray-100 p-3 rounded-md">
              <span className="font-medium text-gray-700">Name:</span>{" "}
              {user.name}
            </div>
            <div className="bg-gray-100 p-3 rounded-md">
              <span className="font-medium text-gray-700">Email:</span>{" "}
              {user.email}
            </div>
            <div className="bg-gray-100 p-3 rounded-md">
              <span className="font-medium text-gray-700">Mobile:</span>{" "}
              {user.mobile || "Not Provided"}
            </div>
            <div className="bg-gray-100 p-3 rounded-md">
              <span className="font-medium text-gray-700">Address:</span>{" "}
              {user.address || "No Address Available"}
            </div>

            <button
              onClick={() => setEditMode(true)}
              className="w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdateProfile} className="mt-6 space-y-4">
            <div>
              <label className="block font-medium">Name</label>
              <input
                type="text"
                value={updatedUser.name}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, name: e.target.value })
                }
                className="w-full border rounded p-2 focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                value={updatedUser.email}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, email: e.target.value })
                }
                className="w-full border rounded p-2 focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Mobile</label>
              <input
                type="text"
                value={updatedUser.mobile}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, mobile: e.target.value })
                }
                className="w-full border rounded p-2 focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block font-medium">Address</label>
              <input
                type="text"
                value={updatedUser.address}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, address: e.target.value })
                }
                className="w-full border rounded p-2 focus:ring focus:ring-blue-200"
              />
            </div>

            <div className="flex justify-between mt-4">
              <button
                type="submit"
                className="w-1/2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="w-1/2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 mt-6 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
