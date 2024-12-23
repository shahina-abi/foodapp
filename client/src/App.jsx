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
import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
