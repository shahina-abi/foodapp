import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      foodItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
      quantity: { type: Number, required: true, min: 1 },
    }
  ],
  totalPrice: { type: Number, default: 0 } // Stores the total price of the cart
}, { timestamps: true });

// Method to calculate the total price
cartSchema.methods.calculateTotalPrice = async function () {
  let total = 0;
  for (const item of this.items) {
    const food = await mongoose.model('Food').findById(item.foodItem);
    total += food.price * item.quantity;
  }
  this.totalPrice = total;
  await this.save();
};

export default mongoose.model('Cart', cartSchema);
