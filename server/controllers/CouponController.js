import Coupon from "../models/CouponModel.js";


export const createCoupon = async (req, res) => {
  try {
    const { code, discount, expiryDate, restaurantId } = req.body;

    // Validate the request body
    if (!code || !discount || !expiryDate || !restaurantId) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if the coupon already exists for this restaurant
    const existingCoupon = await Coupon.findOne({ code, restaurant: restaurantId });
    if (existingCoupon) {
      return res.status(400).json({ success: false, message: "Coupon code already exists for this restaurant" });
    }

    // Save the coupon to the database
    const coupon = new Coupon({
      code,
      discount,
      expiryDate,
      restaurant: restaurantId, // Associate coupon with the restaurant
    });

    await coupon.save();

    res.status(201).json({
      success: true,
      message: "Coupon created successfully",
      coupon,
    });
  } catch (error) {
    console.error("Error creating coupon:", error.message);
    res.status(500).json({ success: false, message: "Failed to create coupon" });
  }
};
/**
 * Validate a coupon
 */
export const validateCoupon = async (req, res) => {
  const { couponCode } = req.body;

  try {
    // Check if the coupon exists
    const coupon = await Coupon.findOne({ code: couponCode });
    if (!coupon) {
      console.log("Coupon validation failed: Not found");
      return res.status(400).json({
        success: false,
        message: "Invalid coupon code.",
      });
    }

    // Check if the coupon is active
    if (!coupon.isActive) {
      console.log("Coupon validation failed: Inactive");
      return res.status(400).json({
        success: false,
        message: "Coupon is inactive.",
      });
    }

    // Check if the coupon has expired
    if (new Date(coupon.expiryDate) < new Date()) {
      console.log("Coupon validation failed: Expired");
      return res.status(400).json({
        success: false,
        message: "Coupon has expired.",
      });
    }

    res.status(200).json({
      success: true,
      discount: coupon.discount,
      message: "Coupon is valid.",
    });
  } catch (error) {
    console.error("Error validating coupon:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while validating the coupon.",
    });
  }
};

/**
 * Apply a coupon to the cart
 */
export const applyCoupon = async (req, res) => {
  const { couponCode, cartTotal } = req.body;

  try {
    // Validate the coupon
    const coupon = await Coupon.findOne({ code: couponCode });
    if (!coupon) {
      return res.status(400).json({ success: false, message: "Invalid coupon code." });
    }

    if (!coupon.isActive) {
      return res.status(400).json({ success: false, message: "Coupon is inactive." });
    }

    if (new Date(coupon.expiryDate) < new Date()) {
      return res.status(400).json({ success: false, message: "Coupon has expired." });
    }

    // Calculate the discount
    const discount = (cartTotal * coupon.discount) / 100;
    const finalAmount = Math.max(0, cartTotal - discount);

    res.status(200).json({
      success: true,
      message: "Coupon applied successfully.",
      discount,
      finalAmount,
    });
  } catch (error) {
    console.error("Error applying coupon:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to apply coupon.",
    });
  }
};
export const getAllCoupons = async (req, res) => {
  try {
    const { restaurantId } = req.query; // Get restaurantId from query

    if (!restaurantId) {
      return res.status(400).json({ success: false, message: "Restaurant ID is required" });
    }

    // Fetch coupons for the given restaurantId
    const coupons = await Coupon.find({ restaurant: restaurantId });

    res.json({ success: true, coupons });
  } catch (error) {
    console.error("Error fetching coupons:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch coupons" });
  }
};