
import User from "../models/userModel.js"; // Default export
import bcrypt from "bcryptjs"; // Named export
import { generateToken } from "../utils/token.js"; // Named export

const NODE_ENV = process.env.NODE_ENV;
//user register
export const registerUser = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        if (!name || !email || !mobile || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const userAlreadyExist = await User.findOne({ email }).select("-password");

        if (userAlreadyExist) {
            return res.status(400).json({ error: "user Already exist" });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            mobile,
        });

        const savedUser = await newUser.save();

        res.status(200).json({ message: "User created successfully", data: savedUser });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" });
    }
};

//fetch user profile
export const userProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    console.log("Authenticated user ID:", req.user.id);

    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      success: true,
      message: "User profile fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error in userProfile controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//user login
export const userlogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "All feilds are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "User not exist" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(passwordMatch, "passwordMatch");

        if (!passwordMatch) {
            return res.status(400).json({ error: "Incorrect password" });
        }

        if (!user.isActive) {
            return res.status(400).json({ error: "User profile has deactivated" });
        }
        const token = generateToken(user, "user",res);

        res.cookie("token",token) ;

        const { password: _, ...userWithOutPassword } = user._doc;

        res.status(200).json({ message: "login successfull", data: userWithOutPassword });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" });
    }
};
// Check if user is authorized
export const checkUser = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Fetch full user details from the database
    const userData = await User.findById(user.id).select("-password"); // Exclude password
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User is authenticated", user: userData });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Logout user
export const userLogout = (req, res) => {
    res.clearCookie('token');
    res.json({ success: true, message: "User logged out" });
};
export const editUserProfile = async (req, res) => {
  try {
    const { name, email, mobile, address } = req.body;

    // Validate fields
    if (!name || !email || !mobile) {
      return res.status(400).json({ success: false, message: "Name, email, and mobile are required" });
    }

    // Update the user's profile
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id, // The authenticated user's ID from the middleware
      { name, email, mobile, address }, // Fields to update
      { new: true, runValidators: true } // Return the updated document
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

