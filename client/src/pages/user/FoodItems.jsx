// import React, { useEffect, useState } from "react";
// import { axiosInstance } from "../../config/axiosIntance";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Link, useParams } from "react-router-dom";
// //import ImageCarousel from "../components/user/CarouselComponent";
// import Loading from "../../components/user/Loading";

// const FoodItemsPage = () => {
//   const [foodItems, setFoodItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
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

//   // Fetch Food Items
//   const fetchFoodItems = async () => {
//     try {
//       const response = await axiosInstance.get(
//         `fooditems/restaurant/${restaurantId}`
//       );
//       console.log("Food items fetched successfully:", response.data);
//       setFoodItems(response.data);
//       setFilteredItems(response.data); // Initialize filtered items
//     } catch (error) {
//       console.error("Error fetching food items:", error);
//       setError("Failed to fetch food items.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add to Cart
//   const addToCart = async (foodItemId, quantity) => {
//     try {
//       const response = await axiosInstance.post("/cart/add-to-cart", {
//         foodItemId,
//         quantity,
//       });
//       console.log("Response after adding to cart:", response.data);
//       toast.success("Food item added to cart!");
//     } catch (error) {
//       const errorMessage =
//         error.response && error.response.data && error.response.data.message
//           ? error.response.data.message
//           : "An unexpected error occurred. Please try again.";
//       toast.error(errorMessage);
//     }
//   };

//   useEffect(() => {
//     fetchFoodItems();
//   }, [restaurantId]);

//   // Handle Search
//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//     filterItems(e.target.value, selectedCategory);
//   };

//   // Handle Category Selection
//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//     filterItems(searchQuery, category);
//   };

//   // Filter Items
//   const filterItems = (query, category) => {
//     const lowerCaseQuery = query.toLowerCase();
//     const filtered = foodItems.filter((item) => {
//       const matchesQuery = item.name.toLowerCase().includes(lowerCaseQuery);
//       const matchesCategory = category === "All" || item.category === category;
//       return matchesQuery && matchesCategory;
//     });
//     setFilteredItems(filtered);
//   };

//   if (loading) {
//     return <Loading />;
//   }

//   if (error) {
//     return <p className="text-center text-danger">{error}</p>;
//   }

//   if (foodItems.length === 0) {
//     return <p className="text-center text-warning">No menu found.</p>;
//   }

//   return (
//     <div className="menu container my-5">
//       <div className="menu-section">
//         <div className="heading-container">
//           <h1 className="heading-animate">Explore Our Menu</h1>
//         </div>
//       </div>

//       {/* Search and Category Filters */}
//       <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
//         {/* Search Bar */}
//         <input
//           type="text"
//           placeholder="Search for food items..."
//           value={searchQuery}
//           onChange={handleSearch}
//           className="form-control mb-3 mb-md-0"
//         />

//         {/* Category Buttons */}
//         <div className="d-flex flex-wrap">
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => handleCategoryChange(category)}
//               className={`btn btn-sm me-2 ${
//                 selectedCategory === category
//                   ? "btn-primary"
//                   : "btn-outline-secondary"
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//       </div>

//       <h1 className="menuhead text-center my-4">Our Delicious Food Items</h1>
//       <div className="row">
//         {filteredItems.map((menu) => (
//           <div
//             key={menu._id}
//             className="col-md-4 mb-4 d-flex align-items-stretch"
//           >
//             <div className="card4 custom-card">
//               <img
//                 src={menu?.image || "https://via.placeholder.com/300"}
//                 alt={menu?.name}
//                 className="card-img-top rounded-top"
//               />
//               <div className="menubody3 card-body">
//                 <h2 className="card4-title">{menu.name}</h2>
//                 <p className="card4-text">
//                   <strong>Description:</strong> {menu.description}
//                 </p>
//                 <p className="card4-text">
//                   <strong>Price:</strong> ${menu.price.toFixed(2)}
//                 </p>
//                 <button
//                   onClick={() => {
//                     const quantity = 1;
//                     addToCart(menu._id, quantity);
//                   }}
//                   className="btn btn-primary me-2"
//                 >
//                   Add To Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="text-center my-4">
//         <Link to="/Cart/getcart">
//           <button className="btn btn-secondary">Show Cart</button>
//         </Link>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default FoodItemsPage;
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosIntance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const FoodItemsPage = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { restaurantId } = useParams();

  const categories = [
    "All",
    "Starters",
    "Main Course",
    "Desserts",
    "Beverages",
  ];

  const fetchFoodItems = async () => {
    try {
      const response = await axiosInstance.get(
        `/foods/restaurant/${restaurantId}`
      );
      const items = Array.isArray(response.data)
        ? response.data
        : response.data.foodItems || [];
      setFoodItems(items);
      setFilteredItems(items);
    } catch (error) {
      setError("Failed to fetch food items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodItems();
  }, [restaurantId]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    filterItems(e.target.value, selectedCategory);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterItems(searchQuery, category);
  };

  const filterItems = (query, category) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = foodItems.filter((item) => {
      const matchesQuery = item.name.toLowerCase().includes(lowerCaseQuery);
      const matchesCategory = category === "All" || item.category === category;
      return matchesQuery && matchesCategory;
    });
    setFilteredItems(filtered);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg">{error}</p>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Explore Our Menu
        </h1>
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
          <input
            type="text"
            placeholder="Search for food items..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex space-x-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.length > 0 ? (
          filteredItems.map((menu) => (
            <div
              key={menu._id}
              className="border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                src={menu.image || "https://via.placeholder.com/300"}
                alt={menu.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{menu.name}</h3>
                <p className="text-gray-600 text-sm my-2">
                  {menu.description.length > 80
                    ? `${menu.description.substring(0, 80)}...`
                    : menu.description}
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  ${menu.price.toFixed(2)}
                </p>
                <button
                  onClick={() => toast.success("Added to cart!")}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 text-lg col-span-full">
            No food items match your search or category filter.
          </p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default FoodItemsPage;
