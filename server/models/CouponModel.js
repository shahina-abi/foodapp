import mongoose from "mongoose";

// Define the coupon schema
const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  stripeCouponId: { type: String, unique: true, sparse: true },
  isActive: { type: Boolean, default: true }, // Optional field
});

const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;
