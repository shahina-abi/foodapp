

import mongoose from "mongoose";
import FoodItem from '../models/foodModel.js'; 
import { handleImageUpload } from '../utils/cloudinary.js'; 
import Restaurant from "../models/restaurantModel.js";
// Get all food items
export const getFoodItems = async (req, res) => {
    try {
        const foodItems = await FoodItem.find().populate('restaurant'); // Populate restaurant field
        console.log("Fetched Food Items:", foodItems); // 
        res.status(200).json({ success: true, foodItems });
    } catch (error) {
        console.error("Error fetching food items:", error); // Debugging
        res.status(500).json({ success: false, message: error.message });
    }
};


// Get a single food item by ID
export const getById = async (req, res) => {
    try {
        const foodItem = await FoodItem.findById(req.params.id).populate('restaurant');
        if (!foodItem) {
            return res.status(404).json({ success: false, message: 'Food item not found' });
        }
        res.json({ success: true, foodItem });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Add a new food item with Cloudinary or direct URL handling
// export const addFoodItem = async (req, res) => {
//     try {
//         const { name, price, description, restaurant, availability, image } = req.body;

//         // Validate price
//         const parsedPrice = Number(price);
//         if (isNaN(parsedPrice) || parsedPrice <= 0) {
//             return res.status(400).json({ success: false, message: 'Price must be a positive number.' });
//         }

//         let imageUrl;

//         // Handle image upload (Cloudinary or direct URL)
//         if (req.file) {
//             imageUrl = await handleImageUpload(req.file.path); // Upload to Cloudinary
//         } else if (image) {
//             // Validate Google or other direct URLs
//             if (image.startsWith('http') || image.startsWith('https')) {
//                 imageUrl = image;
//             } else {
//                 return res.status(400).json({ success: false, message: 'Invalid image URL.' });
//             }
//         } else {
//             return res.status(400).json({ success: false, message: 'Image is required.' });
//         }

//         const foodItem = new FoodItem({
//             name,
//             price: parsedPrice,
//             description,
//             image: imageUrl,
//             restaurant,
//             availability: availability === 'true',
//         });

//         await foodItem.save();
//         res.status(201).json({ success: true, foodItem });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };
// export const addFoodItem = async (req, res) => {
//     try {
//         const { name, price, description, availability, image } = req.body;
//         const adminRestaurant = await Restaurant.findOne({ admin: req.user.id });

//         if (!adminRestaurant) {
//             return res.status(403).json({ success: false, message: "Unauthorized: No restaurant found for this admin" });
//         }

//         if (!name || !price || !description) {
//             return res.status(400).json({ success: false, message: "Name, price, and description are required" });
//         }

//         let imageUrl = image;
//         if (req.file) {
//             imageUrl = await handleImageUpload(req.file.path);
//         }

//         const foodItem = new FoodItem({
//             name,
//             price,
//             description,
//             image: imageUrl || "",
//             restaurant: adminRestaurant._id,
//             availability: availability === 'true',
//         });

//         await foodItem.save();
//         res.status(201).json({ success: true, foodItem });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };
export const addFoodItem = async (req, res) => {
    try {
        console.log("req.user.id:", req.user.id); 
        const { name, price, description, availability, image } = req.body;

        // Ensure the admin has a restaurant
        const adminRestaurant = await Restaurant.findOne({ admin: req.user.id });
        if (!adminRestaurant) {
            return res.status(403).json({ success: false, message: "Unauthorized: No restaurant found for this admin" });
        }

        // Validate required fields
        if (!name || !price || !description) {
            return res.status(400).json({ success: false, message: "Name, price, and description are required" });
        }

        // Validate price
        const parsedPrice = Number(price);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            return res.status(400).json({ success: false, message: "Price must be a positive number." });
        }

        let imageUrl = image;

        // Handle image upload if a file is provided
        if (req.file) {
            imageUrl = await handleImageUpload(req.file.path);
        } else if (image && !(image.startsWith("http") || image.startsWith("https"))) {
            return res.status(400).json({ success: false, message: "Invalid image URL." });
        }

        // Create and save new food item
        const foodItem = new FoodItem({
            name,
            price: parsedPrice,
            description,
            image: imageUrl || "",
            restaurant: adminRestaurant._id,
            availability: availability === "true",
        });

        await foodItem.save();
        res.status(201).json({ success: true, foodItem });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



export const updateFoodItem = async (req, res) => {
    try {
        const updates = req.body;
        const foodItem = await FoodItem.findById(req.params.id).populate("restaurant");

        if (!foodItem || foodItem.restaurant.admin.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "Unauthorized or food item not found" });
        }

        if (req.file) {
            updates.image = await handleImageUpload(req.file.path);
        }

        const updatedFoodItem = await FoodItem.findByIdAndUpdate(req.params.id, updates, { new: true });
        res.json({ success: true, foodItem: updatedFoodItem });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const removeFoodItem = async (req, res) => {
    try {
        const foodItem = await FoodItem.findById(req.params.id).populate("restaurant");
        if (!foodItem || foodItem.restaurant.admin.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "Unauthorized or food item not found" });
        }

        await FoodItem.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Food item deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getFoodItemsByRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;

    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({ message: "Invalid restaurant ID format" });
    }

    const foodItems = await FoodItem.find({ restaurant: restaurantId });

    res.status(200).json({ success: true, foodItems });
  } catch (error) {
    console.error('Error retrieving food items:', error);
    res.status(500).json({ message: "Failed to retrieve food items", error: error.message });
  }
};

// Search food items by name
// export const searchFoodItems = async (req, res) => {
//     try {
//         const { query } = req.query;
//         const foodItems = await FoodItem.find({ name: new RegExp(query, 'i') });
//         res.status(200).json({ success: true, foodItems });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };
// const foodItems = [
//     /* Paste the JSON array here */
// ];

// const populateFoodItems = async () => {
//     try {
//         await FoodItem.insertMany(foodItems);
//         console.log('Food items successfully added!');
//     } catch (error) {
//         console.error('Error adding food items:', error.message);
//     }
// };

// populateFoodItems();
export const searchFoodItems = async (req, res) => {
    try {
        const adminRestaurant = await Restaurant.findOne({ admin: req.user.id });

        if (!adminRestaurant) {
            return res.status(403).json({ success: false, message: "Unauthorized: No restaurant found for this admin" });
        }

        const { query } = req.query;
        const foodItems = await FoodItem.find({
            restaurant: adminRestaurant._id,
            name: new RegExp(query, 'i')
        });

        res.status(200).json({ success: true, foodItems });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};