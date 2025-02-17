// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { clearUser } from "../../redux/features/UserSlice";
// import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
// import logo1 from "../../assets/images/logo.png";
// import toast from "react-hot-toast";
// import { axiosInstance } from "../../config/axiosIntance";

// export default function UserHeader() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isUserAuth, userData } = useSelector((state) => state.user);

//   console.log("UserHeader - isUserAuth:", isUserAuth);
//   console.log("UserHeader - userData:", userData);

//   if (!isUserAuth) {
//     return null;
//   }

//   const handleLogout = async () => {
//     if (window.confirm("Are you sure you want to log out?")) {
//       try {
//         await axiosInstance.post("/user/log-out");
//         dispatch(clearUser());
//         localStorage.removeItem("token");
//         toast.success("Logged out successfully!");
//         navigate("/login");
//       } catch (error) {
//         console.error("Logout failed:", error);
//         toast.error("Logout failed. Please try again.");
//       }
//     }
//   };

//   return (
//     <header className="bg-gray-900 text-white shadow-md">
//       <div className="container mx-auto flex justify-between items-center py-4 px-6">
//         {/* Logo */}
//         <div className="flex items-center space-x-4">
//           <img src={logo1} alt="FoodBae Logo" className="w-12 h-auto" />
//           <div className="text-2xl font-bold text-orange-500">
//             <Link to="/">FoodBae</Link>
//           </div>
//         </div>

//         {/* Navigation Links */}
//         <nav>
//           <ul className="flex space-x-8">
//             <li>
//               <Link
//                 to="/"
//                 className="hover:text-orange-400 transition duration-300"
//               >
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/about"
//                 className="hover:text-orange-400 transition duration-300"
//               >
//                 About
//               </Link>
//             </li>
//           </ul>
//         </nav>

//         {/* User Section */}
//         <div className="flex space-x-6 items-center">
//           {/* Display User Name */}
//           {userData?.name && (
//             <span className="text-sm text-gray-300">
//               Hello, <span className="font-bold">{userData.name}</span>
//             </span>
//           )}

//           {/* Profile Link */}
//           <Link
//             to={"/user/profile"}
//             className="hover:text-orange-400 transition duration-300"
//           >
//             <FaUserCircle size={22} />
//           </Link>

//           {/* Cart Link */}
//           <Link
//             to={"/user/cart"}
//             className="hover:text-orange-400 transition duration-300"
//           >
//             <FaShoppingCart size={22} />
//           </Link>

//           {/* Logout Button */}
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/features/UserSlice";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import logo1 from "../../assets/images/logo.png";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosIntance";

export default function UserHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isUserAuth, userData } = useSelector((state) => state.user);

  console.log("UserHeader - isUserAuth:", isUserAuth);
  console.log("UserHeader - userData:", userData);
  console.log("UserHeader - Redux State:", { isUserAuth, userData });
  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      try {
        await axiosInstance.post("/user/log-out");
        dispatch(clearUser());
        localStorage.removeItem("token");
        toast.success("Logged out successfully!");
        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);
        toast.error("Logout failed. Please try again.");
      }
    }
  };

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 flex-col md:flex-row">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img src={logo1} alt="FoodBae Logo" className="w-12 h-auto" />
          <div className="text-2xl font-bold text-orange-500">
            <Link to="/">FoodBae</Link>
          </div>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link
                to="/"
                className="hover:text-orange-400 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-orange-400 transition duration-300"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>

        {/* User Section */}
        <div className="flex space-x-6 items-center">
          {/* Display User Name */}

          <span className="text-sm text-gray-300">
            Hello,{" "}
            <span className="font-bold">{userData?.name || "Guest"}</span>
          </span>

          {/* Profile Link */}
          <Link
            to={"/user/profile"}
            className="hover:text-orange-400 transition duration-300"
          >
            <FaUserCircle size={22} />
          </Link>

          {/* Cart Link */}
          <Link
            to={"/user/cart"}
            className="hover:text-orange-400 transition duration-300"
          >
            <FaShoppingCart size={22} />
          </Link>

          {/* Logout Button (Only if logged in) */}
          {isUserAuth && (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
