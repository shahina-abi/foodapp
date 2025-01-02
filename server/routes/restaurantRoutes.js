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
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurantController.js";
import { upload } from "../middleware/multer.js";
import { authAdmin } from '../middleware/authAdmin.js';

const router = express.Router();

// Define routes
router.post('/create', upload.single("image"), authAdmin, createRestaurant); // Create restaurant with admin auth
router.get('/', getAllRestaurants); // Fetch all restaurants
router.get('/:id', getRestaurantById); // Fetch a single restaurant by ID
router.put('/:id', authAdmin, upload.single("image"), updateRestaurant); // Update restaurant with admin auth
router.delete('/:id', authAdmin, deleteRestaurant); // Delete restaurant with admin auth

export default router;
