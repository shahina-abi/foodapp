import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosIntance";
import { useNavigate } from "react-router-dom";

export const AuthAdmin = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state for better UX
  const navigate = useNavigate();

  const checkAdmin = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/admin/check-admin", // Endpoint to verify admin authentication
      });
      if (response.status === 200) {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error("Admin authentication failed:", error);
      navigate("/"); // Redirect unauthenticated admins to the home or login page
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAdmin();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Render a loading state
  }

  return isAdmin ? children : null; // Render children if authenticated
};
