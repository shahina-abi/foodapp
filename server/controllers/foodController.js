

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

        // let imageUrl = image;

        // // Handle image upload if a file is provided
        // if (req.file) {
        //     imageUrl = await handleImageUpload(req.file.path);
        // } else if (image && !(image.startsWith("http") || image.startsWith("https"))) {
        //     return res.status(400).json({ success: false, message: "Invalid image URL." });
        // }
let imageUrl = image;

if (req.file) {
  imageUrl = await handleImageUpload(req.file.path);
} else if (image) {
  if (image.includes("_next/image")) {
    try {
      const urlObj = new URL(image);
      imageUrl = decodeURIComponent(urlObj.searchParams.get("url"));
    } catch (err) {
      console.error("Error parsing food image URL:", err);
    }
  }
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



// export const updateFoodItem = async (req, res) => {
//     try {
//         const updates = req.body;
//         const foodItem = await FoodItem.findById(req.params.id).populate("restaurant");

//         if (!foodItem || foodItem.restaurant.admin.toString() !== req.user.id) {
//             return res.status(403).json({ success: false, message: "Unauthorized or food item not found" });
//         }

//         if (req.file) {
//             updates.image = await handleImageUpload(req.file.path);
//         }

//         const updatedFoodItem = await FoodItem.findByIdAndUpdate(req.params.id, updates, { new: true });
//         res.json({ success: true, foodItem: updatedFoodItem });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };
// export const updateFoodItem = async (req, res) => {
//   try {
//     const updates = req.body;
//     const foodItem = await FoodItem.findById(req.params.id).populate({
//         path: "restaurant",
//         populate: { path: "admin", select: "_id email" },
//       });

//     if (!foodItem) {
//       return res.status(404).json({ success: false, message: "Food item not found" });
//     }

//     if (!foodItem.restaurant || !foodItem.restaurant.admin) {
//       return res.status(400).json({ success: false, message: "Restaurant or admin data missing" });
//     }

//     if (foodItem.restaurant.admin.toString() !== req.user.id) {
//       return res.status(403).json({ success: false, message: "Unauthorized" });
//     }

//     if (req.file) {
//       updates.image = req.file.path; // Cloudinary will auto-upload via multer-storage-cloudinary
//     }

//     const updatedFoodItem = await FoodItem.findByIdAndUpdate(req.params.id, updates, { new: true });
//     res.json({ success: true, foodItem: updatedFoodItem });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

export const updateFoodItem = async (req, res) => {
  try {
    const updates = req.body;
    const foodItem = await FoodItem.findById(req.params.id).populate({
      path: "restaurant",
      populate: { path: "admin", select: "_id email" },
    });

    if (!foodItem) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    if (!foodItem.restaurant || !foodItem.restaurant.admin) {
      return res.status(400).json({ success: false, message: "Restaurant or admin data missing" });
    }

    console.log("req.user.id =>", req.user.id);
    console.log("foodItem.restaurant.admin =>", foodItem.restaurant.admin);

    // ✅ Fixed comparison
    if (foodItem.restaurant.admin._id.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    if (req.file) {
      updates.image = req.file.path;
    }
    if (updates.price) {
      const USD_TO_INR = 83; // adjust as needed
      updates.price = Number(updates.price) * USD_TO_INR;
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