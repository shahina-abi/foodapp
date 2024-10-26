import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, default: 0 },
  image: { type: String },
}, { timestamps: true });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export default Restaurant;
