import express from 'express';
import { getRestaurants, addRestaurant,getById, update, remove} from '../controllers/restaurantController.js'; // Importing both functions
import {upload} from '../middleware/multer.js';  // Import multer configuration
import  {authAdmin} from '../middleware/authAdmin.js';

const router = express.Router();


router.get('/', getRestaurants);
router.post('/', authAdmin, upload.single('image'), addRestaurant);  
router.get('/:id', getById);  
router.put('/:id', authAdmin, update);                
router.delete('/:id', authAdmin, remove);  

export default router; 
   