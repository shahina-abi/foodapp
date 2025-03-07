

import express from 'express';
import {
    getFoodItems,
    getById,
    addFoodItem,
    updateFoodItem,
    removeFoodItem,
    getFoodItemsByRestaurant ,
    searchFoodItems,
} from '../controllers/foodController.js'; // Import updated controller functions
import { upload } from '../middleware/multer.js'; // Multer middleware for image uploads
import { authAdmin } from '../middleware/authAdmin.js'; // Middleware for admin authentication

const router = express.Router();

// Route to get all food items
router.get('/', getFoodItems);

// Route to get a specific food item by ID
router.get('/:id', getById);

// Route to add a new food item (with image upload)
router.post('/create', authAdmin, upload.single('image'), addFoodItem);

// Route to update a food item by ID
router.put('/:id', authAdmin, upload.single('image'), updateFoodItem); // Handle image in updates

// Route to delete a food item by ID
router.delete('/:id', authAdmin, removeFoodItem);

// Route to get food items by restaurant ID
router.get('/restaurant/:restaurantId',getFoodItemsByRestaurant );

// Route to search for food items by name
router.get('/search', searchFoodItems);

export default router;
