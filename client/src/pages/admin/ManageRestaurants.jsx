import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosIntance";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ManageRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data } = await axiosInstance.get("/admin/restaurants");
        setRestaurants(data.restaurants);
      } catch (err) {
        toast.error("Failed to fetch restaurants");
      }
    };

    fetchRestaurants();
  }, []);

  const deleteRestaurant = async (restaurantId) => {
    try {
      await axiosInstance.delete(`/admin/restaurants/${restaurantId}`);
      setRestaurants(restaurants.filter((r) => r._id !== restaurantId));
      toast.success("Restaurant deleted!");
    } catch (err) {
      toast.error("Failed to delete restaurant");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Restaurants</h1>

      <div className="flex justify-end mb-4">
        <Link
          to="/admin/create-restaurant"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add New Restaurant
        </Link>
      </div>

      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant) => (
              <tr key={restaurant._id} className="text-center">
                <td className="p-3 border">{restaurant.name}</td>
                <td className="p-3 border">{restaurant.location}</td>
                <td className="p-3 border">
                  <Link
                    to={`/admin/edit-restaurant/${restaurant._id}`}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => deleteRestaurant(restaurant._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRestaurants;
