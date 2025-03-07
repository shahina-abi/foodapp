import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosIntance";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EditFoodItem = () => {
  const { id } = useParams(); // Get food item ID from URL
  const [foodData, setFoodData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState("");

  const navigate = useNavigate();

  // ✅ Fetch Food Item Details
  useEffect(() => {
    const fetchFoodItem = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axiosInstance.get(`/foods/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFoodData({
          name: data.foodItem.name,
          price: data.foodItem.price,
          description: data.foodItem.description,
          image: data.foodItem.image,
        });
        setPreviewImage(data.foodItem.image);
      } catch (err) {
        toast.error("Failed to load food item.");
      }
    };
    fetchFoodItem();
  }, [id]);

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData({ ...foodData, [name]: value });
  };

  // ✅ Handle Image Upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFoodData({ ...foodData, image: file });
    setPreviewImage(URL.createObjectURL(file)); // Show preview
  };

  // ✅ Submit Updated Food Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", foodData.name);
      formData.append("price", foodData.price);
      formData.append("description", foodData.description);
      if (foodData.image instanceof File) {
        formData.append("image", foodData.image);
      }

      await axiosInstance.put(`/foods/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Food item updated successfully!");
      navigate("/admin/manage-menu");
    } catch (err) {
      toast.error("Failed to update food item.");
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Edit Food Item</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="w-32 h-32 object-cover mt-2"
            />
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg"
          >
            Update Food Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditFoodItem;
