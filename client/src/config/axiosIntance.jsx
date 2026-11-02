// // import axios from "axios";
// // const API_URL = import.meta.env.VITE_API_URL;
// // export const axiosInstance = axios.create({
// //   baseURL: `${API_URL}/api`,
// //   withCredentials: true,
// // });
// // src/config/axiosInstance.js
// // import axios from "axios";

// // export const axiosInstance = axios.create({
// //   baseURL: "http://localhost:3002/api", // Ensure this is correct and doesn't add `/api` twice
// //   withCredentials: true, // Include cookies for authentication
// // });

// import axios from "axios";

// // const API_URL = import.meta.env.VITE_API_URL;

// // export const axiosInstance = axios.create({
// //   baseURL: `${API_URL}/api`,
// //   withCredentials: true,
// // });
// export const axiosInstance = axios.create({
//   baseURL: `${import.meta.env.VITE_API_URL}/api`,
//   withCredentials: true, // ✅ Required for sending cookies
// });
import axios from "axios";

// ── Base URL from environment variable
// In your frontend/.env file make sure you have:
// VITE_API_URL=http://localhost:3002
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3002";

export const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true, // ✅ sends cookies with every request
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Request interceptor
// Automatically attaches token from localStorage if cookie auth fails
axiosInstance.interceptors.request.use(
  (config) => {
    if (!config.headers?.Authorization) {
      const isAdminRequest = config.url?.startsWith("/admin/");
      const token = localStorage.getItem(
        isAdminRequest ? "adminToken" : "userToken",
      );
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response interceptor
// Handles 401 globally — redirects to login if session expires
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear stale auth data
      localStorage.removeItem("user");
      localStorage.removeItem("userToken");
      localStorage.removeItem("userData");
      // Dispatch so Header updates
      window.dispatchEvent(new Event("authChange"));
    }
    return Promise.reject(error);
  },
);
