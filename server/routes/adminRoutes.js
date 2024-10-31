
import express from 'express';
import {
  adminRegister,
  adminLogin,
  adminProfile,
  adminLogout,
  checkAdmin,
  getAllUsers,
  deleteUser,
  getAllOrders,
  updateOrderStatus,
  createRestaurant,
  deleteRestaurant,
} from '../controllers/adminController.js';
import { authAdmin } from '../middleware/authAdmin.js';

const router = express.Router();

router.post('/register', adminRegister);                  // Register a new admin
router.post('/login', adminLogin);                        // Admin login
router.get('/profile', authAdmin, adminProfile);          // Get admin profile
router.post('/logout', authAdmin, adminLogout);           // Admin logout
router.get('/check-admin', authAdmin, checkAdmin);        // Check if admin is authorized
router.get('/users', authAdmin, getAllUsers);             // View all users
router.delete('/users/:userId', authAdmin, deleteUser);   // Delete a user by ID
router.get('/orders', authAdmin, getAllOrders);           // View all orders
router.put('/orders/:orderId', authAdmin, updateOrderStatus); // Update order status
router.post('/restaurants', authAdmin, createRestaurant); // Create a new restaurant
router.delete('/restaurants/:restaurantId', authAdmin, deleteRestaurant); // Delete a restaurant by ID

export default router;
