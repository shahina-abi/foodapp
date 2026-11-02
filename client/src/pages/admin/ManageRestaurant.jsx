// export default ManageRestaurants;
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosIntance";
import { toast } from "react-toastify";
import Sidebar from "../../components/admin/SideBar";
const ManageRestaurant = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantId, setRestaurantId] = useState("");
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
          (item) => item._id === savedRestaurantId,
        )
          ? savedRestaurantId
          : ownedRestaurants[0]?._id || "";

        setRestaurants(ownedRestaurants);
        setRestaurantId(selectedRestaurant);
        if (selectedRestaurant) {
          localStorage.setItem("restaurantId", selectedRestaurant);
        } else {
          setError("No restaurants are linked to this admin account.");
          setLoading(false);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load restaurants.");
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    if (!restaurantId) return;

    const fetchRestaurant = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("adminToken");
        const { data } = await axiosInstance.get(
          `/restaurants/${restaurantId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (data.success) {
          setRestaurant(data.data);
          setFormData({
            name: data.data.name,
            address: data.data.address?.street || "",
            phone: data.data.phone,
            email: data.data.email,
            website: data.data.website || "",
            cuisineType: (data.data.cuisineType || []).join(", "),
            openingHours: data.data.openingHours || { open: "", close: "" },
            image: null,
          });
        }
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch restaurant data.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [restaurantId]);

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
      const token = localStorage.getItem("adminToken");

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
        },
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
            <select
              value={restaurantId}
              onChange={(event) => {
                const selectedId = event.target.value;
                setRestaurantId(selectedId);
                localStorage.setItem("restaurantId", selectedId);
              }}
              className="w-full px-4 py-2 border rounded-lg"
              required
            >
              {restaurants.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
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
