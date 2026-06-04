// //
// // export default RegisterPage;
// import React from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import { axiosInstance } from "../../config/axiosIntance";
// import toast from "react-hot-toast";

// const RegisterPage = ({ role = "user" }) => {
//   const { register, handleSubmit } = useForm();
//   const navigate = useNavigate();

//   // ✅ Correct API paths based on role
//   const user = {
//     role: "user",
//     register_api: "/user/register",
//     profile_route: "/user/profile",
//     login_route: "/login",
//   };

//   if (role === "admin") {
//     user.role = "admin";
//     user.register_api = "/admin/register";
//     user.profile_route = "/admin/profile";
//     user.login_route = "/admin/login";
//   }

//   console.log(user, "=====user");

//   // ✅ Register user with improved error handling
//   const onSubmit = async (data) => {
//     try {
//       const response = await axiosInstance.post(user.register_api, data);
//       console.log(response, "====response");

//       if (response.data.success) {
//         toast.success(response.data.message || "Registration successful!");
//         navigate(user.login_route);
//       }
//     } catch (error) {
//       console.error("Registration Error:", error);
//       toast.error(error.response?.data?.message || "Something went wrong!");
//       // ✅ Handle "User already exists" error correctly
//       if (error.response && error.response.status === 400) {
//         toast.error(error.response.data.message || "User already exists.");
//       } else {
//         toast.error("Something went wrong. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
//       <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-lg">
//         {/* Heading Section */}
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
//           Create Your Account
//         </h1>
//         <p className="text-center text-gray-500 mb-6">
//           Sign up to explore amazing features. It’s quick and easy!
//         </p>

//         {/* Form Section */}
//         <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
//           {/* Name Field */}
//           <div>
//             <label className="block text-gray-600 font-medium mb-1">Name</label>
//             <input
//               type="text"
//               {...register("name", { required: "Name is required" })}
//               placeholder="Enter your name"
//               className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400"
//             />
//           </div>

//           {/* Email Field */}
//           <div>
//             <label className="block text-gray-600 font-medium mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               {...register("email", { required: "Email is required" })}
//               placeholder="Enter your email"
//               className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400"
//             />
//           </div>

//           {/* Phone Number Field */}
//           <div>
//             <label className="block text-gray-600 font-medium mb-1">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               {...register("mobile", { required: "Phone number is required" })}
//               placeholder="Enter your phone number"
//               className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400"
//             />
//           </div>

//           {/* Address Field */}
//           <div>
//             <label className="block text-gray-600 font-medium mb-1">
//               Address
//             </label>
//             <input
//               type="text"
//               {...register("address", { required: "Address is required" })}
//               placeholder="Enter your address"
//               className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400"
//             />
//           </div>

//           {/* Password Field */}
//           <div>
//             <label className="block text-gray-600 font-medium mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               {...register("password", {
//                 required: "Password is required",
//                 minLength: {
//                   value: 6,
//                   message: "Password must be at least 6 characters",
//                 },
//               })}
//               placeholder="Enter your password"
//               className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400"
//             />
//           </div>

//           {/* Signup Button */}
//           <button
//             type="submit"
//             className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg font-medium transition duration-200"
//           >
//             Register
//           </button>
//         </form>

//         {/* Existing User Link */}
//         <p className="text-center text-gray-600 mt-4">
//           Already have an account?{" "}
//           <Link
//             to={user.login_route}
//             className="text-purple-500 font-medium hover:underline"
//           >
//             Log in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosIntance";
import { saveAdmin } from "../../redux/features/AdminSlice.js";

// ─────────────────────────────────────────
// USER REGISTRATION FORM
// ─────────────────────────────────────────
const UserRegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/user/register", data);
      if (response.data.success) {
        toast.success("Account created! Please log in 🎉");
        navigate("/login");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Registration failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (err) =>
    `w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors ${
      err ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"
    }`;

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Full Name
        </label>
        <input
          type="text"
          {...register("name", {
            required: "Name is required",
            minLength: { value: 2, message: "Too short" },
          })}
          placeholder="Shahina Abi"
          className={inputClass(errors.name)}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Email
        </label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
          })}
          placeholder="you@example.com"
          className={inputClass(errors.email)}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Phone Number
        </label>
        <input
          type="tel"
          {...register("mobile", {
            required: "Phone is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Enter valid 10-digit number",
            },
          })}
          placeholder="9876543210"
          className={inputClass(errors.mobile)}
        />
        {errors.mobile && (
          <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Delivery Address
        </label>
        <input
          type="text"
          {...register("address", { required: "Address is required" })}
          placeholder="123 Main St, City"
          className={inputClass(errors.address)}
        />
        {errors.address && (
          <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            placeholder="At least 6 characters"
            className={inputClass(errors.password) + " pr-11"}
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
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 mt-2"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Creating account...
          </>
        ) : (
          "Create Account →"
        )}
      </button>
    </form>
  );
};

