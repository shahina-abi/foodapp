import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosIntance";

const AdminLogin = () => {
  // Initialize the react-hook-form
  const { register, handleSubmit } = useForm();

  // Navigate after successful login
  const navigate = useNavigate();

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/admin/login", data);
      toast.success("Admin login successful!");
      navigate("/admin"); // Redirect to admin dashboard or home route
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
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
