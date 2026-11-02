// export default ManageMenu;
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosIntance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/SideBar";
const ManageMenu = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantId, setRestaurantId] = useState("");
  const [loadingRestaurants, setLoadingRestaurants] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axiosInstance.get("/restaurants/mine", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const ownedRestaurants = response.data.data || [];
        const savedRestaurantId = localStorage.getItem("restaurantId");
        const selectedRestaurant = ownedRestaurants.some(
          (restaurant) => restaurant._id === savedRestaurantId,
        )
          ? savedRestaurantId
          : ownedRestaurants[0]?._id || "";

        setRestaurants(ownedRestaurants);
        setRestaurantId(selectedRestaurant);
        if (selectedRestaurant) {
          localStorage.setItem("restaurantId", selectedRestaurant);
        } else {
          setError("No restaurants are linked to this admin account.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load restaurants.");
      } finally {
        setLoadingRestaurants(false);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    const fetchFoodItems = async () => {
      if (!restaurantId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const token = localStorage.getItem("adminToken");
        const response = await axiosInstance.get(
          `/foods/restaurant/${restaurantId}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (response.data.success) {
          setFoodItems(response.data.foodItems || []);
        } else {
          throw new Error("Failed to fetch food items.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load menu items.");
        toast.error(err.response?.data?.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, [restaurantId]);

  // ✅ Delete Food Item
  const deleteFoodItem = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axiosInstance.delete(`/foods/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFoodItems(foodItems.filter((item) => item._id !== id));
      toast.success("Food item deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete item.");
    }
  };

  if (loadingRestaurants || loading) {
    return <p className="text-center">Loading menu items...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Manage Menu</h1>
        <label className="block mb-4 max-w-md">
          <span className="block text-sm font-medium mb-1">Restaurant</span>
          <select
            value={restaurantId}
            onChange={(event) => {
              const selectedId = event.target.value;
              setRestaurantId(selectedId);
              localStorage.setItem("restaurantId", selectedId);
              setError(null);
            }}
            className="w-full px-4 py-2 border rounded-lg"
          >
            {restaurants.map((restaurant) => (
              <option key={restaurant._id} value={restaurant._id}>
                {restaurant.name}
              </option>
            ))}
          </select>
        </label>
        <button
          onClick={() => navigate("/admin/add-food")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-4"
        >
          + Add New Food Item
        </button>

        <div className="overflow-x-auto">
          {foodItems.length === 0 ? (
            <p className="text-center text-gray-600">No food items found.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 border">Image</th>
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Price</th>
                  <th className="p-3 border">Description</th>
                  <th className="p-3 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {foodItems.map((item) => (
                  <tr key={item._id} className="text-center">
                    <td className="p-3 border">
                      <img
                        src={item.image || "https://via.placeholder.com/100"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="p-3 border">{item.name}</td>
                    <td className="p-3 border">₹{item.price.toFixed(2)}</td>
                    <td className="p-3 border">{item.description}</td>
                    <td className="p-3 border">
                      <button
                        onClick={() => navigate(`/admin/edit-food/${item._id}`)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteFoodItem(item._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageMenu;
