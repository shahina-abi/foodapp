import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold text-orange-500">
          <Link to="/">FoodBae</Link>
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
                to="/menu"
                className="hover:text-orange-400 transition duration-300"
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-orange-400 transition duration-300"
              >
                Contact
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
            {/* Partner with Us */}
            <li>
              <Link
                to="/admin/partner"
                className="hover:text-orange-400 transition duration-300"
              >
                Partner with Us
              </Link>
            </li>
          </ul>
        </nav>

        {/* Login/Signup Buttons */}
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
          >
            get started
          </Link>
        </div>
      </div>
    </header>
  );
}
