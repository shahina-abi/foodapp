// src/pages/user/FoodItems.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopularItems } from "../../redux/features/FoodSlice";

function FoodItems() {
  const dispatch = useDispatch();

  const popularItems = useSelector((state) => state.food.popularItems);

  useEffect(() => {
    const popularDishes = [
      { id: 1, name: "Pizza", price: 12.99, image: "pizza.jpg" },
      { id: 2, name: "Burger", price: 8.99, image: "burger.jpg" },
      { id: 3, name: "Pasta", price: 10.49, image: "pasta.jpg" },
    ];
    dispatch(setPopularItems(popularDishes)); // Initialize popular items
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-8">
        Popular Food Items
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {popularItems.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p className="text-gray-500">${item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodItems;
