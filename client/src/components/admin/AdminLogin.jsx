import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosIntance";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // For registration
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/admin/login", {
        email,
        password,
      });
      if (response.data.success) {
        toast.success("Login successful!");
        navigate("/admin");
      }
    } catch (error) {
      toast.error("Invalid email or password. Please try again.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/admin/register", {
        name,
        email,
        password,
      });
      if (response.data.success) {
        toast.success("Registration successful! Please log in.");
        setIsRegister(false); // Switch to login form after registration
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isRegister ? "Admin Register" : "Admin Login"}
        </h2>

        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsRegister(false)}
            className={`px-4 py-2 font-medium rounded-md ${
              !isRegister
                ? "bg-blue-700 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsRegister(true)}
            className={`ml-2 px-4 py-2 font-medium rounded-md ${
              isRegister
                ? "bg-blue-700 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            Register
          </button>
        </div>

        <form
          onSubmit={isRegister ? handleRegister : handleLogin}
          className="space-y-4"
        >
          {isRegister && (
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                placeholder="Enter your name"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition duration-300"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
