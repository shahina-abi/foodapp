import { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosIntance";
import toast from "react-hot-toast";

export function CreateRestaurants() {
  const [restaurantImage, setRestaurantImage] = useState({
    preview: "",
    data: "",
  });
  const [restaurantStatus, setRestaurantStatus] = useState("");
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    phone: "",
    email: "",
    website: "",
    cuisineType: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axiosInstance.get("/restaurants");
        const restaurantList = response.data.data;
        if (Array.isArray(restaurantList)) {
          setRestaurants(restaurantList);
        }
      } catch (error) {
        toast.error("Failed to fetch restaurants.");
      }
    };

    fetchRestaurants();
  }, []);

  const handleRestaurantSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", restaurantImage.data);
    formData.append("name", restaurantData.name);
    formData.append("phone", restaurantData.phone);
    formData.append("email", restaurantData.email);
    formData.append("website", restaurantData.website);
    formData.append("cuisineType", restaurantData.cuisineType);
    formData.append("address", JSON.stringify(restaurantData.address));

    try {
      const response = await axiosInstance({
        url: "/restaurants",
        method: "POST",
        data: formData,
      });
      if (response) {
        toast.success("Restaurant created successfully!");
        setRestaurantStatus("");
        setRestaurantImage({ preview: "", data: "" });
        setRestaurantData({
          name: "",
          phone: "",
          email: "",
          website: "",
          cuisineType: "",
          address: {
            street: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
          },
        });
        setRestaurants((prev) => [...prev, response.data.restaurant]);
      }
    } catch (error) {
      toast.error("Failed to create restaurant");
    }
  };

  const handleRestaurantFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setRestaurantImage(img);
  };

  const handleRestaurantInput = (event) => {
    const { name, value } = event.target;
    setRestaurantData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressInput = (event) => {
    const { name, value } = event.target;
    setRestaurantData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Create Restaurant
        </h1>
        <section className="form-section">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Upload Restaurant
          </h2>
          {restaurantImage.preview && (
            <img
              src={restaurantImage.preview}
              alt="Restaurant preview"
              className="w-32 h-32 object-cover rounded-md mb-4"
            />
          )}
          <form onSubmit={handleRestaurantSubmit} className="space-y-4">
            <input
              type="file"
              name="file"
              onChange={handleRestaurantFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300"
            />
            <input
              type="text"
              name="name"
              placeholder="Restaurant Name"
              onChange={handleRestaurantInput}
              value={restaurantData.name}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              onChange={handleRestaurantInput}
              value={restaurantData.phone}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleRestaurantInput}
              value={restaurantData.email}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="website"
              placeholder="Website"
              onChange={handleRestaurantInput}
              value={restaurantData.website}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="cuisineType"
              placeholder="Cuisine Type"
              onChange={handleRestaurantInput}
              value={restaurantData.cuisineType}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <h3 className="text-lg font-semibold text-gray-700 mt-4">
              Address
            </h3>
            <input
              type="text"
              name="street"
              placeholder="Street"
              onChange={handleAddressInput}
              value={restaurantData.address.street}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={handleAddressInput}
              value={restaurantData.address.city}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              onChange={handleAddressInput}
              value={restaurantData.address.state}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              onChange={handleAddressInput}
              value={restaurantData.address.postalCode}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              onChange={handleAddressInput}
              value={restaurantData.address.country}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Submit Restaurant
            </button>
          </form>
          {restaurantStatus && (
            <p className="text-center mt-4 text-red-500 font-medium">
              {restaurantStatus}
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
