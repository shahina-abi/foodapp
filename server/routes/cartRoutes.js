import express from 'express';
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart
} from '../controllers/cartController.js';
import { authUser } from '../middleware/authUser.js';

const router = express.Router();

router.post('/add', authUser, addToCart);                // Add item to cart
router.get('/', authUser, getCart);                      // Get cart for the user
router.put('/update', authUser, updateCartItem);         // Update quantity of a cart item
router.delete('/remove', authUser, removeCartItem);      // Remove a specific item from the cart
router.delete('/clear', authUser, clearCart);            // Clear all items from the cart

export default router;
