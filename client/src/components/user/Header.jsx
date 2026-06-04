import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo1 from "../../assets/images/logo.png";

export default function Header() {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // ── Read auth & cart from localStorage
  useEffect(() => {
    const syncState = () => {
      try {
        const stored = localStorage.getItem("user");
        setUser(stored ? JSON.parse(stored) : null);
        const cart = localStorage.getItem("cart");
        const items = cart ? JSON.parse(cart) : [];
        const total = items.reduce(
          (sum, item) => sum + (item.quantity || 1),
          0,
        );
        setCartCount(total);
      } catch {
        setUser(null);
        setCartCount(0);
      }
    };
    syncState();
    window.addEventListener("storage", syncState);
    window.addEventListener("authChange", syncState);
    return () => {
      window.removeEventListener("storage", syncState);
      window.removeEventListener("authChange", syncState);
    };
  }, []);

  // ── Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [location]);

  // ── Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("authChange"));
    setUser(null);
    setCartCount(0);
    setDropdownOpen(false);
    navigate("/");
  };

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/restaurants", label: "Restaurants" },
    { to: "/about", label: "About" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white transition-shadow duration-300 ${
        scrolled ? "shadow-lg shadow-black/30" : ""
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-3 px-4 md:px-6">
        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo1} alt="FoodBae" className="w-9 h-9 object-contain" />
          <span className="text-xl font-extrabold text-orange-500 tracking-tight">
            FoodBae
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
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

        {/* ── Right Side ── */}
        <div className="flex items-center gap-3">
          {/* Cart icon */}
          <Link
            to="/cart"
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

          {/* ── Logged in ── */}
          {user ? (
            <div className="relative hidden md:block" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-full pl-1 pr-3 py-1 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold">
                  {getInitials(user.name)}
                </div>
                <span className="text-sm text-gray-200 max-w-[100px] truncate">
                  {user.name}
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden z-50">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    👤 My Profile
                  </Link>
                  <Link
                    to="/orders"
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
          ) : (
            /* ── Logged out ── */
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm font-semibold bg-orange-500 hover:bg-orange-600 active:scale-95 text-white px-4 py-2 rounded-lg transition-all"
              >
                Join Us
              </Link>
            </div>
          )}

          {/* ── Mobile hamburger ── */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
            onClick={() => setMenuOpen((prev) => !prev)}
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

      {/* ── Mobile Menu ── */}
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
            {user ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2 mb-2">
                  <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-sm font-bold">
                    {getInitials(user.name)}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">
                      {user.name}
                    </p>
                    <p className="text-gray-500 text-xs">{user.email}</p>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="block px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-gray-800"
                >
                  👤 My Profile
                </Link>
                <Link
                  to="/orders"
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
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  className="block text-center py-2.5 rounded-lg text-sm font-medium text-gray-300 border border-gray-700 hover:bg-gray-800"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block text-center py-2.5 rounded-lg text-sm font-semibold bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Join Us
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
