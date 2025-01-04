import mongoose from "mongoose";

// Define the coupon schema
const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId, // Referencing the Cart model
    ref: "Cart", // Reference to the Cart model
    required: false, // Optional: coupons can be used without a specific cart
  },
});

// Export the Coupon model using ES Modules syntax
const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;
