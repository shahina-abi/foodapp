// import React from "react";
// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="w-64 bg-gray-800 text-white h-screen p-6">
//       <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
//       <nav>
//         <ul className="space-y-4">
//           <li>
//             <Link
//               to="/admin/dashboard"
//               className="block p-2 hover:bg-gray-700 rounded"
//             >
//               Dashboard
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/admin/users"
//               className="block p-2 hover:bg-gray-700 rounded"
//             >
//               Manage Users
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/admin/orders"
//               className="block p-2 hover:bg-gray-700 rounded"
//             >
//               Manage Orders
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/admin/restaurants"
//               className="block p-2 hover:bg-gray-700 rounded"
//             >
//               Manage Restaurants
//             </Link>
//             <li>
//               <Link
//                 to="/admin/manage-menu"
//                 className="block hover:text-blue-400"
//               >
//                 Manage Menu
//               </Link>
//             </li>
//           </li>
//           <li>
//             <Link
//               to="/admin/coupons"
//               className="block p-2 hover:bg-gray-700 rounded"
//             >
//               Manage coupons
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/admin/profile"
//               className="block p-2 hover:bg-gray-700 rounded"
//             >
//               Profile
//             </Link>
//           </li>
//           <li>
//             <button
//               onClick={() => {
//                 localStorage.removeItem("adminToken");
//                 window.location.href = "/admin/login";
//               }}
//               className="w-full text-left p-2 hover:bg-gray-700 rounded"
//             >
//               Logout
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = React.memo(() => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className=" w-64 bg-gray-800 text-white h-screen p-6">
      <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              to="/admin/dashboard"
              className="block p-2 hover:bg-gray-700 rounded"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className="block p-2 hover:bg-gray-700 rounded"
            >
              Manage Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin/orders"
              className="block p-2 hover:bg-gray-700 rounded"
            >
              Manage Orders
            </Link>
          </li>
          <li>
            <Link
              to="/admin/manage-restaurant"
              className="block p-2 hover:bg-gray-700 rounded"
            >
              Manage My Restaurant
            </Link>
          </li>
          {/* Remove "Manage Coupons" if API is missing */}
          <li>
            <Link
              to="/admin/coupons"
              className="block p-2 hover:bg-gray-700 rounded"
            >
              Manage Coupons
            </Link>
          </li>
          <li>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-full text-left p-2 hover:bg-gray-700 rounded flex justify-between"
            >
              Manage Menu
              <span>{menuOpen ? "▲" : "▼"}</span>
            </button>
            {menuOpen && (
              <ul className="ml-4 mt-2 space-y-2">
                <li>
                  <Link
                    to="/admin/manage-menu"
                    className="block p-2 hover:text-blue-400"
                  >
                    View Menu
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link
              to="/admin/profile"
              className="block p-2 hover:bg-gray-700 rounded"
            >
              Profile
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                localStorage.removeItem("adminToken");
                window.location.href = "/admin/login";
              }}
              className="w-full text-left p-2 hover:bg-gray-700 rounded"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
});

export default Sidebar;
