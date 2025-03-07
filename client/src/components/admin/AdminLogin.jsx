import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
//import { toast } from "react-toastify";
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
  //     if (response?.data?.token) {
  //       localStorage.setItem("token", response.data.token); // ✅ Store token
  //       axiosInstance.defaults.headers.common[
  //         "Authorization"
  //       ] = `Bearer ${response.data.token}`; // ✅ Attach token

  //       dispatch(saveAdmin(response.data));
  //       toast.success("✅ Log-in successful!", { position: "top-right" });

  //       navigate("/admin/dashboard");
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
  // AdminLogin.jsx
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(admin.login_api, data);
      if (response?.data?.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("restaurantId", response.data.restaurantId); // ✅ Store `restaurantId`
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
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
          Don't have an account?{" "}
          <Link
            to="/admin/register"
            className="text-blue-500 font-semibold hover:underline"
          >
            Sign Up Here
          </Link>
        </p>

        <p className="text-center text-gray-600 mt-4">
          <Link to="/" className="text-blue-500 font-semibold hover:underline">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
