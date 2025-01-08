// // // import { createBrowserRouter } from "react-router-dom";
// // // import UserLayout from "../layout/UserLayout";
// // // import LoginPage from "../pages/shared/LoginPage";
// // // import Home from "../pages/user/Home";
// // // import { RegisterPage } from "../pages/shared/RegisterPage";
// // // import { ProtectRoute } from "./ProtectRoute";
// // // import { Menu } from "../pages/user/Menu"; // Ensure this import exists
// // // import { ErrorPage } from "../pages/shared/ErrorPage"; // Ensure this import exists

// // // export const router = createBrowserRouter([
// // //   {
// // //     path: "",
// // //     element: <UserLayout />,
// // //     errorElement: <ErrorPage />,
// // //     children: [
// // //       { path: "/", element: <Home /> },
// // //       { path: "menu", element: <Menu /> },
// // //       { path: "register", element: <RegisterPage /> },
// // //       { path: "login", element: <LoginPage /> },
// // //     ],
// // //   },
// // // ]);
// // import { createBrowserRouter } from "react-router-dom";
// // import UserLayout from "../layout/UserLayout";
// // import LoginPage from "../pages/shared/LoginPage";
// // import Home from "../pages/user/Home";
// // import { RegisterPage } from "../pages/shared/RegisterPage";
// // import { ProtectRoute } from "./ProtectRoute";
// // import { RestaurantsPage } from "../pages/user/RestaurantsPage";
// // import { ErrorPage } from "../pages/shared/ErrorPage"; // Ensure this import exists

// // export const router = createBrowserRouter([
// //   {
// //     path: "",
// //     element: <UserLayout />,
// //     errorElement: <ErrorPage />,
// //     children: [
// //       { path: "/", element: <Home /> },
// //       { path: "register", element: <RegisterPage /> },
// //       { path: "login", element: <LoginPage /> },
// //       { path: " restaurants", element: <RestaurantsPage /> },
// //     ],
// //   },
// // ]);
// import { createBrowserRouter, Outlet } from "react-router-dom";
// import UserLayout from "../layout/UserLayout"; // Your shared layout
// import Home from "../pages/user/Home"; // Home page component
// import { RestaurantsPage } from "../pages/user/RestaurantsPage"; // Restaurants page component
// import LoginPage from "../pages/shared/LoginPage"; // Login page component
// //import OrderDetails from "../pages/user/OrderDetails";
// import UserProfile from "../pages/user/UserProfile";
// import RestaurantDetailsPage from "../pages/user/RestaurantDetailsPage";
// import FoodItemsPage from "../pages/user/FoodItems";
// import { CartPage } from "../pages/user/CartPage";
// import AdminDashboard from "../pages/admin/AdminDashboard";
// import { AuthAdmin } from "./ProtectedRoutes/AuthAdmin";
// import { AuthUser } from "./ProtectedRoutes/AuthUser";
// import AdminLayout from "../layout/AdminLayout";
// import { RegisterPage } from "../pages/shared/RegisterPage";
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <UserLayout />,
//     children: [
//       { path: "/", element: <Home /> }, // Public route
//       { path: "/restaurants", element: <RestaurantsPage /> }, // Public route
//       { path: "/restaurants/:id", element: <RestaurantDetailsPage /> }, // Public route
//       { path: "/restaurants/:restaurantId/foods", element: <FoodItemsPage /> }, // Public route
//       { path: "/login", element: <LoginPage /> }, // Public route for login
//       { path: "/register", element: <RegisterPage /> },

//       // Protected Routes for Authenticated Users
//       {
//         path: "/users",
//         element: (
//           <AuthUser>
//             <Outlet />
//           </AuthUser>
//         ),
//         childern: [
//           {
//             path: "/profile",
//             element: <UserProfile />,
//           },
//           {
//             path: "/cart",
//             element: <CartPage />,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     path: "/admin",
//     element: (
//       <AuthAdmin>
//         <AdminLayout />
//       </AuthAdmin>
//     ),
//     children: [{ path: "/admin", element: <AdminDashboard /> }],
//   },
// ]);
// export default router;
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/user/Home";
import About from "../pages/user/About";
import { LoginPage } from "../pages/user/LoginPage";
import RegisterPage from "../pages/shared/RegisterPage";
import { RestaurantsPage } from "../pages/user/RestaurantsPage";
import RestaurantDetailsPage from "../pages/user/RestaurantDetailsPage";
import FoodItemsPage from "../pages/user/FoodItemsPage";
import UserLayout from "../layout/UserLayout";
import AdminLogin from "../components/admin/AdminLogin";
import AdminProfile from "../components/admin/AdminProfile";
import { CreateRestaurants } from "../components/admin/CreateReastaurents";
import EditRestaurant from "../components/admin/EditRestaurant";
import EditMenu from "../components/admin/EditMenu";
import UserList from "../components/admin/UserList";
import { ProtectRoute } from "./ProtectRoute";
import { Adminlayout } from "../layout/Adminlayout";
import UserProfile from "../pages/user/UserProfile";
import { CartPage } from "../pages/user/CartPage";
import ErrorPage from "../pages/user/ErrorPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "restaurants", element: <RestaurantsPage /> },
      { path: "restaurants/:id", element: <RestaurantDetailsPage /> },
      { path: "restaurants/:restaurantId/foods", element: <FoodItemsPage /> },

      {
        path: "user",
        element: <ProtectRoute />,
        children: [
          { path: "profile", element: <UserProfile /> }, // Correct: Relative path
          // Correct: Relative path
        ],
        
    path: 'Cart',
    element: (
      <AuthUser>
        <UserLayout />
      </AuthUser>
    ),
    children: [
      {
        path: 'getcart',
        element: <CartPage />
      }
      },
    ],
  },
  {
    path: "admin",
    element: <Adminlayout />,
    children: [
      { path: "login", element: <AdminLogin /> }, // Correct: Relative path
      { path: "profile", element: <AdminProfile /> },
      { path: "createrestaurant", element: <CreateRestaurants /> },
      { path: "edit-restaurant/:id", element: <EditRestaurant /> },
      { path: "editmenu", element: <EditMenu /> },
      { path: "users", element: <UserList /> },
    ],
  },
]);
export default router;
