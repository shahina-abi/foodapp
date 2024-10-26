import Food from '../models/foodModel.js';

// Get all food items
export const getFoodItems = async (req, res) => {
  try {
    const foods = await Food.find();  // Fetch all food items from the database
    res.status(200).json(foods);      // Send the food items as the response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new food item with image upload
export const addFoodItems = async (req, res) => {
  try {
    const { name, description, price, restaurant, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const food = await Food.create({
      name,
      description,
      price,
      image,
      restaurant,
      category
    });

    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export both functions only once

