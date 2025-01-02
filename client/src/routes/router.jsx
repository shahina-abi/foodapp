// // import { createBrowserRouter } from "react-router-dom";
// // import UserLayout from "../layout/UserLayout";
// // import LoginPage from "../pages/shared/LoginPage";
// // import Home from "../pages/user/Home";
// // import { RegisterPage } from "../pages/shared/RegisterPage";
// // import { ProtectRoute } from "./ProtectRoute";
// // import { Menu } from "../pages/user/Menu"; // Ensure this import exists
// // import { ErrorPage } from "../pages/shared/ErrorPage"; // Ensure this import exists

// // export const router = createBrowserRouter([
// //   {
// //     path: "",
// //     element: <UserLayout />,
// //     errorElement: <ErrorPage />,
// //     children: [
// //       { path: "/", element: <Home /> },
// //       { path: "menu", element: <Menu /> },
// //       { path: "register", element: <RegisterPage /> },
// //       { path: "login", element: <LoginPage /> },
// //     ],
// //   },
// // ]);
// import { createBrowserRouter } from "react-router-dom";
// import UserLayout from "../layout/UserLayout";
// import LoginPage from "../pages/shared/LoginPage";
// import Home from "../pages/user/Home";
// import { RegisterPage } from "../pages/shared/RegisterPage";
// import { ProtectRoute } from "./ProtectRoute";
// import { RestaurantsPage } from "../pages/user/RestaurantsPage";
// import { ErrorPage } from "../pages/shared/ErrorPage"; // Ensure this import exists

// export const router = createBrowserRouter([
//   {
//     path: "",
//     element: <UserLayout />,
//     errorElement: <ErrorPage />,
//     children: [
//       { path: "/", element: <Home /> },
//       { path: "register", element: <RegisterPage /> },
//       { path: "login", element: <LoginPage /> },
//       { path: " restaurants", element: <RestaurantsPage /> },
//     ],
//   },
// ]);
import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layout/UserLayout"; // Your shared layout
import Home from "../pages/user/Home"; // Home page component
import { RestaurantsPage } from "../pages/user/RestaurantsPage"; // Restaurants page component
import LoginPage from "../pages/shared/LoginPage"; // Login page component
//import OrderDetails from "../pages/user/OrderDetails";
import UserProfile from "../pages/user/UserProfile";
import RestaurantDetailsPage from "../pages/user/RestaurantDetailsPage";
import FoodItemsPage from "../pages/user/FoodItems";
import CartPage from "../pages/user/CartPage";
import { ProtectRoute } from "./ProtectRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/restaurants", element: <RestaurantsPage /> },
      { path: "/restaurants/:id", element: <RestaurantDetailsPage /> },
      { path: "/restaurants/:restaurantId/foods", element: <FoodItemsPage /> },
      { path: "/login", element: <LoginPage /> },
      {
        path: "user",
        element: <ProtectRoute />,
        children: [
          { path: "/profile", element: <UserProfile /> },
          { path: "/cart", element: <CartPage /> }, // Ensure this matches "/user/cart"
        ],
      },
    ],
  },
]);
export default router;
