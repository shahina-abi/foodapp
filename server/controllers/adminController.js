// controllers/adminController.js
import Admin from '../models/adminModel.js';
import generateToken from '../utils/token.js';  // Reuse token generation
import bcrypt from 'bcryptjs';

// Admin login
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// Fetch all users (admin-only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}); // Assuming you have a User model
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const adminProfile = async (req, res, next) => {
    try {

        const {user}=req

        const userData = await Mentor.findById(user.id).select('-password')

        res.json({ success: true, message: "user profile fetched", userData });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};
export const adminLogout = async (req, res, next) => {
    try {

        res.clearCookie('token')
        res.json({ success: true, message: "user logged out" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};
export const checkAdmin = async (req, res, next) => {
    try {

        res.json({ success: true, message: "mentor autherized" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};
// Add other admin functions as needed
