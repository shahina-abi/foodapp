// // export default RestaurantDetailsPage;
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { axiosInstance } from "../../config/axiosIntance";
// import { toast } from "react-toastify";
// import Loading from "../../components/user/Loading";

// const RestaurantDetailsPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [restaurant, setRestaurant] = useState({});
//   const [loading, setLoading] = useState(true);

//   // ✅ These image paths work if files are in the public folder
//   const offers = [
//     {
//       _id: "offer1",
//       title: "20% Off on All Orders",
//       description: "Enjoy 20% off on all orders placed this weekend!",
//       image: "/offer1.jpg", // public/offer1.jpg
//     },
//     {
//       _id: "offer2",
//       title: "Free Dessert with Main Course",
//       description: "Order any main course and get a free dessert.",
//       image: "/offer2.jpg", // public/offer2.jpg
//     },
//     {
//       _id: "offer3",
//       title: "Happy Hour: 1+1 on Drinks",
//       description:
//         "Buy one drink and get one free during happy hours (5-7 PM).",
//       image: "/offer3.jpg", // public/offer3.jpg
//     },
//   ];

//   const fetchRestaurantDetails = async () => {
//     try {
//       if (!id) throw new Error("Restaurant ID is missing");

//       const response = await axiosInstance.get(`/restaurants/${id}`);
//       console.log("API Response:", response?.data);
//       setRestaurant(response?.data?.data || {});
//     } catch (error) {
//       console.error("Error fetching restaurant details:", error);
//       toast.error("Failed to retrieve restaurant details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRestaurantDetails();
//   }, [id]);

//   if (loading) return <Loading />;

//   if (!restaurant || Object.keys(restaurant).length === 0) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-gray-600 text-lg">Restaurant not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto my-10 px-4">
//       {/* Restaurant Details Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="col-span-1">
//           <h1 className="text-4xl font-bold text-gray-800 mb-4">
//             {restaurant.name || "Restaurant Name Unavailable"}
//           </h1>
//           <p className="text-gray-600 text-lg mb-2">
//             <strong>Cuisine:</strong>{" "}
//             {restaurant.cuisineType?.join(", ") || "Not specified"}
//           </p>
//           <p className="text-gray-600 text-lg mb-2">
//             <strong>Address:</strong>{" "}
//             {restaurant.address
//               ? `${restaurant.address.street}, ${restaurant.address.city}, ${restaurant.address.state}, ${restaurant.address.country}`
//               : "Address not available"}
//           </p>
//           <p className="text-gray-600 text-lg mb-2">
//             <strong>Phone:</strong> {restaurant.phone || "N/A"}
//           </p>
//           <p className="text-gray-600 text-lg mb-2">
//             <strong>Email:</strong> {restaurant.email || "N/A"}
//           </p>
//           <p className="text-gray-600 text-lg mb-2">
//             <strong>Rating:</strong> {restaurant.rating || "N/A"} / 5
//           </p>
//           <p className="text-gray-600 text-lg mb-2">
//             <strong>Opening Hours:</strong> {restaurant.openingHours?.open} -{" "}
//             {restaurant.openingHours?.close || "N/A"}
//           </p>
//           <p className="text-gray-600 text-lg mb-2">
//             <strong>Website:</strong>{" "}
//             <a
//               href={restaurant.website}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 underline"
//             >
//               {restaurant.website || "N/A"}
//             </a>
//           </p>
//           <button
//             onClick={() =>
//               navigate(`/restaurants/${restaurant._id}/foods`, {
//                 state: { restaurantId: restaurant._id },
//               })
//             }
//             className="bg-blue-600 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700"
//           >
//             View Menu
//           </button>
//         </div>

//         <div className="text-center col-span-2">
//           <img
//             src={restaurant.image || "https://via.placeholder.com/300"}
//             alt="Restaurant"
//             className="rounded-lg shadow-lg w-full h-auto"
//           />
//         </div>
//       </div>

//       {/* Offers Section */}
//       <div className="my-10">
//         <h2 className="text-3xl font-semibold mb-6 text-gray-800">
//           Special Offers
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {offers.map((offer) => (
//             <div
//               key={offer._id}
//               className="border border-gray-300 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
//             >
//               <img
//                 src={offer.image}
//                 alt={offer.title}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                   {offer.title}
//                 </h3>
//                 <p className="text-gray-600 mb-4">{offer.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RestaurantDetailsPage;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosIntance";
import { toast } from "react-toastify";
import Loading from "../../components/user/Loading";

// ── Small reusable info card
const InfoBadge = ({ icon, label, value, href }) => (
  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
    <span className="text-xl mt-0.5">{icon}</span>
    <div className="min-w-0">
      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">
        {label}
      </p>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-orange-500 font-medium hover:underline truncate block"
        >
          {value}
        </a>
      ) : (
        <p className="text-sm text-gray-800 font-medium leading-snug">
          {value || "N/A"}
        </p>
      )}
    </div>
  </div>
);

// ── Star rating
const Stars = ({ rating }) => {
  const r = parseFloat(rating) || 0;
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill={s <= Math.round(r) ? "#F97316" : "#E5E7EB"}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm text-gray-600 ml-1 font-medium">
        {r.toFixed(1)} / 5
      </span>
    </div>
  );
};

