import React from "react";
import { motion } from "framer-motion";

const FoodItemsCard = ({ foodItem, onAddToCart }) => {
  const rupeePrice = (foodItem.price * 83).toFixed(2); // 1 USD ≈ ₹83

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl"
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={foodItem.image || "https://via.placeholder.com/300"}
          alt={foodItem.name}
          className="h-56 w-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">
          {foodItem.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {foodItem.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-green-600">
            ₹{rupeePrice}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onAddToCart(foodItem._id)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodItemsCard;
