
import User from "../models/userModel.js"; // Default export
import bcrypt from "bcryptjs"; // Named export
import { generateToken } from "../utils/token.js"; // Named export

const NODE_ENV = process.env.NODE_ENV;
//user register
export const registerUser = async (req, res) => {
    try {
        const { name, email, mobile, password , address} = req.body;

        if (!name || !email || !mobile || !password || !address) {
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
            address
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

// user login
export const userlogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "User does not exist" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(passwordMatch, "passwordMatch");

        if (!passwordMatch) {
            return res.status(400).json({ error: "Incorrect password" });
        }

        if (!user.isActive) {
            return res.status(400).json({ error: "User profile has been deactivated" });
        }

        const token = generateToken(user, "user", res);

        res.cookie("token", token, {
            sameSite: NODE_ENV === "production" ? "None" : "Lax",
            secure: NODE_ENV === "production",
            httpOnly: NODE_ENV === "production",
        });

        console.log("Login successful - User Data:", user); // Debugging Line

        const { password: _, ...userWithoutPassword } = user._doc;

        res.status(200).json({
            message: "Login successful",
            data: {
                id: userWithoutPassword._id,
                name: userWithoutPassword.name,  // Ensure 'name' is included!
                email: userWithoutPassword.email,
                mobile: userWithoutPassword.mobile,
                address: userWithoutPassword.address,
                role: userWithoutPassword.role,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
};

// check user
export const checkUser = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const userData = await User.findById(user.id).select("-password");

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User is authenticated",
      data: {
        id: userData._id,
        name: userData.name, // Ensure this is included!
        email: userData.email,
        role: userData.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const userLogout = (req, res) => {
    try {
        res.clearCookie("token", {
            sameSite: "None",
            secure: true,
            httpOnly: true,
        });

        return res.status(200).json({ success: true, message: "User logged out successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
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
