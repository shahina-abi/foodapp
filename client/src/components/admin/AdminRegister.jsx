// export default AdminRegister;
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../../config/axiosIntance.jsx";
import { saveAdmin } from "../../redux/features/AdminSlice.js";

export const AdminRegister = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // AdminRegister.jsx
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/admin/register", data);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("restaurantId", response.data.restaurantId); // ✅ Store `restaurantId`
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      dispatch(saveAdmin(response.data));
      toast.success("✅ Registration successful!");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error.message || "❌ Registration failed.");
      console.error("Registration Error:", error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Admin & Restaurant Registration
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Admin Details */}
          <h2 className="text-lg font-semibold text-gray-700">Admin Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              {...register("name")}
              placeholder="Admin Name"
              className="input-field"
            />
            <input
              type="email"
              {...register("email")}
              placeholder="Admin Email"
              className="input-field"
            />
          </div>
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="input-field"
          />

          {/* Restaurant Details */}
          <hr className="my-4 border-gray-300" />
          <h2 className="text-lg font-semibold text-gray-700">
            Restaurant Details
          </h2>
          <input
            type="text"
            {...register("restaurant_name")}
            placeholder="Restaurant Name"
            className="input-field"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              {...register("restaurant_address")}
              placeholder="Street Address"
              className="input-field"
            />
            <input
              type="text"
              {...register("restaurant_city")}
              placeholder="City"
              className="input-field"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              {...register("restaurant_state")}
              placeholder="State"
              className="input-field"
            />
            <input
              type="text"
              {...register("restaurant_postalCode")}
              placeholder="Postal Code"
              className="input-field"
            />
          </div>
          <input
            type="text"
            {...register("restaurant_country")}
            placeholder="Country"
            className="input-field"
          />
          <input
            type="text"
            {...register("restaurant_contact")}
            placeholder="Phone Number"
            className="input-field"
          />
          <input
            type="email"
            {...register("restaurant_email")}
            placeholder="Restaurant Email"
            className="input-field"
          />
          <input
            type="text"
            {...register("restaurant_website")}
            placeholder="Website (optional)"
            className="input-field"
          />
          <input
            type="text"
            {...register("restaurant_cuisine")}
            placeholder="Cuisine Type (comma-separated)"
            className="input-field"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="time"
              {...register("restaurant_open")}
              placeholder="Opening Time"
              className="input-field"
            />
            <input
              type="time"
              {...register("restaurant_close")}
              placeholder="Closing Time"
              className="input-field"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
        </form>

        {/* Redirect to Login */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/admin/login"
            className="text-blue-500 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminRegister;
