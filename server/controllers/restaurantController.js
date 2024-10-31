import Restaurant from '../models/restaurantModel.js';

// Get all restaurants
export const getRestaurants =  async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate('foodItems');
    res.status(200).json({ success: true, restaurants });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single restaurant by ID
export const getById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate('foodItems');
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found' });

    res.json({ success: true, restaurant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Add a new restaurant with logo upload
export const addRestaurant = async (req, res) => {
  try {
    const { name, location, categories, foodItems } = req.body;
    const logo = req.file ? `/uploads/${req.file.filename}` : null;

    const restaurant = new Restaurant({
      name,
      location,
      categories,
      foodItems,
      image: logo
    });
    await restaurant.save();

    res.status(201).json({ success: true, restaurant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const update = async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRestaurant) return res.status(404).json({ success: false, message: 'Restaurant not found' });

    res.json({ success: true, restaurant: updatedRestaurant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a restaurant (Admin only)
export const remove = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found' });

    await restaurant.remove();
    res.json({ success: true, message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
