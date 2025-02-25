// import React from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import { axiosInstance } from "../../config/axiosIntance";
// import toast from "react-hot-toast";
// import Header from "../../components/user/Header";
// export const RegisterPage = ({ role = "user" }) => {
//   const { register, handleSubmit } = useForm();
//   const navigate = useNavigate();

//   const user = {
//     role: "user",
//     register_api: "/user/register",
//     profile_route: "/user/profile",
//     register_route: "register",
//     login_route: "/user/login",
//   };

//   if (role === "admin") {
//     user.role = "admin";
//     (user.login_api = "/admin/login"),
//       (user.profile_route = "/admin/profile"),
//       (user.register_route = "/mentor/register");
//   }

//   console.log(user, "=====user");

//   const onSubmit = async (data) => {
//     try {
//       const response = await axiosInstance({
//         method: "POST",
//         url: "user/register",
//         data,
//       });
//       console.log(response, "====response");
//       const userId = response.data.userId;
//       if (userId) {
//         localStorage.setItem("userId", userId);
//       }
//       toast.success("register success");
//       navigate(user.login_route);
//     } catch (error) {
//       toast.error("user already exist");
//       console.log(error);
//     }
//   };

//   return (
//     <div className="hero bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 min-h-screen flex items-center justify-center">
//       <div className="card w-full max-w-md p-6 bg-white shadow-xl rounded-lg">
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
//           <div className="form-group">
//             <label className="block text-gray-600 font-medium mb-1">Name</label>
//             <input
//               type="text"
//               {...register("name")}
//               placeholder="Enter your name"
//               className="input input-bordered w-full border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
//               required
//             />
//           </div>

//           {/* Email Field */}
//           <div className="form-group">
//             <label className="block text-gray-600 font-medium mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               {...register("email")}
//               placeholder="Enter your email"
//               className="input input-bordered w-full border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
//               required
//             />
//           </div>

//           {/* Phone Number Field */}
//           <div className="form-group">
//             <label className="block text-gray-600 font-medium mb-1">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               {...register("mobile")}
//               placeholder="Enter your phone number"
//               className="input input-bordered w-full border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label className="block text-gray-600 font-medium mb-1">
//               Address
//             </label>
//             <input
//               type="text"
//               {...register("address")}
//               placeholder="Enter your address"
//               className="input input-bordered w-full"
//               required
//             />
//           </div>
//           {/* Password Field */}
//           <div className="form-group">
//             <label className="block text-gray-600 font-medium mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               {...register("password")}
//               placeholder="Enter your password"
//               className="input input-bordered w-full border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
//               required
//             />
//           </div>

//           {/* Signup Button */}
//           <button className="btn btn-primary w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg font-medium">
//             Register
//           </button>
//         </form>

//         {/* Existing User Link */}
//         <p className="text-center text-gray-600 mt-4">
//           Already have an account?{" "}
//           <Link
//             to="/login"
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
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosIntance";
import toast from "react-hot-toast";

const RegisterPage = ({ role = "user" }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  // ✅ Correct API paths based on role
  const user = {
    role: "user",
    register_api: "/user/register",
    profile_route: "/user/profile",
    login_route: "/login",
  };

  if (role === "admin") {
    user.role = "admin";
    user.register_api = "/admin/register";
    user.profile_route = "/admin/profile";
    user.login_route = "/admin/login";
  }

  console.log(user, "=====user");

  // ✅ Register user with improved error handling
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(user.register_api, data);
      console.log(response, "====response");

      if (response.data.success) {
        localStorage.setItem("userId", response.data.userId);
        toast.success("Registration successful! Redirecting...");
        navigate(user.login_route);
      }
    } catch (error) {
      console.error("Registration Error:", error);
      // ✅ Handle "User already exists" error correctly
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message || "User already exists.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
      <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-lg">
        {/* Heading Section */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Create Your Account
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Sign up to explore amazing features. It’s quick and easy!
        </p>

        {/* Form Section */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter your name"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              {...register("mobile", { required: "Phone number is required" })}
              placeholder="Enter your phone number"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Address Field */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Address
            </label>
            <input
              type="text"
              {...register("address", { required: "Address is required" })}
              placeholder="Enter your address"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg font-medium transition duration-200"
          >
            Register
          </button>
        </form>

        {/* Existing User Link */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to={user.login_route}
            className="text-purple-500 font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
