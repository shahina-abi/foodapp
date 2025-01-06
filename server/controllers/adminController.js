// controllers/adminController.js

import bcrypt from 'bcryptjs';
import Admin from '../models/adminModel.js';
import { generateToken } from '../utils/token.js'; // Ensure this utility is correctly implemented
import User from '../models/userModel.js';import Order from '../models/orderModel.js';
import Restaurant from '../models/restaurantModel.js';

export const adminRegister = async (req, res) => {
  try {
    const { name, email, password, mobile, profilePic } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const isAdminExist = await Admin.findOne({ email });
    if (isAdminExist) {
      return res.status(400).json({ success: false, message: "Admin already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newAdmin = new Admin({ name, email, password: hashedPassword, mobile, profilePic });
    await newAdmin.save();

    const token = generateToken(newAdmin._id, 'Admin');
    res.cookie("token", token, { sameSite: "None", secure: true, httpOnly: true });

    res.status(201).json({ success: true, message: "Admin account created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message || 'Internal server error' });
  }
};

// Admin login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin || !bcrypt.compareSync(password, admin.password)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(admin._id, 'Admin');
    res.cookie("token", token, { sameSite: "None", secure: true, httpOnly: true });

    res.json({ success: true, message: "Admin login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};

// Fetch admin profile
export const adminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select('-password');
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    res.json({ success: true, admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};

// Logout admin
export const adminLogout = (req, res) => {
  try {
    res.clearCookie('token', { sameSite: "None", secure: true, httpOnly: true });
    res.json({ success: true, message: "Admin logged out" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};

// Check if admin is authorized
export const checkAdmin = (req, res) => {
  res.json({ success: true, message: "Admin authorized" });
};

// View all users (Admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch users', error });
  }
};

// Delete a user by ID (Admin only)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete user', error });
  }
};

// View all orders (Admin only)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user items.foodItem');
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders', error });
  }
};

// Update an order status (Admin only)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.orderId);

    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    order.status = status;
    await order.save();

    res.json({ success: true, message: 'Order status updated successfully', order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update order status', error });
  }
};

// Create a restaurant (Admin only)
export const createRestaurant = async (req, res) => {
  try {
    const { name, location, categories, foodItems } = req.body;
    const restaurant = new Restaurant({ name, location, categories, foodItems });

    await restaurant.save();
    res.status(201).json({ success: true, restaurant });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create restaurant', error });
  }
};

// Delete a restaurant by ID (Admin only)
export const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.restaurantId);
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found' });

    res.json({ success: true, message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete restaurant', error });
  }
};
// Block or Unblock a User (Admin only)
export const blockUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { blocked } = req.body; // Receive the new block status from the request

    // Validate user existence
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update the block status
    user.blocked = blocked;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${blocked ? "blocked" : "unblocked"} successfully.`,
      user,
    });
  } catch (error) {
    console.error("Error updating user block status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update user block status.",
      error: error.message,
    });
  }
};
