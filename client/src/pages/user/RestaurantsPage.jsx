// import React, { useEffect, useState } from "react";
// import { axiosInstance } from "../../config/axiosIntance"; // Ensure the path is correct for your axios instance
// import { Link } from "react-router-dom";
// import Loading from "../../components/user/Loading";
// import Carousel from "../../components/user/Carousal";

// export const RestaurantsPage = () => {
//   const [restaurants, setRestaurants] = useState([]);
//   const [filteredRestaurants, setFilteredRestaurants] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Fetch restaurants from the API
//   const fetchRestaurants = async () => {
//     try {
//       const response = await axiosInstance.get("/restaurants");
//       console.log("API Response:", response);
//       const data = response?.data?.data || [];
//       console.log("Restaurants Data:", data);
//       setRestaurants(data);
//       setFilteredRestaurants(data);
//     } catch (error) {
//       console.error("Error fetching restaurants:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Run the fetchRestaurants function when the component mounts
//   useEffect(() => {
//     const token = localStorage.getItem("userToken");
//     if (token) setIsLoggedIn(true);
//     fetchRestaurants();
//   }, []);

//   // Handle search functionality
//   const handleSearch = (event) => {
//     const searchValue = event.target.value.toLowerCase();
//     setSearchTerm(searchValue);
//     const filtered = restaurants.filter((restaurant) =>
//       restaurant.name.toLowerCase().includes(searchValue)
//     );
//     setFilteredRestaurants(filtered);
//   };

//   // Loading state
//   if (loading) return <Loading />;

//   // If no restaurants found
//   if (restaurants.length === 0)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-gray-600 text-lg">No restaurants found</p>
//       </div>
//     );

//   // Extract images for the carousel
//   const restaurantImages = restaurants.map((restaurant) => restaurant.image);

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
//           {isLoggedIn
//             ? "Welcome Back! Explore Our Restaurants"
//             : "Explore Our Restaurants"}
//         </h1>

//         {/* Search Field */}
//         <div className="flex justify-center mb-6">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={handleSearch}
//             placeholder="Enter restaurant name"
//             className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//           />
//         </div>

//         {/* Carousel */}
//         <Carousel images={restaurantImages} />

//         {/* Restaurant Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
//           {filteredRestaurants.map((restaurant) => (
//             <div
//               key={restaurant._id}
//               className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300"
//             >
//               {restaurant.image ? (
//                 <div className="overflow-hidden">
//                   <div className="overflow-hidden">
//                     <img
//                       src={restaurant.image}
//                       alt={restaurant.name}
//                       className="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-110"
//                     />
//                   </div>
//                 </div>
//               ) : (
//                 <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
//                   No Image Available
//                 </div>
//               )}
//               <div className="p-4">
//                 <h2 className="text-2xl font-semibold text-gray-800">
//                   {restaurant.name}
//                 </h2>
//                 <p className="text-gray-600 mt-2">
//                   <strong>Location:</strong>{" "}
//                   {restaurant.address?.city
//                     ? `${restaurant.address.city}, ${
//                         restaurant.address.state || ""
//                       }, ${restaurant.address.country || ""}`
//                     : "Not specified"}
//                 </p>
//                 <p className="text-gray-600 mt-1">
//                   <strong>Rating:</strong> {restaurant.rating}
//                 </p>
//                 <div className="mt-4 text-left">
//                   <Link
//                     to={`/restaurants/${restaurant._id}`}
//                     className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
//                   >
//                     See Menu
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
import React, { useEffect, useState, useRef } from "react";
import { axiosInstance } from "../../config/axiosIntance";
import { Link } from "react-router-dom";
import Loading from "../../components/user/Loading";

// ── Cuisine filter categories
const CATEGORIES = [
  "All",
  "Fast Food",
  "Middle Eastern",
  "Chinese",
  "Indian",
  "Italian",
  "Desserts",
  "Drinks",
];

// ── Star rating display
const Stars = ({ rating }) => {
  const r = parseFloat(rating) || 0;
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          width="13"
          height="13"
          viewBox="0 0 20 20"
          fill={s <= Math.round(r) ? "#F97316" : "#E5E7EB"}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-gray-500 ml-1">{r.toFixed(1)}</span>
    </div>
  );
};

// ── Single restaurant card
const RestaurantCard = ({ restaurant }) => {
  const cuisine = restaurant.cuisineType?.join(", ") || "Various cuisines";
  const city = restaurant.address?.city || "";
  const isOpen = true; // You can wire this to openingHours later

  return (
    <Link
      to={`/restaurants/${restaurant._id}`}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48 bg-gray-100">
        {restaurant.image ? (
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">
            🍽️
          </div>
        )}
        {/* Open/Closed badge */}
        <span
          className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${isOpen ? "bg-green-500 text-white" : "bg-gray-500 text-white"}`}
        >
          {isOpen ? "Open Now" : "Closed"}
        </span>
        {/* Rating badge */}
        {restaurant.rating && (
          <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
            ⭐ {parseFloat(restaurant.rating).toFixed(1)}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h2 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-orange-500 transition-colors">
            {restaurant.name}
          </h2>
        </div>

        {/* Cuisine */}
        <p className="text-sm text-orange-500 font-medium mb-2 truncate">
          {cuisine}
        </p>

        {/* Stars */}
        <Stars rating={restaurant.rating} />

        {/* Location + delivery time */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <svg
              width="12"
              height="12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="truncate max-w-[100px]">
              {city || "Location N/A"}
            </span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <svg
              width="12"
              height="12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>25–35 min</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-4">
          <span className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors duration-200">
            View Menu
          </span>
        </div>
      </div>
    </Link>
  );
};

// ── Main page
export const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const debounceRef = useRef(null);

  const fetchRestaurants = async () => {
    try {
      const response = await axiosInstance.get("/restaurants");
      const data = response?.data?.data || [];
      setRestaurants(data);
      setFilteredRestaurants(data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // ── Debounced search + category filter
  const applyFilters = (term, category) => {
    let result = restaurants;

    if (term.trim()) {
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(term.toLowerCase()) ||
          r.cuisineType?.some((c) =>
            c.toLowerCase().includes(term.toLowerCase()),
          ),
      );
    }

    if (category !== "All") {
      result = result.filter((r) =>
        r.cuisineType?.some((c) =>
          c.toLowerCase().includes(category.toLowerCase()),
        ),
      );
    }

    setFilteredRestaurants(result);
  };

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(
      () => applyFilters(val, activeCategory),
      300,
    );
  };

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    applyFilters(searchTerm, cat);
  };

  if (loading) return <Loading />;

  if (restaurants.length === 0)
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <div className="text-5xl">🍽️</div>
        <p className="text-gray-600 text-lg font-medium">
          No restaurants found
        </p>
        <p className="text-gray-400 text-sm">
          Check back soon — new restaurants are joining every day!
        </p>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ── Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Title + search */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <h1 className="text-2xl font-extrabold text-gray-900 shrink-0">
              🍴 Restaurants
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({filteredRestaurants.length} found)
              </span>
            </h1>
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
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
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                  />
                </svg>
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search by name or cuisine..."
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-gray-50"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    applyFilters("", activeCategory);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category filter pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Restaurant Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-600 font-medium text-lg">
              No restaurants match your search
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Try a different name or cuisine
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("All");
                setFilteredRestaurants(restaurants);
              }}
              className="mt-4 text-orange-500 font-medium text-sm hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
