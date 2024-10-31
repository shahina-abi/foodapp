import Food from '../models/foodModel.js';

// Get all food items
export const getFoodItems = async (req, res) => {
 try {
    const foodItems = await Food.find().populate('restaurant');
    res.status(200).json({ success: true, foodItems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single food item by ID
export const getById = async (req, res) => {
  try {
    const foodItem = await Food.findById(req.params.id).populate('restaurant');
    if (!foodItem) return res.status(404).json({ success: false, message: 'Food item not found' });

    res.json({ success: true, foodItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Add a new food item with image upload
export const addFoodItem = async (req, res) => {
   try {
    const { name, price, description, restaurant, category } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const foodItem = new Food({
      name,
      price,
      description,
      image: imageUrl,
      restaurant,
      category
    });

    await foodItem.save();
    res.status(201).json({ success: true, foodItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const updatedFoodItem = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFoodItem) return res.status(404).json({ success: false, message: 'Food item not found' });

    res.json({ success: true, foodItem: updatedFoodItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a food item (Admin only)
export const remove = async (req, res) => {
  try {
    const foodItem = await Food.findById(req.params.id);
    if (!foodItem) return res.status(404).json({ success: false, message: 'Food item not found' });

    await foodItem.remove();
    res.json({ success: true, message: 'Food item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};