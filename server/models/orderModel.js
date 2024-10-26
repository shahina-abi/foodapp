import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  foodItems: [{
    food: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
    quantity: { type: Number, required: true }
  }],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  paymentMethod: { type: String, required: true },
  isPaid: { type: Boolean, default: false },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
