import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'admin',
    },
}, { timestamps: true });

export const Admin = mongoose.model('Admin', adminSchema);
