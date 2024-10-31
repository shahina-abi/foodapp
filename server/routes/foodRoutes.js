import express from 'express';
import { getFoodItems, addFoodItem, getById,update,remove} from '../controllers/foodController.js';  // Importing functions
import {upload}from '../middleware/multer.js';  // Import multer configuration
import { authAdmin } from '../middleware/authAdmin.js';

const router = express.Router();

router.get('/', getFoodItems);  // Route to get all food items
router.post("/create", authAdmin, upload.single('image'), addFoodItem); // Route to add a food item with image upload
router.get('/:id', getById); 
router.put('/:id', authAdmin, update);                 
router.delete('/:id', authAdmin, remove);              
export default router;