// ─────────────────────────────────────────
// ADMIN / RESTAURANT REGISTRATION FORM
// ─────────────────────────────────────────
const AdminRegisterForm = () => {
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
      const response = await axiosInstance.post("/admin/register", data);
      if (!response.data.success) throw new Error(response.data.message);

      // Save admin token + restaurantId
      if (response.data.token) {
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("restaurantId", response.data.restaurantId);
        axiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${response.data.token}`;
        dispatch(saveAdmin(response.data));
        toast.success("Restaurant registered! Welcome to FoodBae 🎉");
        navigate("/admin/dashboard");
      } else {
        toast.success("Registered! Please log in.");
        navigate("/admin/login");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message || error.message || "Registration failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (err) =>
    `w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors ${
      err ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"
    }`;

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {/* ── Admin details */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
          👤 Your Details
        </p>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Restaurant Owner Name"
              className={inputClass(errors.name)}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
              placeholder="owner@restaurant.com"
              className={inputClass(errors.email)}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
                placeholder="At least 6 characters"
                className={inputClass(errors.password) + " pr-11"}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
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
        </div>
      </div>

      {/* ── Restaurant details */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
          🏪 Restaurant Details
        </p>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Restaurant Name
            </label>
            <input
              type="text"
              {...register("restaurant_name", {
                required: "Restaurant name is required",
              })}
              placeholder="Al Baik Hyderabad"
              className={inputClass(errors.restaurant_name)}
            />
            {errors.restaurant_name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.restaurant_name.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Street Address
              </label>
              <input
                type="text"
                {...register("restaurant_address")}
                placeholder="123 Main St"
                className={inputClass()}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                City
              </label>
              <input
                type="text"
                {...register("restaurant_city")}
                placeholder="Hyderabad"
                className={inputClass()}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                State
              </label>
              <input
                type="text"
                {...register("restaurant_state")}
                placeholder="Telangana"
                className={inputClass()}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Country
              </label>
              <input
                type="text"
                {...register("restaurant_country")}
                placeholder="India"
                className={inputClass()}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Phone
              </label>
              <input
                type="tel"
                {...register("restaurant_contact")}
                placeholder="9876543210"
                className={inputClass()}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Restaurant Email
              </label>
              <input
                type="email"
                {...register("restaurant_email")}
                placeholder="info@restaurant.com"
                className={inputClass()}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Cuisine Types
            </label>
            <input
              type="text"
              {...register("restaurant_cuisine")}
              placeholder="Fast Food, Middle Eastern, Grills"
              className={inputClass()}
            />
            <p className="text-xs text-gray-400 mt-1">
              Comma-separated (e.g. Fast Food, Indian, Chinese)
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Opening Time
              </label>
              <input
                type="time"
                {...register("restaurant_open")}
                className={inputClass()}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Closing Time
              </label>
              <input
                type="time"
                {...register("restaurant_close")}
                className={inputClass()}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Website (optional)
            </label>
            <input
              type="text"
              {...register("restaurant_website")}
              placeholder="https://yourrestaurant.com"
              className={inputClass()}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gray-900 hover:bg-gray-800 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Registering...
          </>
        ) : (
          "Register Restaurant →"
        )}
      </button>
    </form>
  );
};

// ─────────────────────────────────────────
// MAIN RegisterPage — same route /register
// ─────────────────────────────────────────
const RegisterPage = () => {
  const [mode, setMode] = useState("user"); // "user" | "admin"

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-100 rounded-full opacity-50" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-50 rounded-full opacity-50" />
      </div>

      <div className="relative w-full max-w-xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl px-8 py-10 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">{mode === "user" ? "🍽️" : "🏪"}</div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              {mode === "user" ? "Create account" : "Register restaurant"}
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              {mode === "user"
                ? "Join FoodBae and start ordering today"
                : "Partner with FoodBae and grow your business"}
            </p>
          </div>

          {/* ── Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => setMode("user")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                mode === "user"
                  ? "bg-orange-500 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              👤 Customer
            </button>
            <button
              onClick={() => setMode("admin")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                mode === "admin"
                  ? "bg-gray-900 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              🏪 Restaurant Partner
            </button>
          </div>

          {/* Mode description badge */}
          <div
            className={`rounded-xl px-4 py-3 mb-5 text-xs leading-relaxed ${
              mode === "user"
                ? "bg-orange-50 border border-orange-100 text-orange-700"
                : "bg-gray-900 border border-gray-800 text-gray-300"
            }`}
          >
            {mode === "user"
              ? "🛵 Sign up to browse restaurants, order food, track deliveries, and manage your orders."
              : "📊 Register your restaurant to manage your menu, track orders, create coupons, and view analytics from your admin dashboard."}
          </div>

          {/* Form — switches based on mode */}
          {mode === "user" ? <UserRegisterForm /> : <AdminRegisterForm />}

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">
              Already have an account?
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <Link
            to={mode === "user" ? "/login" : "/admin/login"}
            className={`block w-full text-center border-2 font-semibold py-3 rounded-xl transition-all duration-200 ${
              mode === "user"
                ? "border-orange-500 text-orange-500 hover:bg-orange-50"
                : "border-gray-800 text-gray-800 hover:bg-gray-50"
            }`}
          >
            {mode === "user" ? "Login Instead" : "Admin Login"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
