// src/router/ProtectRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectRoute = () => {
  const isAuthenticated = localStorage.getItem("token"); // Replace with your logic
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
