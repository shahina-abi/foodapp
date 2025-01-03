import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosIntance";
import { useNavigate } from "react-router-dom";

export const AuthUser = ({ children }) => {
  const [isUser, setIsUser] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state for better UX
  const navigate = useNavigate();

  const checkUser = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/user/checkuser", // Endpoint to verify user authentication
      });
      if (response.status === 200) {
        setIsUser(true);
      }
    } catch (error) {
      console.error("User authentication failed:", error);
      navigate("/"); // Redirect unauthenticated users to the home or login page
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Render a loading state
  }

  return isUser ? children : null; // Render children if authenticated
};
