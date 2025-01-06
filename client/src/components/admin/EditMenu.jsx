import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosIntance";

const EditMenu = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all food items on component mount
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axiosInstance.get("/fooditems/allfood");
        setFoodItems(response.data.foodItems || []);
      } catch (error) {
        console.error("Error fetching food items:", error);
        setError("Failed to retrieve food items.");
        toast.error("Failed to retrieve food items.");
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, []);

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setFoodItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, [name]: value } : item
      )
    );
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    const updatedFoodItem = foodItems.find((item) => item._id === id);

    try {
      const response = await axiosInstance.put(
        `/fooditems/update/${id}`,
        updatedFoodItem
      );
      toast.success("Food item updated successfully");
      console.log("Updated food item:", response.data);
    } catch (error) {
      console.error("Error updating food item:", error);
      toast.error("Failed to update food item.");
    }
  };

  if (loading) return <div className="text-center mt-6">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-6">{error}</div>;
  if (foodItems.length === 0)
    return <div className="text-center mt-6">No food items found.</div>;

  return (
    <div className="edit-food-list p-8 bg-white rounded-lg shadow-lg max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
        Edit Food Items
      </h1>

      {foodItems.map((item) => (
        <form
          key={item._id}
          onSubmit={(e) => handleSubmit(e, item._id)}
          className="space-y-6 border-b border-gray-200 pb-6 mb-8"
        >
          <div className="form-control">
            <label htmlFor={`name-${item._id}`} className="label">
              <span className="label-text font-semibold text-lg">
                Food Name
              </span>
            </label>
            <input
              type="text"
              id={`name-${item._id}`}
              name="name"
              value={item.name}
              onChange={(e) => handleChange(e, item._id)}
              placeholder="Enter food name"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="form-control">
            <label htmlFor={`description-${item._id}`} className="label">
              <span className="label-text font-semibold text-lg">
                Description
              </span>
            </label>
            <textarea
              id={`description-${item._id}`}
              name="description"
              value={item.description}
              onChange={(e) => handleChange(e, item._id)}
              placeholder="Enter food description"
              className="textarea textarea-bordered w-full h-24 focus:outline-none focus:ring-2 focus:ring-blue-600"
            ></textarea>
          </div>

          <div className="form-control">
            <label htmlFor={`price-${item._id}`} className="label">
              <span className="label-text font-semibold text-lg">Price</span>
            </label>
            <input
              type="number"
              id={`price-${item._id}`}
              name="price"
              value={item.price}
              onChange={(e) => handleChange(e, item._id)}
              placeholder="Enter food price"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="form-control">
            <label htmlFor={`image-${item._id}`} className="label">
              <span className="label-text font-semibold text-lg">
                Image URL
              </span>
            </label>
            <input
              type="text"
              id={`image-${item._id}`}
              name="image"
              value={item.image}
              onChange={(e) => handleChange(e, item._id)}
              placeholder="Enter image URL"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {item.image && (
            <div className="flex justify-center mt-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-40 h-40 object-cover rounded-lg shadow-md border border-gray-200"
              />
            </div>
          )}

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="btn btn-blue px-8 py-3 rounded-full text-white font-semibold tracking-wide shadow-md hover:shadow-lg hover:bg-blue-700 transition-all duration-300"
            >
              Save
            </button>
          </div>
        </form>
      ))}
    </div>
  );
};

export default EditMenu;
