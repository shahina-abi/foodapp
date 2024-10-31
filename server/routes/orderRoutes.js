import express from 'express';
import { placeOrder, getOrder, getUserOrders, cancelOrder } from '../controllers/orderController.js';
import { authUser } from '../middleware/authUser.js';

const router = express.Router();

router.post('/', authUser, placeOrder);              // Place a new order (user only)
router.get('/:id', authUser, getOrder);              // Get specific order details by ID (user only)
router.get('/', authUser, getUserOrders);            // Get all orders for the logged-in user
router.put('/cancel/:id', authUser, cancelOrder);    // Cancel an order by ID (user only)

export default router;
