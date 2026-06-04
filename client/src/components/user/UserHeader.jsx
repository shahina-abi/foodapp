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
//   console.log("UserHeader - Redux State:", { isUserAuth, userData });
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
//       <div className="container mx-auto flex justify-between items-center py-4 px-6 flex-col md:flex-row">
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

//           <span className="text-sm text-gray-300">
//             Hello,{" "}
//             <span className="font-bold">{userData?.name || "Guest"}</span>
//           </span>

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

//           {/* Logout Button (Only if logged in) */}
//           {isUserAuth && (
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/features/UserSlice";
import logo1 from "../../assets/images/logo.png";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosIntance";

export default function UserHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = useSelector((state) => state.user);

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const dropdownRef = useRef(null);

  // ── Nav links — Restaurants added ✅
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/restaurants", label: "Restaurants" },
    { to: "/about", label: "About" },
  ];

  // ── Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [location]);

  // ── Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Cart count from localStorage
  useEffect(() => {
    const syncCart = () => {
      try {
        const cart = localStorage.getItem("cart");
        const items = cart ? JSON.parse(cart) : [];
        setCartCount(
          items.reduce((sum, item) => sum + (item.quantity || 1), 0),
        );
      } catch {
        setCartCount(0);
      }
    };
    syncCart();
    window.addEventListener("storage", syncCart);
    window.addEventListener("cartChange", syncCart);
    return () => {
      window.removeEventListener("storage", syncCart);
      window.removeEventListener("cartChange", syncCart);
    };
  }, []);

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/user/log-out");
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      // Always clear local state even if API fails
      dispatch(clearUser());
      localStorage.removeItem("user");
      localStorage.removeItem("userToken");
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("authChange"));
      toast.success("Logged out successfully!");
      navigate("/");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white transition-shadow duration-300 ${
        scrolled ? "shadow-lg shadow-black/30" : ""
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-3 px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo1} alt="FoodBae" className="w-9 h-9 object-contain" />
          <span className="text-xl font-extrabold text-orange-500 tracking-tight">
            FoodBae
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors duration-200 ${
                location.pathname === link.to
                  ? "text-orange-400"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Cart icon with badge */}
          <Link
            to="/user/cart"
            className="relative p-2 text-gray-300 hover:text-white transition-colors"
            aria-label="Cart"
          >
            <svg
              width="22"
              height="22"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9m-9-4h4"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>

          {/* User avatar + dropdown */}
          <div className="relative hidden md:block" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((p) => !p)}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-full pl-1 pr-3 py-1 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold">
                {getInitials(userData?.name)}
              </div>
              <span className="text-sm text-gray-200 max-w-[100px] truncate">
                {userData?.name || "User"}
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="text-gray-400"
              >
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden z-50">
                {/* User info row */}
                <div className="px-4 py-3 border-b border-gray-700">
                  <p className="text-white text-sm font-semibold truncate">
                    {userData?.name}
                  </p>
                  <p className="text-gray-400 text-xs truncate">
                    {userData?.email}
                  </p>
                </div>
                <Link
                  to="/user/profile"
                  className="flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                >
                  👤 My Profile
                </Link>
                <Link
                  to="/user/orders"
                  className="flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                >
                  📋 My Orders
                </Link>
                <div className="border-t border-gray-700" />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors text-left"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg
                width="22"
                height="22"
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
            ) : (
              <svg
                width="22"
                height="22"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-4 pb-5 pt-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "bg-orange-500/10 text-orange-400"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="border-t border-gray-800 pt-3 mt-3">
            {/* Mobile user info */}
            <div className="flex items-center gap-3 px-3 py-2 mb-2">
              <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-sm font-bold">
                {getInitials(userData?.name)}
              </div>
              <div>
                <p className="text-white text-sm font-medium">
                  {userData?.name}
                </p>
                <p className="text-gray-500 text-xs">{userData?.email}</p>
              </div>
            </div>
            <Link
              to="/user/profile"
              className="block px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-gray-800"
            >
              👤 My Profile
            </Link>
            <Link
              to="/user/orders"
              className="block px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-gray-800"
            >
              📋 My Orders
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-gray-800 mt-1"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
