// controllers/adminController.js

import bcrypt from 'bcryptjs';
import{Admin} from '../models/adminModel.js';
import { generateToken } from '../utils/token.js'; // Ensure this utility is correctly implemented
import User from '../models/userModel.js';import Order from '../models/orderModel.js';
import Restaurant from '../models/restaurantModel.js';
const NODE_ENV = process.env.NODE_ENV;
import Coupon from '../models/CouponModel.js';

export const adminRegister = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      restaurant_name,
      restaurant_address,
      restaurant_city,
      restaurant_state,
      restaurant_postalCode,
      restaurant_country,
      restaurant_contact,
      restaurant_email,
      restaurant_website,
      restaurant_cuisine,
      restaurant_open,
      restaurant_close,
    } = req.body;

    // ✅ Validate admin fields
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Admin details are required" });
    }

    // ✅ Validate restaurant fields
    if (!restaurant_name || !restaurant_email || !restaurant_contact) {
      return res.status(400).json({ success: false, message: "Restaurant details are required" });
    }

    // ✅ Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: "Admin already exists" });
    }

    // ✅ Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newAdmin = new Admin({ name, email, password: hashedPassword });

    await newAdmin.save(); // Save admin first

    // ✅ Create restaurant linked to the admin
    const newRestaurant = new Restaurant({
      name: restaurant_name,
      address: {
        street: restaurant_address,
        city: restaurant_city,
        state: restaurant_state,
        postalCode: restaurant_postalCode,
        country: restaurant_country,
      },
      phone: restaurant_contact,
      email: restaurant_email,
      website: restaurant_website,
      cuisineType: restaurant_cuisine.split(","),
      openingHours: {
        open: restaurant_open,
        close: restaurant_close,
      },
      admin: newAdmin._id, // Link restaurant to admin
    });

    await newRestaurant.save();

    // ✅ Generate token
    const token = generateToken(newAdmin._id, "admin");
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(201).json({
      success: true,
      message: "Admin & restaurant registered successfully",
      token,
      restaurantId: newRestaurant._id, // Send back restaurant ID
    });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    const isPasswordValid = bcrypt.compareSync(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // ✅ Find the restaurant linked to this admin
    const restaurant = await Restaurant.findOne({ admin: admin._id });

    const token = generateToken(admin._id, 'admin');

    res.cookie('token', token, {
      sameSite: NODE_ENV === "production" ? "None" : "Lax",
      secure: NODE_ENV === "production",
      httpOnly: NODE_ENV === "production",
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      restaurantId: restaurant?._id || null, // ✅ Return `restaurantId`
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message || 'Internal server error' });
  }
};

//fetch admin profile

export const adminProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.user.id).select('-password');
        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        res.status(200).json({ success: true, message: 'Admin profile fetched', data: admin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || 'Internal server error' });
    }
};
//admin logout
export const adminLogout = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'None',
            secure: process.env.NODE_ENV === 'production',
        });
        res.status(200).json({ success: true, message: 'Admin logged out successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || 'Internal server error' });
    }
};

