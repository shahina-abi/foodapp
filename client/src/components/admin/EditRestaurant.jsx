import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosIntance";

const EditRestaurant = () => {
  const { id } = useParams(); // Extract 'id' from the URL
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    website: "",
    image: "",
    cuisineType: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    isActive: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Restaurant ID is not defined");
      return;
    }

    const fetchRestaurantDetails = async () => {
      try {
        const response = await axiosInstance.get(`/restaurants/${id}`);
        const restaurantData = response?.data?.data || {};
        setFormData({
          name: restaurantData.name || "",
          phone: restaurantData.phone || "",
          email: restaurantData.email || "",
          website: restaurantData.website || "",
          image: restaurantData.image || "",
          cuisineType: restaurantData.cuisineType?.join(", ") || "",
          address: {
            street: restaurantData.address?.street || "",
            city: restaurantData.address?.city || "",
            state: restaurantData.address?.state || "",
            postalCode: restaurantData.address?.postalCode || "",
            country: restaurantData.address?.country || "",
          },
          isActive: restaurantData.isActive ?? true,
        });
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
        toast.error("Failed to retrieve restaurant details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...formData,
        cuisineType: formData.cuisineType.split(",").map((type) => type.trim()),
      };
      const response = await axiosInstance.put(
        `/restaurants/${id}`,
        updatedData
      );
      toast.success("Restaurant details updated successfully");
      console.log("Updated restaurant:", response.data);
    } catch (error) {
      console.error("Error updating restaurant details:", error);
      toast.error("Failed to update restaurant details.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto mt-10 max-w-lg bg-white shadow-md rounded-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Edit Restaurant Details
        </h1>

        {formData.image && (
          <div className="flex justify-center mb-6">
            <img
              src={formData.image}
              alt={`${formData.name} restaurant`}
              className="w-40 h-40 object-cover rounded-lg border border-gray-200"
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Restaurant Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="block w-full rounded border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5"
              placeholder="Enter restaurant name"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="block w-full rounded border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5"
              placeholder="Enter phone number"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="block w-full rounded border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5"
              placeholder="Enter email address"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Website
            </label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="block w-full rounded border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5"
              placeholder="Enter website URL"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Cuisine Type
            </label>
            <input
              type="text"
              name="cuisineType"
              value={formData.cuisineType}
              onChange={handleChange}
              className="block w-full rounded border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5"
              placeholder="Enter cuisine types, separated by commas"
            />
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mt-4">Address</h3>
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={formData.address.street}
            onChange={handleAddressChange}
            className="block w-full rounded border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.address.city}
            onChange={handleAddressChange}
            className="block w-full rounded border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.address.state}
            onChange={handleAddressChange}
            className="block w-full rounded border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5"
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={formData.address.postalCode}
            onChange={handleAddressChange}
            className="block w-full rounded border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.address.country}
            onChange={handleAddressChange}
            className="block w-full rounded border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5"
          />

          <div className="form-group">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="form-checkbox rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Active</span>
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRestaurant;
