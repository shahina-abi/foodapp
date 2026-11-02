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

router.post('/add', authUser, addToCart);                
router.get('/getcart', authUser, getCart);                      
router.put('/update', authUser, updateCartItem);         
router.delete('/remove', authUser, removeCartItem);      
router.delete('/clear', authUser, clearCart);           

export default router;
