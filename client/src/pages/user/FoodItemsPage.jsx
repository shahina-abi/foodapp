// // export default FoodItemsPage;
// import React, { useEffect, useState } from "react";
// import { axiosInstance } from "../../config/axiosIntance";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useParams } from "react-router-dom";
// import { useFetch } from "../../hooks/UseFetch";
// import FoodItemsCard from "../../components/user/FoodItemsCard";
// const FoodItemsPage = () => {
//   const [foodItems, setFoodItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const { restaurantId } = useParams();

//   const categories = [
//     "All",
//     "Starters",
//     "Main Course",
//     "Desserts",
//     "Beverages",
//   ];

//   const fetchFoodItems = async () => {
//     try {
//       const response = await axiosInstance.get(
//         `/foods/restaurant/${restaurantId}`
//       );
//       const items = Array.isArray(response.data)
//         ? response.data
//         : response.data.foodItems || [];
//       setFoodItems(items);
//       setFilteredItems(items);
//     } catch (error) {
//       toast.error("Failed to fetch food items.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFoodItems();
//   }, [restaurantId]);

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);
//     filterItems(query, selectedCategory);
//   };

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//     filterItems(searchQuery, category);
//   };

//   const filterItems = (query, category) => {
//     const filtered = foodItems.filter((item) => {
//       const matchesQuery = item.name.toLowerCase().includes(query);
//       const matchesCategory = category === "All" || item.category === category;
//       return matchesQuery && matchesCategory;
//     });
//     setFilteredItems(filtered);
//   };

//   const handleAddToCart = async (foodItemId, quantity = 1) => {
//     try {
//       const response = await axiosInstance.post("/cart/add", {
//         foodItemId,
//         quantity,
//       });
//       if (response.data.success) {
//         toast.success("Item added to cart!");
//       } else {
//         toast.error(response.data.message || "Failed to add item.");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Error adding to cart.");
//     }
//   };

//   return (
//     <div className="container mx-auto py-10 px-4">
//       {loading ? (
//         <div className="flex justify-center items-center h-screen">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
//         </div>
//       ) : (
//         <>
//           <div className="mb-8">
//             <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
//               Explore Our Menu
//             </h1>
//             <div className="flex flex-col md:flex-row items-center gap-4">
//               <input
//                 type="text"
//                 placeholder="Search for food items..."
//                 value={searchQuery}
//                 onChange={handleSearch}
//                 className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none"
//               />
//               <div className="flex space-x-2  flex-wrap  gap-2">
//                 {categories.map((category) => (
//                   <button
//                     key={category}
//                     onClick={() => handleCategoryChange(category)}
//                     className={`px-4 py-2 rounded-lg  ${
//                       selectedCategory === category
//                         ? "bg-blue-600 text-white"
//                         : "bg-gray-200"
//                     }`}
//                   >
//                     {category}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredItems.map((item) => (
//               <FoodItemsCard
//                 key={item._id}
//                 foodItem={item}
//                 onAddToCart={handleAddToCart}
//               />
//             ))}
//           </div>
//         </>
//       )}
//       <ToastContainer />
//     </div>
//   );
// };

// export default FoodItemsPage;
import CartPopup from "../../components/user/CartPopup";
import React, { useEffect, useState, useRef } from "react";
import { axiosInstance } from "../../config/axiosIntance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";

const CATEGORIES = ["All", "Starters", "Main Course", "Desserts", "Beverages"];

// ── Veg / Non-veg indicator
const VegBadge = ({ isVeg }) => (
  <div
    className={`w-4 h-4 border-2 flex items-center justify-center rounded-sm flex-shrink-0 ${isVeg ? "border-green-600" : "border-red-600"}`}
  >
    <div
      className={`w-2 h-2 rounded-full ${isVeg ? "bg-green-600" : "bg-red-600"}`}
    />
  </div>
);

// ── Individual food card
const FoodCard = ({ foodItem, onAddToCart }) => {
  const [adding, setAdding] = useState(false);
  const rupeePrice = foodItem.price
    ? `₹${(foodItem.price * 83).toFixed(0)}`
    : "Price N/A";

  const handleAdd = async () => {
    setAdding(true);
    await onAddToCart(foodItem._id);
    setTimeout(() => setAdding(false), 800);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col group">
      {/* Image */}
      <div className="relative overflow-hidden h-48 bg-gray-100">
        <img
          src={
            foodItem.image ||
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=70"
          }
          alt={foodItem.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Category tag */}
        {foodItem.category && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full">
            {foodItem.category}
          </span>
        )}
        {/* Price tag */}
        <span className="absolute top-3 right-3 bg-orange-500 text-white text-sm font-bold px-2.5 py-1 rounded-full">
          {rupeePrice}
        </span>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start gap-2 mb-1">
          <VegBadge isVeg={foodItem.isVeg ?? true} />
          <h3 className="text-base font-bold text-gray-900 leading-tight">
            {foodItem.name}
          </h3>
        </div>
        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-4 flex-1">
          {foodItem.description || "A delicious item freshly prepared for you."}
        </p>

        <button
          onClick={handleAdd}
          disabled={adding}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 ${
            adding
              ? "bg-green-500 text-white"
              : "bg-orange-500 hover:bg-orange-600 text-white"
          }`}
        >
          {adding ? (
            <>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Added!
            </>
          ) : (
            <>
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// ── Skeleton loader
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-2/3" />
      <div className="h-10 bg-gray-200 rounded-xl mt-4" />
    </div>
  </div>
);

// ── Main page
const FoodItemsPage = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const debounceRef = useRef(null);
  const [popupItem, setPopupItem] = useState(null);

  const fetchFoodItems = async () => {
    try {
      const response = await axiosInstance.get(
        `/foods/restaurant/${restaurantId}`,
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

  const applyFilters = (query, category) => {
    let result = foodItems;
    if (query.trim()) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      );
    }
    if (category !== "All") {
      result = result.filter((item) => item.category === category);
    }
    setFilteredItems(result);
  };

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(
      () => applyFilters(val, selectedCategory),
      300,
    );
  };

  const handleCategory = (cat) => {
    setSelectedCategory(cat);
    applyFilters(searchQuery, cat);
  };

  const handleAddToCart = async (foodItemId, quantity = 1) => {
    try {
      const response = await axiosInstance.post("/cart/add", {
        foodItemId,
        quantity,
      });
      if (response.data.success) {
        // ✅ Show popup with food item details
        const item = foodItems.find((f) => f._id === foodItemId);
        if (item)
          setPopupItem({
            name: item.name,
            image: item.image,
            price: item.price,
          });
      } else {
        toast.error(response.data.message || "Failed to add item.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding to cart.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ── Sticky filter header ── */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          {/* Top row */}
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors flex-shrink-0"
            >
              <svg
                width="18"
                height="18"
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
            </button>
            <h1 className="text-xl font-extrabold text-gray-900 flex-1">
              Menu
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({filteredItems.length} items)
              </span>
            </h1>
            {/* Search */}
            <div className="relative flex-1 max-w-xs">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  width="15"
                  height="15"
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
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search dishes..."
                className="w-full pl-8 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-orange-500 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Food grid ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-600 font-medium text-lg">No dishes found</p>
            <p className="text-gray-400 text-sm mt-1">
              Try a different name or category
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                handleCategory("All");
              }}
              className="mt-4 text-orange-500 font-medium text-sm hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <FoodCard
                key={item._id}
                foodItem={item}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>

      <CartPopup item={popupItem} onClose={() => setPopupItem(null)} />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
      />
    </div>
  );
};

export default FoodItemsPage;
