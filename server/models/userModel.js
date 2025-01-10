import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
   mobile: {
            type: String,
            required: true,
        },
  isAdmin: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

// Encrypt password before saving


const User = mongoose.model('User', userSchema);
export default User;
