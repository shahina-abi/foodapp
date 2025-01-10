// import axios from "axios";
// const API_URL = import.meta.env.VITE_API_URL;
// export const axiosInstance = axios.create({
//   baseURL: `${API_URL}/api`,
//   withCredentials: true,
// });
// src/config/axiosInstance.js
// import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: "http://localhost:3002/api", // Ensure this is correct and doesn't add `/api` twice
//   withCredentials: true, // Include cookies for authentication
// });
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
});
