// import React from "react";
// import { useForm } from "react-hook-form";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// //import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { saveAdmin } from "../../redux/features/AdminSlice.js";
// import { axiosInstance } from "../../config/axiosIntance.jsx"; // Fixed spelling

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

//   // const onSubmit = async (data) => {
//   //   try {
//   //     const response = await axiosInstance.post(admin.login_api, data);
//   //     if (response?.data?.token) {
//   //       localStorage.setItem("token", response.data.token); // ✅ Store token
//   //       axiosInstance.defaults.headers.common[
//   //         "Authorization"
//   //       ] = `Bearer ${response.data.token}`; // ✅ Attach token

//   //       dispatch(saveAdmin(response.data));
//   //       toast.success("✅ Log-in successful!", { position: "top-right" });

//   //       navigate("/admin/dashboard");
//   //     } else {
//   //       toast.error("❌ Invalid credentials", { position: "top-right" });
//   //     }
//   //   } catch (error) {
//   //     toast.error("❌ Log-in failed. Please try again.", {
//   //       position: "top-right",
//   //     });
//   //     console.error("Login Error:", error);
//   //   }
//   // };
//   // AdminLogin.jsx
//   const onSubmit = async (data) => {
//     try {
//       const response = await axiosInstance.post(admin.login_api, data);
//       if (response?.data?.token) {
//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem("restaurantId", response.data.restaurantId); // ✅ Store `restaurantId`
//         axiosInstance.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${response.data.token}`;
//         dispatch(saveAdmin(response.data));
//         toast.success("✅ Log-in successful!", { position: "top-right" });
//         navigate("/admin/dashboard");
//       } else {
//         toast.error("❌ Invalid credentials", { position: "top-right" });
//       }
//     } catch (error) {
//       toast.error("❌ Log-in failed. Please try again.", {
//         position: "top-right",
//       });
//       console.error("Login Error:", error);
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
//           Don't have an account?{" "}
//           <Link
//             to="/admin/register"
//             className="text-blue-500 font-semibold hover:underline"
//           >
//             Sign Up Here
//           </Link>
//         </p>

//         <p className="text-center text-gray-600 mt-4">
//           <Link to="/" className="text-blue-500 font-semibold hover:underline">
//             ← Back to Home
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosIntance.jsx";
import { saveAdmin } from "../../redux/features/AdminSlice.js";

export const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/admin/login", data);

      if (response?.data?.token) {
        // ✅ Save token + restaurantId
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("restaurantId", response.data.restaurantId);
        axiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${response.data.token}`;
        dispatch(saveAdmin(response.data));
        toast.success("Welcome back! 🎉");
        navigate("/admin/dashboard");
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(msg);
      console.error("Admin Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl px-8 py-10 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-lg shadow-orange-500/30">
              🏪
            </div>
            <h1 className="text-2xl font-extrabold text-white">Admin Portal</h1>
            <p className="text-gray-400 text-sm mt-1">
              Sign in to manage your restaurant
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-1.5">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                })}
                placeholder="admin@restaurant.com"
                className={`w-full px-4 py-3 rounded-xl text-sm bg-gray-800 border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${
                  errors.email ? "border-red-500" : "border-gray-700"
                }`}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 rounded-xl text-sm bg-gray-800 border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 pr-11 transition-colors ${
                    errors.password ? "border-red-500" : "border-gray-700"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In →"
              )}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-800" />
              <span className="text-xs text-gray-500">New restaurant?</span>
              <div className="flex-1 h-px bg-gray-800" />
            </div>
            <Link
              to="/register"
              className="block w-full text-center border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold py-3 rounded-xl transition-all text-sm"
              onClick={() => {}}
            >
              Register Your Restaurant
            </Link>
            <Link
              to="/"
              className="block text-center text-xs text-gray-500 hover:text-gray-300 transition-colors mt-2"
            >
              ← Back to FoodBae
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
