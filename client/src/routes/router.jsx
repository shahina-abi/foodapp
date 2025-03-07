import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/user/Home";
import About from "../pages/user/About";
import { LoginPage } from "../pages/user/LoginPage";
import RegisterPage from "../pages/shared/RegisterPage";
import { RestaurantsPage } from "../pages/user/RestaurantsPage";
import RestaurantDetailsPage from "../pages/user/RestaurantDetailsPage";
import FoodItemsPage from "../pages/user/FoodItemsPage";
import { UserLayout } from "../layout/UserLayout";
import AdminLogin from "../components/admin/AdminLogin";
import AdminProfile from "../pages/admin/AdminProfile";
import ManageUsers from "../pages/admin/ ManageUsers";
import ManageOrders from "../pages/admin/ManageOrders";
import ManageRestaurant from "../pages/admin/ManageRestaurant";
import ManageCoupons from "../pages/admin/ManageCoupons";
import AdminDashboard from "../pages/admin/AdminDashboard";
import { ProtectRoute } from "../routes/ProtectRoute";
import { AdminLayout } from "../layout/AdminLayout";
import UserProfile from "../pages/user/UserProfile";
import { CartPage } from "../pages/user/CartPage";
import ErrorPage from "../pages/user/ErrorPage";
import ProtectedRouteAdmin from "./ProtectedRouteAdmin";
import PaymentSuccess from "../pages/user/PaymentSuccess";
import PaymentCancel from "../pages/user/PaymentCancel";
import UserOrders from "../pages/user/OrderDetails";
import AdminRegister from "../components/admin/AdminRegister";
import ManageMenu from "../pages/admin/ManageMenu";
import EditFoodItem from "../pages/admin/EditFoodItem";
import AddFoodItem from "../pages/admin/AddFoodItem";
export const router = createBrowserRouter([
  // User Layout
  {
    path: "/",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
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
          { path: "profile", element: <UserProfile /> },
          { path: "cart", element: <CartPage /> },
          { path: "payment/success", element: <PaymentSuccess /> },
          { path: "payment/cancel", element: <PaymentCancel /> },
          { path: "orders", element: <UserOrders /> },
        ],
      },
    ],
  },

  //Admin Routes
  {
    path: "admin",
    children: [
      { path: "login", element: <AdminLogin /> },
      { path: "register", element: <AdminRegister /> },

      {
        element: (
          <ProtectedRouteAdmin>
            <AdminLayout /> {/* Wrap all admin routes with AdminLayout */}
          </ProtectedRouteAdmin>
        ),
        children: [
          { path: "dashboard", element: <AdminDashboard /> }, // Admin Dashboard
          { path: "profile", element: <AdminProfile /> }, // Admin Profile
          { path: "users", element: <ManageUsers /> }, // Manage Users
          { path: "orders", element: <ManageOrders /> }, // Manage Orders
          { path: "manage-restaurant", element: <ManageRestaurant /> }, // Manage Restaurants
          { path: "coupons", element: <ManageCoupons /> }, // Manage Coupons
          { path: "manage-menu", element: <ManageMenu /> }, // Manage Menu
          { path: "add-food", element: <AddFoodItem /> }, // Add Food Item
          { path: "edit-food/:id", element: <EditFoodItem /> }, // Edit Food Item
        ],
      },
    ],
  },

  {
    path: "*",
    element: <ErrorPage />,
    errorElement: <ErrorPage />,
  },

  // Payment Routes
  {
    path: "payment",
    children: [
      {
        path: "process",
        element: (
          <ProtectRoute>
            <CartPage />
          </ProtectRoute>
        ),
      },
      {
        path: "success",
        element: (
          <ProtectRoute>
            <PaymentSuccess />
          </ProtectRoute>
        ),
      },
      {
        path: "cancel",
        element: (
          <ProtectRoute>
            <PaymentCancel />
          </ProtectRoute>
        ),
      },
    ],
  },
]);

export default router;
