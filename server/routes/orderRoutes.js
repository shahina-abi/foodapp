import express from 'express';
import { placeOrder, getOrder, getUserOrders, cancelOrder,  getOrdersByRestaurant } from '../controllers/orderController.js';
import { authUser } from '../middleware/authUser.js';

const router = express.Router();

router.post("/place", authUser, placeOrder);              // Place a new order (user only)
router.get("/:id", authUser, getOrder);              // Get specific order details by ID (user only)
router.get("/user/orders", authUser, getUserOrders);            // Get all orders for the logged-in user
router.put("/:id/cancel", authUser, cancelOrder);    // Cancel an order by ID (user only)
router.get("/restaurant/:restaurantId", getOrdersByRestaurant);
export default router;
