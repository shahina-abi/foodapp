

import mongoose from 'mongoose';
import { cloudinaryInstance } from "../config/cloudinaryConfig.js"
import Restaurant from '../models/restaurantModel.js'; // Updated import for Restaurant model
import { handleImageUpload } from '../utils/cloudinary.js';
import FoodItem from '../models/foodModel.js'; // If needed, you can import FoodItem as well

 export const createRestaurant = async (req, res) => {
  try {
    console.log("Create restaurant route hit");
    const userId = req.user;

    // Ensure userId is valid
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID format.' });
    }

    const {
      name,
      address,
      phone,
      email,
      website,
      rating,
      cuisineType,
      openingHours,
      foodItems,
      isActive,
    } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({ message: 'Missing required fields: name, phone, and email are required.' });
    }

    let imageUrl = null;

    // Handle image upload (if file provided)
    if (req.file) {
      try {
        const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path);
        imageUrl = uploadResult.secure_url; // Use secure Cloudinary URL
      } catch (error) {
        console.error("Cloudinary upload failed:", error);
        return res.status(500).json({ success: false, message: "Image upload failed" });
      }
    } else if (req.body.image) {
      // Use the image URL directly from the request body
      imageUrl = req.body.image;
    }

    let addressData = {};
    if (address) {
      const { street, city, state, postalCode, country } = address;
      if (!city || !country) {
        return res.status(400).json({ message: 'Address must include city and country.' });
      }
      addressData = { street, city, state, postalCode, country };
    }

    const isRestaurantExist = await Restaurant.findOne({ name });
    if (isRestaurantExist) {
      return res.status(400).json({ success: false, message: "Restaurant already exists" });
    }

    const newRestaurant = new Restaurant({
      name,
      address: addressData,
      phone,
      email,
      website,
      rating,
      cuisineType,
      openingHours: openingHours ? { open: openingHours.open, close: openingHours.close } : null,
      foodItems,
      isActive,
      image: imageUrl, // Save the image URL
      admin: new mongoose.Types.ObjectId(userId),
    });

    await newRestaurant.save();
    return res.status(201).json({ success: true, message: "Restaurant created successfully", restaurant: newRestaurant });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "An error occurred while creating the restaurant." });
  }
};

// Fetch all restaurants
export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate('foodItems'); // Populate food items
    res.status(200).json({ success: true, message: "Restaurants fetched successfully", data: restaurants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred while fetching restaurants." });
  }
};

// Fetch restaurant by ID
export const getRestaurantById = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({ message: "Invalid restaurant ID format" });
    }

    const restaurant = await Restaurant.findById(restaurantId).populate('foodItems');
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json({ data: restaurant });
  } catch (error) {
    console.error('Error retrieving restaurant:', error);
    res.status(500).json({ message: "Failed to retrieve the restaurant", error: error.message });
  }
};

// Update a restaurant
export const updateRestaurant = async (req, res) => {
  const { name, address, phone, email, website, cuisineType, openingHours, isActive } = req.body;

  try {
    const updates = {};
    if (name) updates.name = name;
    if (address) updates.address = address;
    if (phone) updates.phone = phone;
    if (email) updates.email = email;
    if (website) updates.website = website;
    if (cuisineType) updates.cuisineType = cuisineType;
    if (openingHours) updates.openingHours = openingHours;
    if (isActive !== undefined) updates.isActive = isActive;

    if (req.file) {
      const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path);
      updates.image = uploadResult.url;
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json({ message: "Restaurant updated successfully", restaurant: updatedRestaurant });
  } catch (error) {
    console.error('Error updating restaurant:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a restaurant
export const deleteRestaurant = async (req, res) => {
  try {
    const response = await Restaurant.findByIdAndDelete(req.body.id);
    if (!response) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};
