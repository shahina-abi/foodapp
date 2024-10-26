import express from 'express';
import { placeOrder, getUserOrders } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', placeOrder);
router.get('/', getUserOrders);

export default router;
