import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosIntance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddFoodItem = () => {
  const [foodData, setFoodData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantId, setRestaurantId] = useState("");
  const [loadingRestaurants, setLoadingRestaurants] = useState(true);
  const [restaurantError, setRestaurantError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const { data } = await axiosInstance.get("/restaurants/mine", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const ownedRestaurants = data.data || [];
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
        }
        if (!selectedRestaurant) {
          setRestaurantError(
            "No restaurants are linked to this admin account.",
          );
        }
      } catch (error) {
        setRestaurantError(
          error.response?.data?.message || "Failed to load your restaurants.",
        );
      } finally {
        setLoadingRestaurants(false);
      }
    };

    fetchRestaurants();
  }, []);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle Image Upload
  const handleFileChange = (e) => {
    setFoodData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  // ✅ Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      const formData = new FormData();
      formData.append("name", foodData.name);
      formData.append("price", foodData.price);
      formData.append("description", foodData.description);
      formData.append("restaurant", restaurantId); // ✅ Attach Restaurant ID
      if (foodData.image) {
        formData.append("image", foodData.image);
      }

      await axiosInstance.post("/foods/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Food item added successfully!");
      navigate("/admin/manage-menu"); // ✅ Redirect to Menu Page
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add food item.");
    }
  };

  if (loadingRestaurants) {
    return <p className="text-center">Loading restaurants...</p>;
  }

  if (restaurantError) {
    return <p className="text-center text-red-500">{restaurantError}</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Add Food Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={restaurantId}
          onChange={(event) => {
            setRestaurantId(event.target.value);
            localStorage.setItem("restaurantId", event.target.value);
          }}
          className="w-full px-4 py-2 border rounded-lg"
          required
        >
          {restaurants.map((restaurant) => (
            <option key={restaurant._id} value={restaurant._id}>
              {restaurant.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="name"
          value={foodData.name}
          onChange={handleChange}
          placeholder="Food Name"
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <input
          type="number"
          name="price"
          value={foodData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <textarea
          name="description"
          value={foodData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full px-4 py-2 border rounded-lg"
          required
        ></textarea>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Food Item
        </button>
      </form>
    </div>
  );
};

export default AddFoodItem;
