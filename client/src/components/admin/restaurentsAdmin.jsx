import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosinstance } from "../../config/axiosinstance";

const RestaurantsAdmin = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axiosinstance.get("/restaurants");
        setRestaurants(response?.data?.data || []);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        toast.error("Failed to fetch restaurants.");
        setError("An error occurred while fetching restaurants.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this restaurant?")) {
      return;
    }

    try {
      await axiosinstance.delete(`/restaurants/${id}`);
      setRestaurants((prev) =>
        prev.filter((restaurant) => restaurant._id !== id)
      );
      toast.success("Restaurant deleted successfully.");
    } catch (error) {
      console.error("Error deleting restaurant:", error);
      toast.error("Failed to delete restaurant.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto mt-10 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Restaurants</h1>
        <Link
          to="/admin/restaurants/create"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Add New Restaurant
        </Link>
      </div>

      {restaurants.length === 0 ? (
        <div className="text-center text-gray-600">No restaurants found.</div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Name
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Phone
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Email
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant) => (
                <tr key={restaurant._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{restaurant.name}</td>
                  <td className="py-3 px-4">{restaurant.phone}</td>
                  <td className="py-3 px-4">{restaurant.email}</td>
                  <td className="py-3 px-4 flex space-x-3">
                    <Link
                      to={`/admin/restaurants/edit/${restaurant._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(restaurant._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RestaurantsAdmin;
