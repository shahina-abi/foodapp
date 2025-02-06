// import React from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { saveAdmin } from "../../redux/features/AdminSlice.js";

// import { axiosInstance } from "../../config/axiosIntance";
// export const AdminLogin = () => {
//   const { register, handleSubmit } = useForm();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const admin = {
//     role: "admin",
//     login_api: "/admin/login",
//     profile_route: "/admin/profile",
//   };

//   console.log(admin, "=====user");
//   const onSubmit = async (data) => {
//     try {
//       const response = await axiosInstance.post(admin.login_api, data);
//       console.log(response.data, "====API Response");

//       if (response?.data?.data) {
//         dispatch(saveAdmin(response.data.data)); // ✅ Save admin in Redux
//         toast.success("Log-in success"); // ✅ Show success toast
//         navigate("/admin/dashboard"); // ✅ Navigate to admin dashboard
//       } else {
//         toast.error("Invalid credentials");
//       }
//     } catch (error) {
//       toast.error("Log-in failed");
//       console.error("Login Error:", error);
//     }
//   };

//   const onSubmit = async (data) => {
//     try {
//       const response = await axiosInstance({
//         method: "POST",
//         url: admin.login_api,
//         data,
//       });
//       console.log(response, "====response");
//       if (response?.data?.data) {
//         dispatch(saveAdmin(response.data.data));
//         toast.success("Log-in success");
//         navigate("/admin/dashboard");
//       } else {
//         toast.error("Invalid credentials");
//       }
//       console.log(admin);
//     } catch (error) {
//       toast.error("Log-in failed");
//       console.log(error);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-600">
//       <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           Admin Login
//         </h1>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               {...register("email", { required: true })}
//               placeholder="Enter your email"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               {...register("password", { required: true })}
//               placeholder="Enter your password"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
//             >
//               Login
//             </button>
//           </div>
//         </form>
//         <p className="text-center text-gray-600 mt-4">
//           Forgot your password?{" "}
//           <Link
//             to="/admin/forgot-password"
//             className="text-blue-500 font-semibold hover:underline"
//           >
//             Reset it here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//import toast from "react-hot-toast";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { saveAdmin } from "../../redux/features/AdminSlice.js";
import { axiosInstance } from "../../config/axiosIntance.jsx"; // Fixed spelling

export const AdminLogin = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const admin = {
    role: "admin",
    login_api: "/admin/login",
    profile_route: "/admin/profile",
  };

  console.log(admin, "=====user");
  // const onSubmit = async (data) => {
  //   try {
  //     const response = await axiosInstance.post(admin.login_api, data);
  //     console.log("API Response:", response.data);

  //     if (response?.data?.token) {
  //       dispatch(saveAdmin(response.data)); // Save admin in Redux
  //       toast.success("✅ Log-in successful!", { position: "top-right" });

  //       console.log("✅ Navigating to /admin/dashboard..."); // Debug log
  //       navigate("/admin/dashboard"); // Ensure this is executed
  //     } else {
  //       toast.error("❌ Invalid credentials", { position: "top-right" });
  //     }
  //   } catch (error) {
  //     toast.error("❌ Log-in failed. Please try again.", {
  //       position: "top-right",
  //     });
  //     console.error("Login Error:", error);
  //   }
  // };
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(admin.login_api, data);
      if (response?.data?.token) {
        localStorage.setItem("token", response.data.token); // ✅ Store token
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`; // ✅ Attach token

        dispatch(saveAdmin(response.data));
        toast.success("✅ Log-in successful!", { position: "top-right" });

        navigate("/admin/dashboard");
      } else {
        toast.error("❌ Invalid credentials", { position: "top-right" });
      }
    } catch (error) {
      toast.error("❌ Log-in failed. Please try again.", {
        position: "top-right",
      });
      console.error("Login Error:", error);
    }
  };

  // ✅ Fixed duplicate onSubmit function
  // const onSubmit = async (data) => {
  //   try {
  //     const response = await axiosInstance.post(admin.login_api, data);
  //     console.log(response.data, "====API Response");

  //     if (response?.data?.data) {
  //       dispatch(saveAdmin(response.data.data)); // Save admin in Redux
  //       toast.success("Log-in success");
  //       console.log("Navigating to /admin/dashboard"); // Debug log
  //       navigate("/admin/dashboard"); // Redirect to dashboard
  //     } else {
  //       toast.error("Invalid credentials");
  //     }
  //   } catch (error) {
  //     toast.error("Log-in failed");
  //     console.error("Login Error:", error);
  //   }
  // };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-600">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Forgot your password?{" "}
          <Link
            to="/admin/forgot-password"
            className="text-blue-500 font-semibold hover:underline"
          >
            Reset it here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
