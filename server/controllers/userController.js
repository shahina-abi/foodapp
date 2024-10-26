import User from '../models/userModel.js';
import { generateToken } from '../utils/token.js';

// Register user
export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Check if user already exists
        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user (password will be hashed by the `pre` save middleware)
        const newUser = new User({ name, email, password });
        await newUser.save();

        // Generate token
        const token = generateToken(newUser._id);

        // Set token in cookie
        res.cookie("token", token);

        res.json({ success: true, message: "User created successfully" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error' });
    }
};

// Login user
export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user exists
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        // Check if password matches
        const passwordMatch = await userExist.matchPassword(password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "User not authorized" });
        }

        // Generate token
        const token = generateToken(userExist._id);

        // Set token in cookie
        res.cookie("token", token);
        res.json({ success: true, message: "User login successful" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error' });
    }
};

// Fetch user profile
export const userProfile = async (req, res, next) => {
    try {
        const { user } = req;

        const userData = await User.findById(user.id).select('-password');

        res.json({ success: true, message: "User profile fetched", userData });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error' });
    }
};

// Logout user
export const userLogout = async (req, res, next) => {
    try {
        res.clearCookie('token');
        res.json({ success: true, message: "User logged out" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error' });
    }
};

// Check if user is authorized
export const checkUser = async (req, res, next) => {
    try {
        res.json({ success: true, message: "Authorized user" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error' });
    }
};
