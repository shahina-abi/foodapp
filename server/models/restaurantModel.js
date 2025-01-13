
import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'], // 
        trim: true, //
        unique: true, // 
    },
    address: {
        street: { type: String, trim: true },
        city: { type: String, trim: true, required: [true, 'City is required'] },
        state: { type: String, trim: true },
        postalCode: { type: String, trim: true },
        country: { type: String, trim: true },
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
    },
    website: {
        type: String,
        trim: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    cuisineType: [
        { type: String, trim: true }, // 
    ],
    openingHours: {
        open: { type: String, trim: true }, 
        close: { type: String, trim: true }, 
    },
    image: {
        type: String, 
        trim: true,
    },
    foodItems: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem' },
    ],
    isActive: {
        type: Boolean,
        default: true, 
    },
   //admin: {
       // type: mongoose.Schema.Types.ObjectId,
        //ref: 'Admin', // Reference to the Admin model
        //required: true, // Ensure a restaurant is associated with an admin
    },
 { timestamps: true });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export default Restaurant;
