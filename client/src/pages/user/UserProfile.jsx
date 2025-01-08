import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosIntance";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../../redux/features/UserSlice";
import { useDispatch } from "react-redux";

const UserProfile = () => {
  const [user, setUser] = useState(null); // User state
  const navigate = useNavigate(); // Navigation hook
  const dispatch = useDispatch(); // Redux dispatch for clearing user state

  // Fetch user profile data
  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance.get("/user/profile"); // Fetch from `/user/profile`
      setUser(response.data.user); // Set user data
    } catch (error) {
      console.error("Error fetching profile:", error);
      setUser(null); // Clear user data on error
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await axiosInstance.post("/user/log-out"); // Log out the user
      dispatch(clearUser()); // Clear Redux user state
      navigate("/"); // Redirect to home
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Fetch profile data on component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (!user) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="flex flex-col items-center">
          <img
            src={user.profilepic || "https://via.placeholder.com/150"} // Fallback if no profile pic
            alt="User profile"
            className="rounded-full w-32 h-32 mb-4 object-cover"
          />
          <h1 className="text-xl font-bold mb-2 text-gray-800">{user.name}</h1>
          <p className="text-sm text-gray-600 mb-4">{user.email}</p>
        </div>

        <button className="w-full mb-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Edit Profile
        </button>

        <button
          onClick={handleLogout}
          className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Log-out
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
