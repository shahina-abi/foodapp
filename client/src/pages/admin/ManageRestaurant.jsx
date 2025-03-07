// export default ManageRestaurants;
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosIntance";
import { toast } from "react-toastify";
import Sidebar from "../../components/admin/SideBar";
const ManageRestaurant = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    cuisineType: "",
    openingHours: { open: "", close: "" },
    image: null,
  });

  // ✅ Fetch Restaurant Data
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const token = localStorage.getItem("token");
        const restaurantId = localStorage.getItem("restaurantId"); // Get restaurantId from localStorage

        if (!restaurantId) {
          throw new Error("Restaurant ID not found.");
        }

        const { data } = await axiosInstance.get(
          `/restaurants/${restaurantId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (data.success) {
          setRestaurant(data.data);
          setFormData({
            name: data.data.name,
            address: data.data.address.street || "",
            phone: data.data.phone,
            email: data.data.email,
            website: data.data.website || "",
            cuisineType: data.data.cuisineType.join(", "),
            openingHours: data.data.openingHours || { open: "", close: "" },
            image: null, // We won't populate this since it's uploaded separately
          });
        }
      } catch (err) {
        setError("Failed to fetch restaurant data.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, []);

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("openingHours")) {
      const [field, key] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [field]: { ...prev[field], [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Handle File Upload
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const restaurantId = localStorage.getItem("restaurantId"); // Get restaurantId from localStorage

      if (!restaurantId) {
        throw new Error("Restaurant ID not found.");
      }

      const updateData = new FormData();

      updateData.append("name", formData.name);
      updateData.append("address", formData.address);
      updateData.append("phone", formData.phone);
      updateData.append("email", formData.email);
      updateData.append("website", formData.website);
      updateData.append("cuisineType", formData.cuisineType);
      updateData.append("openingHours", JSON.stringify(formData.openingHours));
      if (formData.image) {
        updateData.append("image", formData.image);
      }

      const response = await axiosInstance.put(
        `/restaurants/${restaurantId}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Restaurant updated successfully!");
      setRestaurant(response.data.restaurant);
    } catch (err) {
      toast.error("Failed to update restaurant.");
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Manage Restaurant</h1>
        {loading ? (
          <p>Loading restaurant details...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Restaurant Name"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Website (Optional)"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              name="cuisineType"
              value={formData.cuisineType}
              onChange={handleChange}
              placeholder="Cuisine Type (comma separated)"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <div className="flex space-x-4">
              <input
                type="text"
                name="openingHours.open"
                value={formData.openingHours.open}
                onChange={handleChange}
                placeholder="Opening Time"
                className="w-1/2 px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="openingHours.close"
                value={formData.openingHours.close}
                onChange={handleChange}
                placeholder="Closing Time"
                className="w-1/2 px-4 py-2 border rounded-lg"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {restaurant?.image && (
              <img
                src={restaurant.image}
                alt="Restaurant"
                className="w-32 h-32 object-cover rounded mt-2"
              />
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              Update Restaurant
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ManageRestaurant;