export const checkAdmin = (req, res) => {
    try {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: "Admin not authorized" });
        }
        return res.json({ success: true, message: "Admin authorized" });
    } catch (error) {
        console.log("Error in checkadmin middleware:", error);
        return res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
};
//     try {
//         res.status(200).json({ success: true, message: 'Admin is authorized' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: error.message || 'Internal server error' });
//     }
// };
// View all users (Admin only)
// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().select('-password');
//     res.json({ success: true, users });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to fetch users', error });
//   }
// };
export const getAllUsers = async (req, res) => {
  try {
    const { restaurantId } = req.query; // Get restaurantId from query

    if (!restaurantId) {
      return res.status(400).json({ success: false, message: "Restaurant ID is required." });
    }

    // Fetch orders for the given restaurantId
    const orders = await Order.find({ restaurant: restaurantId }).populate("user", "name email");

    // Extract unique users from the orders
    const uniqueUsers = [];
    const userIds = new Set(); // To track unique user IDs

    orders.forEach((order) => {
      if (order.user && !userIds.has(order.user._id.toString())) {
        userIds.add(order.user._id.toString());
        uniqueUsers.push({
          _id: order.user._id,
          name: order.user.name,
          email: order.user.email,
          totalOrders: 1, // Initialize total orders
        });
      } else if (order.user) {
        // If user already exists, increment their totalOrders
        const userIndex = uniqueUsers.findIndex((u) => u._id.toString() === order.user._id.toString());
        if (userIndex !== -1) {
          uniqueUsers[userIndex].totalOrders += 1;
        }
      }
    });

    res.json({ success: true, users: uniqueUsers });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Failed to fetch users", error });
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
// export const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().populate('user items.foodItem');
//     res.json({ success: true, orders });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to fetch orders', error });
//   }
// };
export const getAllOrders = async (req, res) => {
  try {
    const { restaurantId } = req.query; // Get restaurantId from query

    if (!restaurantId) {
      return res.status(400).json({ success: false, message: "Restaurant ID is required." });
    }

    // Fetch orders for the given restaurantId
    const orders = await Order.find({ restaurant: restaurantId }).populate("user", "name email");

    if (orders.length === 0) {
      return res.json({ success: true, orders: [] });
    }

    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders", error });
  }
};
// Update an order status (Admin only)
// export const updateOrderStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const order = await Order.findById(req.params.orderId);

//     if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

//     order.status = status;
//     await order.save();

//     res.json({ success: true, message: 'Order status updated successfully', order });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to update order status', error });
//   }
// };
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { orderId, restaurantId } = req.params;

    const order = await Order.findOne({ _id: orderId, restaurant: restaurantId });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found or not authorized.' });

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
    const { blocked } = req.body; 
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

export const createCoupon = async (req, res) => {
  try {
    const { code, discount, expiryDate, restaurantId } = req.body;

    // Validate the request body
    if (!code || !discount || !expiryDate || !restaurantId) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if the coupon already exists for this restaurant
    const existingCoupon = await Coupon.findOne({ code, restaurant: restaurantId });
    if (existingCoupon) {
      return res.status(400).json({ success: false, message: "Coupon code already exists for this restaurant" });
    }

    // Save the coupon to the database
    const coupon = new Coupon({
      code,
      discount,
      expiryDate,
      restaurant: restaurantId, // Associate coupon with the restaurant
    });

    await coupon.save();

    res.status(201).json({
      success: true,
      message: "Coupon created successfully",
      coupon,
    });
  } catch (error) {
    console.error("Error creating coupon:", error.message);
    res.status(500).json({ success: false, message: "Failed to create coupon" });
  }
};
//edit admin profile
export const editAdminProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validate fields
    if (!name || !email) {
      return res.status(400).json({ success: false, message: "Name and email are required" });
    }

    // Update the admin's profile
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.user.id, // The authenticated admin's ID from the middleware
      { name, email }, // Fields to update
      { new: true, runValidators: true } // Return the updated document
    ).select("-password");

    if (!updatedAdmin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedAdmin,
    });
  } catch (error) {
    console.error("Error updating admin profile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAdminStats = async (req, res) => {
  try {
    const adminId = req.user.id; // Get admin ID from the authenticated user
    const restaurant = await Restaurant.findOne({ admin: adminId }); // Find the restaurant linked to the admin

    if (!restaurant) {
      return res.status(404).json({ success: false, message: "Restaurant not found for this admin." });
    }

    // Fetch users who have placed orders at this restaurant
    const orders = await Order.find({ restaurant: restaurant._id }).populate("user");
    const uniqueUsers = [...new Set(orders.map(order => order.user?._id))]; // Get unique users

    // Calculate stats
    const usersCount = uniqueUsers.length; // Number of unique users
    const ordersCount = orders.length; // Total orders
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0); // Total revenue
    const deliveredOrders = orders.filter(order => order.status === "Delivered").length; // Delivered orders
    const pendingOrders = orders.filter(order => order.status === "Pending").length; // Pending orders
    const canceledOrders = orders.filter(order => order.status === "Canceled").length; // Canceled orders

    res.status(200).json({
      success: true,
      usersCount,
      ordersCount,
      totalRevenue,
      deliveredOrders,
      pendingOrders,
      canceledOrders,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ success: false, message: "Failed to fetch stats" });
  }
};
export const deleteCoupon = async (req, res) => {
  try {
    const { couponId } = req.params;

    // Find and delete the coupon
    const coupon = await Coupon.findByIdAndDelete(couponId);
    
    if (!coupon) {
      return res.status(404).json({ success: false, message: "Coupon not found" });
    }

    res.status(200).json({ success: true, message: "Coupon deleted successfully" });
  } catch (error) {
    console.error("Error deleting coupon:", error);
    res.status(500).json({ success: false, message: "Failed to delete coupon" });
  }
};
export const getAllCoupons = async (req, res) => {
  try {
    const { restaurantId } = req.query; // Get restaurantId from query

    if (!restaurantId) {
      return res.status(400).json({ success: false, message: "Restaurant ID is required" });
    }

    // Fetch coupons for the given restaurantId
    const coupons = await Coupon.find({ restaurant: restaurantId });

    res.json({ success: true, coupons });
  } catch (error) {
    console.error("Error fetching coupons:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch coupons" });
  }
};