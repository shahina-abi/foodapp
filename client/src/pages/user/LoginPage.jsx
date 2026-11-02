// import React from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import toast from "react-hot-toast";
// import { Link } from "react-router-dom";
// import { axiosInstance } from "../../config/axiosIntance";
// import { saveUser } from "../../redux/features/UserSlice";

// export const LoginPage = ({ role = "user" }) => {
//   const { register, handleSubmit } = useForm();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user = {
//     role: "user",
//     login_api: "/user/login",
//     profile_route: "/user/profile",
//     home_route: "/",
//     register_route: "/register",
//   };

//   const onSubmit = async (data) => {
//     try {
//       console.log("Login Data:", data);

//       const response = await axiosInstance.post(user.login_api, data);
//       console.log("Login Response:", response.data);

//       // if (response.data.data) {
//       //   dispatch(saveUser(response.data.data));
//       // }
//       if (response.data.data) {
//         dispatch(saveUser(response.data.data));
//         localStorage.setItem("userData", JSON.stringify(response.data.data));
//       }
//       toast.success("Log-in success");
//       navigate(user.home_route);
//     } catch (error) {
//       toast.error("Log-in failed");
//       console.log("Login Error:", error);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-500 to-yellow-400">
//       <div className="bg-white shadow-lg rounded-lg max-w-md w-full px-8 py-10">
//         <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">
//           Login Now!
//         </h1>
//         <p className="text-gray-600 text-center mb-6">
//           Access your account and start ordering your favorite meals.
//         </p>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               {...register("email", { required: true })}
//               placeholder="Enter your email"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
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
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
//             />
//             <div className="text-right mt-1">
//               <a href="#" className="text-sm text-orange-500 hover:underline">
//                 Forgot password?
//               </a>
//             </div>
//           </div>
//           <div>
//             <button
//               type="submit"
//               className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition duration-300"
//             >
//               Login
//             </button>
//           </div>
//         </form>
//         <p className="text-center text-gray-600 mt-4">
//           Don't have an account?{" "}
//           <Link
//             className="text-orange-500 font-semibold hover:underline"
//             to={user.register_route}
//           >
//             Register Now
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosIntance";
import { saveUser } from "../../redux/features/UserSlice";

export const LoginPage = ({ role = "user" }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const user = {
    login_api: role === "admin" ? "/admin/login" : "/user/login",
    home_route: role === "admin" ? "/admin/dashboard" : "/",
    register_route: "/register",
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(user.login_api, data);
      const userData = response.data.data;
      const token = response.data.token;

      if (userData) {
        // ✅ Save to Redux
        dispatch(saveUser(userData));

        // ✅ Save user info — matches Header.jsx
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: userData.name,
            email: userData.email,
            role: userData.role,
            id: userData.id,
          }),
        );

        // ✅ Save token — axios interceptor sends this as Bearer header
        if (token) {
          localStorage.setItem("userToken", token);
        }

        // ✅ Tell Header to update immediately
        window.dispatchEvent(new Event("authChange"));
      }

      toast.success("Welcome back! 🎉");
      navigate(user.home_route);
    } catch (error) {
      const msg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Login failed";
      toast.error(msg);
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-100 rounded-full opacity-60" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-50 rounded-full opacity-60" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white shadow-xl rounded-2xl px-8 py-10 border border-gray-100">
          {/* Logo / brand */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-2">🍔</div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Welcome back
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Log in to order your favourite meals
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                })}
                placeholder="you@example.com"
                className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors ${
                  errors.email
                    ? "border-red-400 bg-red-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <a href="#" className="text-xs text-orange-500 hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Min 6 characters" },
                  })}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 pr-11 transition-colors ${
                    errors.password
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login →"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">
              Don't have an account?
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <Link
            to={user.register_route}
            className="block w-full text-center border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold py-3 rounded-xl transition-all duration-200"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
