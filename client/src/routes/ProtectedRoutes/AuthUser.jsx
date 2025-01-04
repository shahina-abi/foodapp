import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosIntance";
import { useNavigate } from "react-router-dom";

export const AuthUser = ({ children }) => {
  const [isUser, setIsUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkUser = async () => {
    try {
      const response = await axiosInstance.get("/users/check"); // Updated endpoint
      if (response.status === 200) {
        setIsUser(true);
      }
    } catch (error) {
      console.error("User authentication failed:", error);
      navigate("/login"); // Redirect to login page if unauthorized
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div> {/* Use a spinner or loader */}
        <p>Verifying user...</p>
      </div>
    );
  }

  return isUser ? children : null;
};
