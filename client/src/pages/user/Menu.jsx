// // src/pages/user/Menu.jsx
// import React from "react";

// export function Menu() {
//   const foodItems = [
//     {
//       id: 1,
//       name: "Pizza",
//       price: "$12",
//       image: "https://via.placeholder.com/150",
//     },
//     {
//       id: 2,
//       name: "Burger",
//       price: "$8",
//       image: "https://via.placeholder.com/150",
//     },
//     {
//       id: 3,
//       name: "Pasta",
//       price: "$10",
//       image: "https://via.placeholder.com/150",
//     },
//   ];

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6">Menu</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {foodItems.map((item) => (
//           <div key={item.id} className="bg-white p-4 shadow-md rounded">
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-full h-32 object-cover"
//             />
//             <h2 className="text-xl font-bold mt-2">{item.name}</h2>
//             <p className="text-gray-600">{item.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// src/pages/user/Menu.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosIntance";
import Loading from "../../components/user/Loading";

export function Menu() {
  const { id } = useParams(); // Get the restaurant ID from the URL
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMenu = async () => {
    try {
      const response = await axiosInstance.get(`/api/restaurants/${id}`); // Fetch menu from backend
      setRestaurant(response?.data?.restaurant || {});
    } catch (error) {
      console.error("Error fetching menu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!restaurant || !restaurant.foodItems) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Menu not available</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Delicious foods you want
          </h1>
          <p className="text-lg text-gray-600">
            And the best restaurants you need
          </p>
        </div>

        {/* Restaurant Info */}
        <div className="bg-white p-6 shadow-lg rounded-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            {restaurant.name}
          </h2>
          <p className="text-gray-600">
            <strong>Location:</strong> {restaurant.location}
          </p>
          <p className="text-gray-600">
            <strong>Rating:</strong> {restaurant.rating}
          </p>
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurant.foodItems.map((item) => (
            <div key={item._id} className="bg-white p-4 shadow-md rounded-lg">
              <img
                src={item.image || "https://via.placeholder.com/150"}
                alt={item.name}
                className="w-full h-32 object-cover rounded"
              />
              <h3 className="text-xl font-bold mt-4 text-gray-800">
                {item.name}
              </h3>
              <p className="text-gray-600 mt-2">
                <strong>Price:</strong> {item.price || "N/A"}
              </p>
              <p className="text-gray-600">
                {item.description || "Tasty food"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
