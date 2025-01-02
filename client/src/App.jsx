// import React from "react";
// import { RouterProvider } from "react-router-dom";
// import { AuthProvider } from "./hooks/useAuth";
// import approuter from "./routes/AppRoutes";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const App = () => {
//   return (
//     <AuthProvider>
//       <ToastContainer position="top-right" autoClose={3000} />
//       <RouterProvider router={approuter} />
//     </AuthProvider>
//   );
// };

// export default App;
// src/App.jsx
import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";

const App = () => {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;
