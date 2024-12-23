// import { createBrowserRouter } from "react-router-dom";
// import UserLayout from "../layout/UserLayout";
// import LoginPage from "../pages/shared/LoginPage";
// import Home from "../pages/user/Home";
// import { RegisterPage } from "../pages/shared/RegisterPage";
// import { ProtectRoute } from "./ProtectRoute";
// import { Menu } from "../pages/user/Menu"; // Ensure this import exists
// import { ErrorPage } from "../pages/shared/ErrorPage"; // Ensure this import exists

// export const router = createBrowserRouter([
//   {
//     path: "",
//     element: <UserLayout />,
//     errorElement: <ErrorPage />,
//     children: [
//       { path: "/", element: <Home /> },
//       { path: "menu", element: <Menu /> },
//       { path: "register", element: <RegisterPage /> },
//       { path: "login", element: <LoginPage /> },
//     ],
//   },
// ]);
import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import LoginPage from "../pages/shared/LoginPage";
import Home from "../pages/user/Home";
import { RegisterPage } from "../pages/shared/RegisterPage";
import { ProtectRoute } from "./ProtectRoute";
import { Menu } from "../pages/user/Menu"; // Ensure this import exists
import FoodItems from "../pages/user/FoodItems"; // Import the FoodItems page
import { ErrorPage } from "../pages/shared/ErrorPage"; // Ensure this import exists

export const router = createBrowserRouter([
  {
    path: "",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "menu", element: <Menu /> },
      { path: "food-items", element: <FoodItems /> }, // Add the FoodItems route
      { path: "register", element: <RegisterPage /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
]);
