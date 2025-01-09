import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/features/UserSlice";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import logo1 from "../../assets/images/logo.png";

export default function UserHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userAuthorized, userInfo } = useSelector((state) => state.user);

  console.log("UserHeader - userAuthorized:", userAuthorized);
  console.log("UserHeader - userInfo:", userInfo);

  if (!userAuthorized) {
    return null; // Prevent rendering if the user is not authorized
  }

  // Handle logout logic
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      dispatch(clearUser()); // Clear user data from Redux
      localStorage.removeItem("token"); // Remove authentication token (if stored)
      navigate("/login"); // Redirect to login page
    }
  };

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img
            src={logo1} // Update with your actual logo path
            alt="FoodBae Logo"
            className="w-12 h-auto" // Adjust dimensions for responsiveness
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
          {/* Show logged-in user's name */}
          {userInfo?.name && (
            <span className="text-sm text-gray-300">
              Hello, <span className="font-bold">{userInfo.name}</span>
            </span>
          )}

          {/* Profile Link with Icon */}
          <Link
            to="/user/profile"
            className="hover:text-orange-400 transition duration-300 flex items-center space-x-2"
            aria-label="Profile"
          >
            <FaUserCircle size={20} />
          </Link>

          {/* Cart Link with Icon */}
          <Link
            to="/user/cart/getcart"
            className="hover:text-orange-400 transition duration-300 flex items-center space-x-2"
            aria-label="Cart"
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
