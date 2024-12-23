import React, { useEffect, useState } from "react";
import { axiosinstance } from "../config/axiosinstance";
import { Link } from "react-router-dom";
import Loading from "../components/user/Loading";
import Carousel from "../components/user/Carousel";

export const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchRestaurants = async () => {
    try {
      const response = await axiosinstance.get("/api/restaurants"); // Fetch restaurants from the backend
      setRestaurants(response?.data?.restaurants || []);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken"); // Check for user token
    if (token) {
      setIsLoggedIn(true);
    }
    fetchRestaurants();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (restaurants.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">No restaurants found</p>
      </div>
    );
  }

  // Extract all images for the carousel
  const restaurantImages = restaurants.map((restaurant) => restaurant.image);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoggedIn ? (
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Welcome Back! Explore Our Restaurants
          </h1>
        ) : (
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Explore Our Restaurants
          </h1>
        )}

        {/* Carousel */}
        <Carousel images={restaurantImages} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={restaurant.image || "default-image.jpg"}
                alt={restaurant.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {restaurant.name}
                </h2>
                <p className="text-gray-600 mt-2">
                  <strong>Location:</strong> {restaurant.location}
                </p>
                <p className="text-gray-600 mt-1">
                  <strong>Rating:</strong> {restaurant.rating}
                </p>
                <div className="mt-4 text-center">
                  <Link
                    to={`/restaurant/${restaurant._id}`}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                  >
                    See Menu
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
