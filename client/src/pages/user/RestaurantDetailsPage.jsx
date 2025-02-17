import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosIntance";
import { toast } from "react-toastify";
import Loading from "../../components/user/Loading";

const RestaurantDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState({});
  const [loading, setLoading] = useState(true);

  const offers = [
    {
      _id: "offer1",
      title: "20% Off on All Orders",
      description: "Enjoy 20% off on all orders placed this weekend!",
      discount: 20,
      validTill: "2025-01-31",
      image:
        "https://snoonu.com/_next/image?url=https%3A%2F%2Fimages.snoonu.com%2Fbrand%2F2024-09%2Fb9d9dc35-a1ff-4c4f-844a-7246f46f5554_output.png%3Fformat%3Dwebp&w=3840&q=75",
    },
    {
      _id: "offer2",
      title: "Free Dessert with Main Course",
      description: "Order any main course and get a free dessert.",
      discount: 100,
      validTill: "2025-02-15",
      image:
        "https://snoonu.com/_next/image?url=https%3A%2F%2Fimages.snoonu.com%2Fbrand%2F2024-01%2Fdb05b340-bc1c-45fe-b3aa-01b0c98a3057_357594733_796243608650405_862009487863062210_n.jpg%3Fformat%3Dwebp&w=3840&q=75",
    },
    {
      _id: "offer3",
      title: "Happy Hour: 1+1 on Drinks",
      description:
        "Buy one drink and get one free during happy hours (5-7 PM).",
      discount: 50,
      validTill: "2025-02-28",
      image:
        "https://snoonu.com/_next/image?url=https%3A%2F%2Fimages.snoonu.com%2Fbrand%2F2024-12%2F287f0265-4ccc-49b4-a397-c0ba9a25e780_output.png%3Fformat%3Dwebp&w=3840&q=75",
    },
  ];

  const fetchRestaurantDetails = async () => {
    try {
      if (!id) throw new Error("Restaurant ID is missing");

      const response = await axiosInstance.get(`/restaurants/${id}`);
      console.log("API Response:", response?.data);
      setRestaurant(response?.data?.data || {});
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
      toast.error("Failed to retrieve restaurant details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurantDetails();
  }, [id]);

  if (loading) return <Loading />;

  if (!restaurant || Object.keys(restaurant).length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Restaurant not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 px-4">
      {/* Restaurant Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-1">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {restaurant.name || "Restaurant Name Unavailable"}
          </h1>
          <p className="text-gray-600 text-lg mb-2">
            <strong>Cuisine:</strong>{" "}
            {restaurant.cuisineType?.join(", ") || "Not specified"}
          </p>
          <p className="text-gray-600 text-lg mb-2">
            <strong>Address:</strong>{" "}
            {restaurant.address
              ? `${restaurant.address.street}, ${restaurant.address.city}, ${restaurant.address.state}, ${restaurant.address.country}`
              : "Address not available"}
          </p>
          <p className="text-gray-600 text-lg mb-2">
            <strong>Phone:</strong> {restaurant.phone || "N/A"}
          </p>
          <p className="text-gray-600 text-lg mb-2">
            <strong>Email:</strong> {restaurant.email || "N/A"}
          </p>
          <p className="text-gray-600 text-lg mb-2">
            <strong>Rating:</strong> {restaurant.rating || "N/A"} / 5
          </p>
          <p className="text-gray-600 text-lg mb-2">
            <strong>Opening Hours:</strong> {restaurant.openingHours?.open} -{" "}
            {restaurant.openingHours?.close || "N/A"}
          </p>
          <p className="text-gray-600 text-lg mb-2">
            <strong>Website:</strong>{" "}
            <a
              href={restaurant.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {restaurant.website || "N/A"}
            </a>
          </p>
          <button
            onClick={() =>
              navigate(`/restaurants/${restaurant._id}/foods`, {
                state: { restaurantId: restaurant._id },
              })
            }
            className="bg-blue-600 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700"
          >
            View Menu
          </button>
        </div>
        <div className="text-center col-span-2">
          <img
            src={restaurant.image || "https://via.placeholder.com/300"}
            alt="Restaurant"
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>
      </div>

      {/* Offers Section */}
      <div className="my-10">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          Special Offers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer._id}
              className="border border-gray-300 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
            >
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 ">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {offer.title}
                </h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailsPage;
