import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { axiosInstance } from "../config/axiosIntance";
import { saveUser, clearUser } from "../redux/features/UserSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { userAuthorized, user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const login = (userData) => {
    dispatch(saveUser(userData)); // Save user to Redux
  };

  const checkUser = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/user/check");
      if (response.data.success && response.data.user) {
        dispatch(saveUser(response.data.user));
      } else {
        throw new Error("User not authenticated");
      }
    } catch (error) {
      dispatch(clearUser());
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
    user,
    isAuthenticated: userAuthorized,
    loading,
    login,
  };
};
