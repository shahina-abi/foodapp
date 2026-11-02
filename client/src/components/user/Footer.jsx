import React from "react";
import logo1 from "../../assets/images/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* ✅ Logo & Description */}
          <div className="flex flex-col items-center md:items-start">
            <img src={logo1} alt="FoodBae Logo" className="w-24 h-auto mb-4" />
            <h1 className="text-xl font-bold tracking-wide">FoodBae</h1>
            <p className="text-gray-400 text-sm mt-2">
              Your favorite meals, delivered fast & fresh. Order now and enjoy!
            </p>
          </div>

          {/* ✅ Quick Links */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-orange-400">
              Quick Links
            </h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-400 transition duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-400 transition duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-400 transition duration-300"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-400 transition duration-300"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* ✅ Contact Info */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-orange-400">
              Contact Us
            </h2>
            <p className="text-gray-400">📍 123 Food Street, New York, USA</p>
            <p className="text-gray-400">📞 +1 234 567 890</p>
            <p className="text-gray-400">✉️ support@foodbae.com</p>
          </div>
        </div>

        {/* ✅ Social Media Links */}
        <div className="flex justify-center md:justify-between items-center mt-10 border-t border-gray-700 pt-6">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} FoodBae. All Rights Reserved.
          </p>
          <div className="flex space-x-6">
            {/* Twitter */}
            <a
              href="#"
              className="hover:text-orange-400 transition duration-300"
              aria-label="Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="#"
              className="hover:text-orange-400 transition duration-300"
              aria-label="YouTube"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="#"
              className="hover:text-orange-400 transition duration-300"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>

            {/* ✅ Instagram (New) */}
            <a
              href="#"
              className="hover:text-orange-400 transition duration-300"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.849.07 3.252.147 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849s-.012 3.584-.07 4.849c-.147 3.225-1.664 4.771-4.919 4.919-1.265.058-1.645.069-4.849.069s-3.584-.012-4.849-.07c-3.225-.147-4.771-1.664-4.919-4.919-.058-1.265-.069-1.645-.069-4.849s.012-3.584.07-4.849c.147-3.225 1.664-4.771 4.919-4.919 1.265-.058 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.013-4.947.072-4.691.215-7.336 2.859-7.551 7.551-.059 1.28-.072 1.688-.072 4.947s.013 3.667.072 4.947c.215 4.691 2.859 7.336 7.551 7.551 1.28.059 1.688.072 4.947.072s3.667-.013 4.947-.072c4.691-.215 7.336-2.859 7.551-7.551.059-1.28.072-1.688.072-4.947s-.013-3.667-.072-4.947c-.215-4.691-2.859-7.336-7.551-7.551-1.28-.059-1.688-.072-4.947-.072z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
