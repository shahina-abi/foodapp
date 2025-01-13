// export default FoodItemsPage;
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosIntance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/UseFetch";

const FoodItemsPage = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { restaurantId } = useParams();

  const categories = [
    "All",
    "Starters",
    "Main Course",
    "Desserts",
    "Beverages",
  ];

  const fetchFoodItems = async () => {
    try {
      const response = await axiosInstance.get(
        `/foods/restaurant/${restaurantId}`
      );
      const items = Array.isArray(response.data)
        ? response.data
        : response.data.foodItems || [];
      setFoodItems(items);
      setFilteredItems(items);
    } catch (error) {
      toast.error("Failed to fetch food items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodItems();
  }, [restaurantId]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterItems(query, selectedCategory);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterItems(searchQuery, category);
  };

  const filterItems = (query, category) => {
    const filtered = foodItems.filter((item) => {
      const matchesQuery = item.name.toLowerCase().includes(query);
      const matchesCategory = category === "All" || item.category === category;
      return matchesQuery && matchesCategory;
    });
    setFilteredItems(filtered);
  };

  const handleAddToCart = async (foodItemId, quantity = 1) => {
    try {
      const response = await axiosInstance.post("/cart/add", {
        foodItemId,
        quantity,
      });
      if (response.data.success) {
        toast.success("Item added to cart!");
      } else {
        toast.error(response.data.message || "Failed to add item.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding to cart.");
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
              Explore Our Menu
            </h1>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <input
                type="text"
                placeholder="Search for food items..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none"
              />
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-lg ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div key={item._id} className="border rounded-lg shadow-md p-4">
                <img
                  src={item.image || "https://via.placeholder.com/300"}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-gray-600 my-2">
                  {item.description.length > 80
                    ? `${item.description.substring(0, 80)}...`
                    : item.description}
                </p>
                <p className="text-lg font-semibold">
                  ${item.price.toFixed(2)}
                </p>
                <button
                  onClick={() => handleAddToCart(item._id)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default FoodItemsPage;
