import express from 'express';
import { getRestaurants, addRestaurant } from '../controllers/restaurantController.js'; // Importing both functions
import upload from '../config/multerConfig.js';  // Import multer configuration

const router = express.Router();

// Route to get all restaurants
router.get('/', getRestaurants); 

// Route to add a new restaurant with image upload support
router.post('/', upload.single('image'), addRestaurant);  

export default router; // Export the router
