import express from "express";
import { createCoupon, validateCoupon, applyCoupon } from "../controllers/CouponController.js";
//import { authAdmin } from "../middleware/authAdmin.js";

const router = express.Router();

// Admin-only route to create coupons
router.post("/create",  createCoupon);

// Validate a coupon (accessible to all users)
router.post("/validate", validateCoupon);

// Apply a coupon to the cart (accessible to all users)
router.post("/apply", applyCoupon);

export default router;
