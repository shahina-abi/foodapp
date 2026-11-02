
import mongoose from 'mongoose';  

const foodSchema = new mongoose.Schema({  
    name: {  
        type: String,  
        required: [true, 'Name is required'], 
        trim: true 
    },  
    description: {  
        type: String,  
        required: [true, 'Description is required'], 
        trim: true  
    },  
    price: {  
        type: Number,  
        required: [true, 'Price is required'], 
        min: [0, 'Price must be a positive number'] 
    },  
    image: {  
        type: String,  
        required: [true, 'Image URL is required'] 
    },  
    restaurant: {  
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'Restaurant',  
        required: true 
    },  
    availability: {  
        type: Boolean,  
        default: true  
    }  
}, { timestamps: true });  

const FoodItem = mongoose.model('FoodItem', foodSchema);  
export default FoodItem; 