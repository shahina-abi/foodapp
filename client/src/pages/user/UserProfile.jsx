// export default UserProfile;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosIntance"; // Custom axios instance
import toast from "react-hot-toast";
import { UserRound } from "lucide-react";
import Loading from "../../components/user/Loading"; // Assuming you have a Loading component

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance({
        url: "/user/profile",
        method: "GET",
        withCredentials: true, // Include cookies for authentication
      });

      console.log("User profile response:", response.data);
      setUser(response.data.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to fetch user profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axiosInstance({
        url: "/user/log-out",
        method: "POST",
        withCredentials: true,
      });

      toast.success("User logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div className="text-center p-4 text-red-500">
        <p>Unable to load user profile.</p>
      </div>
    );
  }

  return (
    <div className="profile-container min-h-screen bg-gray-100 py-10">
      <div className="profile-card container mx-auto bg-white p-6 rounded-lg shadow-md max-w-md text-center">
        {/* Profile Icon */}
        <UserRound className="profile-icon text-gray-500 mx-auto mb-4 w-16 h-16" />

        {/* User Details */}
        <h1 className="profile-email text-lg font-bold text-gray-800">
          {user.email}
        </h1>
        <h2 className="profile-name text-xl font-semibold text-gray-800">
          {user.name}
        </h2>

        <div className="user-details mt-6 space-y-4 text-left">
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Mobile:</span>
            <span className="text-gray-800">
              {user.mobile || "Not Provided"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Address:</span>
            <span className="text-gray-800">
              {user.address || "No address available"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Account Status:</span>
            <span
              className={`text-sm ${
                user.isActive ? "text-green-600" : "text-red-600"
              }`}
            >
              {user.isActive ? "Active" : "Deactivated"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Admin Status:</span>
            <span
              className={`text-sm ${
                user.isAdmin ? "text-green-600" : "text-red-600"
              }`}
            >
              {user.isAdmin ? "Yes" : "No"}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="button-group mt-6 flex justify-between">
          <button
            onClick={handleLogout}
            className="btn btn-error px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
          <Link to={"/user/edit"}>
            <button className="btn btn-primary px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Edit Profile
            </button>
          </Link>
          <Link to={"/user/orders"}>
            <button className="btn btn-primary px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              View Orders
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
