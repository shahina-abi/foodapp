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
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Cart", 
    required: false, 
  },
});


const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;
