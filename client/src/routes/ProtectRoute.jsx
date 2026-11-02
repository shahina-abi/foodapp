import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectRoute = () => {
  const { isUserAuth } = useSelector((state) => state.user);

  if (!isUserAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
