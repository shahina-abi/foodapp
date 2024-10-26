import express from 'express';
import { getFoodItems, addFoodItems } from '../controllers/foodController.js';  // Importing functions
import upload from '../config/multerConfig.js';  // Import multer configuration

const router = express.Router();

router.get('/', getFoodItems);  // Route to get all food items
router.post('/', upload.single('image'), addFoodItems);  // Route to add a food item with image upload

export default router;
