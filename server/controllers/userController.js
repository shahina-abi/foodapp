// import User from '../models/userModel.js';
// import { generateToken } from '../utils/token.js';

// // Register user
// export const registerUser = async (req, res, next) => {
//     try {
//         const { name, email, password } = req.body;
        
//         if (!name || !email || !password) {
//             return res.status(400).json({ success: false, message: "All fields are required" });
//         }

//         // Check if user already exists
//         const isUserExist = await User.findOne({ email });

//         if (isUserExist) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         // Create new user (password will be hashed by the `pre` save middleware)
//         const newUser = new User({ name, email, password });
//         await newUser.save();

//         // Generate token
//         const token = generateToken(newUser._id);

//         // Set token in cookie
//         res.cookie("token", token);

//         res.json({ success: true, message: "User created successfully" });
//     } catch (error) {
//         console.log(error);
//         res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error' });
//     }
// };

// // Login user
// export const userLogin = async (req, res, next) => {
//     try {
//         const { email, password } = req.body;
        
//         if (!email || !password) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         // Check if user exists
//         const userExist = await User.findOne({ email });
//         if (!userExist) {
//             return res.status(404).json({ success: false, message: "User does not exist" });
//         }

//         // Check if password matches
//         const passwordMatch = await userExist.matchPassword(password);
//         if (!passwordMatch) {
//             return res.status(401).json({ message: "User not authorized" });
//         }

//         // Generate token
//         const token = generateToken(userExist._id);

//         // Set token in cookie
//         res.cookie("token", token);
//         res.json({ success: true, message: "User login successful" });
//     } catch (error) {
//         console.log(error);
//         res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error' });
//     }
// };

// // Fetch user profile
// export const userProfile = async (req, res, next) => {
//     try {
//         const { user } = req;

//         const userData = await User.findById(user.id).select('-password');

//         res.json({ success: true, message: "User profile fetched", userData });
//     } catch (error) {
//         console.log(error);
//         res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error' });
//     }
// };

// // Logout user
// export const userLogout = async (req, res, next) => {
//     try {
//         res.clearCookie('token');
//         res.json({ success: true, message: "User logged out" });
//     } catch (error) {
//         console.log(error);
//         res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error' });
//     }
// };

// // Check if user is authorized
// export const checkUser = async (req, res, next) => {
//     try {
//         res.json({ success: true, message: "Authorized user" });
//     } catch (error) {
//         console.log(error);
//         res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error' });
//     }
// };
// export const updateProfile = async (req, res) => {
//     const { name, email } = req.body;
//     const user = await User.findByIdAndUpdate(req.user.userId, { name, email }, { new: true });
//     res.json(user);
// };
// src/controllers/userController.js
import User from '../models/userModel.js';
import { generateToken } from '../utils/token.js';

// Register user
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        const token = generateToken(newUser._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict", // Add `sameSite` attribute for CSRF protection
            maxAge: 3600 * 1000, // Optional: Set cookie expiry
        });

        res.json({ success: true, message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

export const userProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from auth middleware

        // Fetch user data, excluding the password
        const userData = await User.findById(userId).select('-password');

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "User profile fetched", user: userData });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal server error' });
    } };

// Login user
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        const passwordMatch = await userExist.matchPassword(password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "User not authorized" });
        }

        const token = generateToken(userExist._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 3600 * 1000,
        });

        res.json({ success: true, message: "User login successful" });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

// Check if user is authorized
export const checkUser = async (req, res) => {
  try {
    const user = req.user; // Extracted via auth middleware
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200).json({ message: "User is authenticated" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Logout user
export const userLogout = (req, res) => {
    res.clearCookie('token');
    res.json({ success: true, message: "User logged out" });
};

