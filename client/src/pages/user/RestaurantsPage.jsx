import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosIntance"; // Ensure the path is correct for your axios instance
import { Link } from "react-router-dom";
import Loading from "../../components/user/Loading";
import Carousel from "../../components/user/Carousal";

export const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fetch restaurants from the API
  const fetchRestaurants = async () => {
    try {
      const response = await axiosInstance.get("/restaurants");
      console.log("API Response:", response);
      const data = response?.data?.data || [];
      console.log("Restaurants Data:", data);
      setRestaurants(data);
      setFilteredRestaurants(data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  // Run the fetchRestaurants function when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) setIsLoggedIn(true);
    fetchRestaurants();
  }, []);

  // Handle search functionality
  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchValue)
    );
    setFilteredRestaurants(filtered);
  };

  // Loading state
  if (loading) return <Loading />;

  // If no restaurants found
  if (restaurants.length === 0)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">No restaurants found</p>
      </div>
    );

  // Extract images for the carousel
  const restaurantImages = restaurants.map((restaurant) => restaurant.image);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          {isLoggedIn
            ? "Welcome Back! Explore Our Restaurants"
            : "Explore Our Restaurants"}
        </h1>

        {/* Search Field */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Enter restaurant name"
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Carousel */}
        <Carousel images={restaurantImages} />

        {/* Restaurant Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {restaurant.image ? (
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  No Image Available
                </div>
              )}
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
                <div className="mt-4 text-left">
                  <Link
                    to={`/restaurants/${restaurant._id}`}
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
