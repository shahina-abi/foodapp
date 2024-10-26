import express from 'express';

// Import individual routes
import userRoutes from './userRoutes.js';
import foodRoutes from './foodRoutes.js';
import restaurantRoutes from './restaurantRoutes.js';
import reviewRoutes from './reviewRoutes.js';
import orderRoutes from './orderRoutes.js';
import cartRoutes from './cartRoutes.js';

const router = express.Router();

// Define the routes with their respective paths
router.use('/users', userRoutes);              // All user-related routes
router.use('/foods', foodRoutes);              // All food-related routes
router.use('/restaurants', restaurantRoutes);  // All restaurant-related routes
router.use('/reviews', reviewRoutes);          // All review-related routes
router.use('/orders', orderRoutes);            // All order-related routes
router.use('/cart', cartRoutes);               // All cart-related routes

export default router;
