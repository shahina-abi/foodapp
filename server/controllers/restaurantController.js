// import Restaurant from '../models/restaurantModel.js';

// // Get all restaurants
// export const getRestaurants =  async (req, res) => {
//   try {
//     const restaurants = await Restaurant.find().populate('foodItems');
//     res.status(200).json({ success: true, restaurants });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Get a single restaurant by ID
// export const getById = async (req, res) => {
//   try {
//     const restaurant = await Restaurant.findById(req.params.id).populate('foodItems');
//     if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found' });

//     res.json({ success: true, restaurant });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // Add a new restaurant with logo upload
// export const addRestaurant = async (req, res) => {
//   try {
//     let imageUrl;
//     const { name, location, categories, foodItems,image } = req.body;
//      console.log("image====",req.file);
//     if(req.file){
//       imageUrl = await handleImageUpload(req.file.path)
//     }
//     console.log(imageUrl,'=====imageurl');
//     const restaurant = new Restaurant({
//       name,
//       location,
//       categories,
//       foodItems,
//       image: imageUrl
//     });
//     await restaurant.save();

//     res.status(201).json({ success: true, restaurant });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// export const update = async (req, res) => {
//   try {
//     const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedRestaurant) return res.status(404).json({ success: false, message: 'Restaurant not found' });

//     res.json({ success: true, restaurant: updatedRestaurant });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Delete a restaurant (Admin only)
// export const remove = async (req, res) => {
//   try {
//     const restaurant = await Restaurant.findById(req.params.id);
//     if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found' });

//     await restaurant.remove();
//     res.json({ success: true, message: 'Restaurant deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
import mongoose from 'mongoose';
import Restaurant from '../models/restaurantModel.js'; // Your restaurant model
import { cloudinaryInstance } from '../config/cloudinaryConfig.js'
 // Update to your actual utility path

// Create a new restaurant
export const createRestaurant = async (req, res) => {
  try {
    console.log("Create restaurant route hit", req.file);

    // Destructure fields from request body
    const { name, location, rating, foodItems } = req.body;
    let imageUrl;

    // Validate required fields
    if (!name || !location) {
      return res.status(400).json({ success: false, message: 'Name and location are required.' });
    }

    // Check if restaurant already exists
    const existingRestaurant = await Restaurant.findOne({ name });
    if (existingRestaurant) {
      return res.status(400).json({ success: false, message: 'Restaurant already exists.' });
    }

    // Handle image upload if present
    if (req.file) {
      const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path);
      imageUrl = uploadResult.url;
    }

    // Create and save the new restaurant
    const newRestaurant = new Restaurant({
      name,
      location,
      rating: rating || 0,
      image: imageUrl || null,
    });

    await newRestaurant.save();
    res.status(201).json({ success: true, message: 'Restaurant created successfully', restaurant: newRestaurant });
  } catch (error) {
    console.error('Error creating restaurant:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get all restaurants
export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json({ success: true, message: 'Restaurants fetched successfully', restaurants });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get a single restaurant by ID
export const getRestaurantById = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({ success: false, message: 'Invalid restaurant ID format.' });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found.' });
    }

    res.status(200).json({ success: true, restaurant });
  } catch (error) {
    console.error('Error retrieving restaurant:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Update a restaurant
export const updateRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({ success: false, message: 'Invalid restaurant ID format.' });
    }

    // Prepare updates dynamically
    const updates = { ...req.body };

    // Handle image update if present
    if (req.file) {
      const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path);
      updates.image = uploadResult.url;
    }

    // Update restaurant
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(restaurantId, { $set: updates }, { new: true, runValidators: true });
    if (!updatedRestaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found.' });
    }

    res.status(200).json({ success: true, message: 'Restaurant updated successfully', restaurant: updatedRestaurant });
  } catch (error) {
    console.error('Error updating restaurant:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Delete a restaurant
export const deleteRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({ success: false, message: 'Invalid restaurant ID format.' });
    }

    const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);
    if (!deletedRestaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found.' });
    }

    res.status(200).json({ success: true, message: 'Restaurant deleted successfully' });
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export default {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
};
