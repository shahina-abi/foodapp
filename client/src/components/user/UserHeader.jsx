// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { clearUser } from "../../redux/features/UserSlice";
// import logo1 from "../../assets/images/logo.png";
// export default function UserHeader() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Handle logout logic
//   const handleLogout = () => {
//     dispatch(clearUser()); // Clear user data from Redux
//     localStorage.removeItem("token"); // Remove authentication token (if stored)
//     navigate("/login"); // Redirect to login page
//   };

//   return (
//     <header className="bg-gray-900 text-white shadow-md">
//       <div className="container mx-auto flex justify-between items-center py-4 px-6">
//         {/* Logo */}
//         <div className="flex items-center space-x-4">
//           <img
//             src={logo1} // Update with your actual logo path
//             alt="FoodBae Logo"
//             className="w-10 h-15" // Adjust width and height as needed
//           />
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

//         {/* User-Specific Options */}
//         <div className="flex space-x-4 items-center">
//           {/* Profile Link */}
//           <Link
//             to="/profile"
//             className="hover:text-orange-400 transition duration-300"
//           >
//             Profile
//           </Link>

//           {/* Cart Link */}
//           <Link
//             to="/cart"
//             className="hover:text-orange-400 transition duration-300"
//           >
//             Cart
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
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/features/UserSlice";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa"; // Import icons
import logo1 from "../../assets/images/logo.png";

export default function UserHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle logout logic
  const handleLogout = () => {
    dispatch(clearUser()); // Clear user data from Redux
    localStorage.removeItem("token"); // Remove authentication token (if stored)
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img
            src={logo1} // Update with your actual logo path
            alt="FoodBae Logo"
            className="w-10 h-15" // Adjust width and height as needed
          />
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

        {/* User-Specific Options */}
        <div className="flex space-x-4 items-center">
          {/* Profile Link with Icon */}
          <Link
            to="/profile"
            className="hover:text-orange-400 transition duration-300 flex items-center space-x-2"
          >
            <FaUserCircle size={20} />
          </Link>

          {/* Cart Link with Icon */}
          <Link
            to="/cart"
            className="hover:text-orange-400 transition duration-300 flex items-center space-x-2"
          >
            <FaShoppingCart size={20} />
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
