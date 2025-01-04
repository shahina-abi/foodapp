import express from "express";
import { createCoupon, validateCoupon, applyCoupon } from "../controllers/CouponController.js";

const router = express.Router();

// Route to create a new coupon (admin only)
router.post("/create", createCoupon);

// Route to validate a coupon
router.post("/validate", validateCoupon);

// Route to apply a coupon at checkout
router.post("/checkout", applyCoupon);

export default router;
