// import mongoose from 'mongoose';

// const foodSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String },
//   price: { type: Number, required: true },
//   image: { type: String },
//   restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
//   category: { type: String },
//   availableOffers: { type: String },
// }, { timestamps: true });

// const Food = mongoose.model('Food', foodSchema);
// export default Food;
import mongoose from 'mongoose';  

const foodSchema = new mongoose.Schema({  
    name: {  
        type: String,  
        required: [true, 'Name is required'], // Custom error message  
        trim: true // Removes extra spaces from the name  
    },  
    description: {  
        type: String,  
        required: [true, 'Description is required'], // Custom error message  
        trim: true  
    },  
    price: {  
        type: Number,  
        required: [true, 'Price is required'], // Custom error message  
        min: [0, 'Price must be a positive number'] // Ensure positive prices  
    },  
    image: {  
        type: String,  
        required: [true, 'Image URL is required'] // Custom error message  
    },  
    restaurant: {  
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'Restaurant',  
        required: true // Ensure a food item is associated with a restaurant  
    },  
    availability: {  
        type: Boolean,  
        default: true  
    }  
}, { timestamps: true });  

const FoodItem = mongoose.model('FoodItem', foodSchema);  
export default FoodItem; 