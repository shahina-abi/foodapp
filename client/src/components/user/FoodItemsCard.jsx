// src/components/FoodItemsCard.jsx
import React from "react";

const FoodItemsCard = ({ foodItem }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
      <img
        src={foodItem.image}
        alt={foodItem.name}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{foodItem.name}</h3>
        <p className="text-gray-600 mt-2">{foodItem.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-semibold text-green-500">
            ${foodItem.price}
          </span>
          <button className="bg-yellow-400 px-4 py-2 rounded-md text-white">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodItemsCard;
