


import FoodItem from '../models/foodModel.js'; 
import { handleImageUpload } from '../utils/cloudinary.js'; 
import restaurantSchema from "../models/restaurantModel.js"
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
export const addFoodItem = async (req, res) => {
    try {
        const { name, price, description, restaurant, availability, image } = req.body;

        // Validate price
        const parsedPrice = Number(price);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            return res.status(400).json({ success: false, message: 'Price must be a positive number.' });
        }

        let imageUrl;

        // Handle image upload (Cloudinary or direct URL)
        if (req.file) {
            imageUrl = await handleImageUpload(req.file.path); // Upload to Cloudinary
        } else if (image) {
            // Validate Google or other direct URLs
            if (image.startsWith('http') || image.startsWith('https')) {
                imageUrl = image;
            } else {
                return res.status(400).json({ success: false, message: 'Invalid image URL.' });
            }
        } else {
            return res.status(400).json({ success: false, message: 'Image is required.' });
        }

        const foodItem = new FoodItem({
            name,
            price: parsedPrice,
            description,
            image: imageUrl,
            restaurant,
            availability: availability === 'true',
        });

        await foodItem.save();
        res.status(201).json({ success: true, foodItem });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update an existing food item
export const update = async (req, res) => {
    try {
        const updates = req.body;

        
        if (req.file) {
            updates.image = await handleImageUpload(req.file.path); 
        }

        // Validate Google or other direct URLs for image
        if (updates.image && !(updates.image.startsWith('http') || updates.image.startsWith('https'))) {
            return res.status(400).json({ success: false, message: 'Invalid image URL.' });
        }

        const updatedFoodItem = await FoodItem.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!updatedFoodItem) {
            return res.status(404).json({ success: false, message: 'Food item not found' });
        }

        res.json({ success: true, foodItem: updatedFoodItem });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a food item
export const remove = async (req, res) => {
    try {
        const deletedFoodItem = await FoodItem.findByIdAndDelete(req.params.id);
        if (!deletedFoodItem) {
            return res.status(404).json({ success: false, message: 'Food item not found' });
        }

        res.json({ success: true, message: 'Food item deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get food items by restaurant ID

// Get food items by restaurant ID
export const getFoodItemsByRestaurant = async (req, res) => {
    try {
        const { restaurantId } = req.params; 

        // Validate the restaurant ID format
        if (!restaurantId) {
            return res.status(400).json({ success: false, message: 'Restaurant ID is required.' });
        }

        // Fetch food items that belong to the given restaurant ID
        const foodItems = await FoodItem.find({ restaurant: restaurantId }).populate('restaurant');

        if (!foodItems || foodItems.length === 0) {
            return res.status(404).json({ success: false, message: 'No food items found for this restaurant.' });
        }

        console.log(`Fetched food items for restaurant ID ${restaurantId}:`, foodItems); // Debugging
        res.status(200).json({ success: true, foodItems });
    } catch (error) {
        console.error("Error fetching food items by restaurant ID:", error); // Debugging
        res.status(500).json({ success: false, message: error.message });
    }
};


// Search food items by name
export const searchFoodItems = async (req, res) => {
    try {
        const { query } = req.query;
        const foodItems = await FoodItem.find({ name: new RegExp(query, 'i') });
        res.status(200).json({ success: true, foodItems });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const foodItems = [
    /* Paste the JSON array here */
];

const populateFoodItems = async () => {
    try {
        await FoodItem.insertMany(foodItems);
        console.log('Food items successfully added!');
    } catch (error) {
        console.error('Error adding food items:', error.message);
    }
};

populateFoodItems();