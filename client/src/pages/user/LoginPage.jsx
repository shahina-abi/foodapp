import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config/axiosIntance";

export const LoginPage = ({ role = "user" }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const user = {
    role: "user",
    login_api: "/user/login",
    profile_route: "/user/profile",
    home_route: "/",
    register_route: "/register",
  };

  console.log(user, "=====user");

  const onSubmit = async (data) => {
    try {
      console.log(data, "====data");

      const response = await axiosInstance({
        method: "POST",
        url: user.login_api,
        data,
      });
      console.log(response, "=====response");
      toast.success("Log-in success");
      navigate(user.home_route);
    } catch (error) {
      toast.error("Log-in failed");
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-500 to-yellow-400">
      <div className="bg-white shadow-lg rounded-lg max-w-md w-full px-8 py-10">
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">
          Login Now!
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Access your account and start ordering your favorite meals.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <div className="text-right mt-1">
              <a href="#" className="text-sm text-orange-500 hover:underline">
                Forgot password?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link
            className="text-orange-500 font-semibold hover:underline"
            to={user.register_route} // Assuming this is the correct property name
          >
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