// ── Hardcoded offers (since they're not from API)
const OFFERS = [
  {
    _id: "offer1",
    title: "20% Off on All Orders",
    description: "Enjoy 20% off on all orders placed this weekend!",
    emoji: "🎉",
  },
  {
    _id: "offer2",
    title: "Free Dessert with Main Course",
    description: "Order any main course and get a free dessert.",
    emoji: "🍰",
  },
  {
    _id: "offer3",
    title: "Happy Hour: 1+1 on Drinks",
    description: "Buy one drink and get one free during happy hours (5–7 PM).",
    emoji: "🥤",
  },
];

const RestaurantDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchRestaurantDetails = async () => {
    try {
      if (!id) throw new Error("Restaurant ID is missing");
      const response = await axiosInstance.get(`/restaurants/${id}`);
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
      <div className="flex flex-col justify-center items-center h-screen gap-3">
        <div className="text-5xl">😕</div>
        <p className="text-gray-600 text-lg font-medium">
          Restaurant not found
        </p>
        <button
          onClick={() => navigate("/restaurants")}
          className="text-orange-500 text-sm hover:underline"
        >
          ← Back to restaurants
        </button>
      </div>
    );
  }

  const address = restaurant.address
    ? `${restaurant.address.street}, ${restaurant.address.city}, ${restaurant.address.state}, ${restaurant.address.country}`
    : "Address not available";

  const hours = restaurant.openingHours
    ? `${restaurant.openingHours.open} – ${restaurant.openingHours.close}`
    : "N/A";

  const cuisine = restaurant.cuisineType?.join(", ") || "Various cuisines";

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ── Hero image banner */}
      <div className="relative w-full h-64 md:h-80 bg-gray-200 overflow-hidden">
        <img
          src={
            restaurant.image ||
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80"
          }
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate("/restaurants")}
          className="absolute top-4 left-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all"
        >
          <svg
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>

        {/* Restaurant name on image */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-orange-400 text-sm font-semibold mb-1">
              {cuisine}
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              {restaurant.name || "Restaurant"}
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <Stars rating={restaurant.rating} />
              <span className="bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                Open Now
              </span>
              <span className="text-white/70 text-sm flex items-center gap-1">
                🕒 25–35 min delivery
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Left: Info */}
          <div className="lg:col-span-1 space-y-3">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Restaurant Info
            </h2>

            <InfoBadge icon="🍽️" label="Cuisine" value={cuisine} />
            <InfoBadge icon="📍" label="Address" value={address} />
            <InfoBadge icon="📞" label="Phone" value={restaurant.phone} />
            <InfoBadge icon="✉️" label="Email" value={restaurant.email} />
            <InfoBadge icon="🕒" label="Opening Hours" value={hours} />
            {restaurant.website && (
              <InfoBadge
                icon="🌐"
                label="Website"
                value={restaurant.website}
                href={restaurant.website}
              />
            )}

            {/* ── View Menu CTA */}
            <button
              onClick={() =>
                navigate(`/restaurants/${restaurant._id}/foods`, {
                  state: { restaurantId: restaurant._id },
                })
              }
              className="w-full mt-4 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold py-3.5 rounded-2xl text-base transition-all duration-200 shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              View Full Menu
            </button>
          </div>

          {/* ── Right: Special Offers */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Special Offers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {OFFERS.map((offer) => (
                <div
                  key={offer._id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow duration-200 flex flex-col"
                >
                  <div className="text-4xl mb-3">{offer.emoji}</div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2 leading-snug">
                    {offer.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed flex-1">
                    {offer.description}
                  </p>
                  <button
                    onClick={() =>
                      navigate(`/restaurants/${restaurant._id}/foods`, {
                        state: { restaurantId: restaurant._id },
                      })
                    }
                    className="mt-4 w-full bg-orange-50 hover:bg-orange-100 text-orange-600 text-xs font-semibold py-2 rounded-xl transition-colors"
                  >
                    Order Now →
                  </button>
                </div>
              ))}
            </div>

            {/* ── Why order here */}
            <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-4">
                Why order from here?
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { emoji: "⚡", label: "Fast Delivery" },
                  { emoji: "🌿", label: "Fresh Ingredients" },
                  { emoji: "💳", label: "Secure Payment" },
                  { emoji: "🔄", label: "Easy Returns" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center text-center gap-1"
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="text-xs text-gray-600 font-medium">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailsPage;
