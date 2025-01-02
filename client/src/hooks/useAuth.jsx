import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosIntance";
import { saveUser, clearUser } from "../redux/features/UserSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userAuthorized, userInfo } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  // Function to log in the user
  const login = (userData) => {
    dispatch(saveUser(userData)); // Save the user data in Redux store
  };

  const checkUser = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/users/check");
      if (response?.data?.data) {
        dispatch(saveUser(response.data.data));
      } else {
        throw new Error("Unauthorized");
      }
    } catch (error) {
      dispatch(clearUser());
      navigate("/login"); // Redirect to login if unauthorized
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userAuthorized) {
      checkUser();
    }
  }, [userAuthorized]);

  return {
    user: userInfo || null,
    isAuthenticated: userAuthorized,
    loading,
    checkUser,
    login, // Add login to the returned object
  };
};
