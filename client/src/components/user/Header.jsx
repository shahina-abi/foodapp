// import React from "react";
// import { Link } from "react-router-dom";

// export default function Header() {
//   return (
//     <header className="bg-gray-900 text-white shadow-md">
//       <div className="container mx-auto flex justify-between items-center py-4 px-6">
//         {/* Logo */}
//         <div className="text-2xl font-bold text-orange-500">
//           <Link to="/">FoodBae</Link>
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

//             {/* Partner with Us */}
//             <li>
//               <Link
//                 to="/admin/partner"
//                 className="hover:text-orange-400 transition duration-300"
//               >
//                 Partner with Us
//               </Link>
//             </li>
//           </ul>
//         </nav>

//         {/* Login/Signup Buttons */}
//         <div className="flex space-x-4">
//           <Link
//             to="/login"
//             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
//           >
//             join us
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }
import React from "react";
import { Link } from "react-router-dom";
import logo1 from "../../assets/images/logo.png";
export default function Header() {
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
            Join Us
          </Link>
        </div>
      </div>
    </header>
  );
}
