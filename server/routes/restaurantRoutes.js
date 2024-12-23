// import express from 'express';
// import { getRestaurants, addRestaurant,getById, update, remove} from '../controllers/restaurantController.js'; // Importing both functions
// import {upload} from '../middleware/multer.js';  // Import multer configuration
// import  {authAdmin} from '../middleware/authAdmin.js';

// const router = express.Router();


// router.get('/', getRestaurants);
// router.post('/create', authAdmin, upload.single('image'), addRestaurant);  
// router.get('/:id', getById);  
// router.put('/:id', authAdmin, update);                
// router.delete('/:id', authAdmin, remove);  

// export default router; 
   import express from 'express';
import {
  getAllRestaurants,
  createRestaurant,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} from '../controllers/restaurantController.js'; // Importing correct functions
import { upload } from '../middleware/multer.js'; // Import multer configuration
import { authAdmin } from '../middleware/authAdmin.js'; // Import admin authentication middleware

const router = express.Router();

// Define routes
router.get('/', getAllRestaurants); // Fetch all restaurants
router.post('/create', authAdmin, upload.single('image'), createRestaurant); // Create a new restaurant with image upload
router.get('/:id', getRestaurantById); // Fetch a single restaurant by ID
router.put('/:id', authAdmin, upload.single('image'), updateRestaurant); // Update a restaurant (includes image update)
router.delete('/:id', authAdmin, deleteRestaurant); // Delete a restaurant

export default router;
