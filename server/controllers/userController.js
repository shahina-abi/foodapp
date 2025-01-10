
import User from "../models/userModel.js"; // Default export
import bcrypt from "bcryptjs"; // Named export
import { generateToken } from "../utils/token.js"; // Named export

const NODE_ENV = process.env.NODE_ENV;

// Register user
// export const registerUser = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
        
//         if (!name || !email || !password) {
//             return res.status(400).json({ success: false, message: "All fields are required" });
//         }

//         const isUserExist = await User.findOne({ email });
//         if (isUserExist) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         const newUser = new User({ name, email, password });
//         await newUser.save();

//         const token = generateToken(newUser._id);

//         res.cookie("token", token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "Strict", // Add `sameSite` attribute for CSRF protection
//             maxAge: 3600 * 1000, // Optional: Set cookie expiry
//         });

//         res.json({ success: true, message: "User created successfully" });
//     } catch (error) {
//         res.status(500).json({ message: error.message || 'Internal server error' });
//     }
// };
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

export const userProfile = async (req, res) => {
  try {
    // Use the authenticated user's ID from the auth middleware
    const userId = req.user.id;

    // Fetch user data, excluding the password
    const userData = await User.findById(userId).select('-password');

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User profile fetched", data: userData });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
};

// Login user
// export const userLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log(req.body);

//     if (!email || !password) {
//       return res.status(400).json({ success: false, message: "All fields are required" });
//     }

//     const userExist = await User.findOne({ email });
//     if (!userExist) {
//       return res.status(404).json({ success: false, message: "User does not exist" });
//     }

//     const passwordMatch = await userExist.matchPassword(password);
//     if (!passwordMatch) {
//       return res.status(401).json({ success: false, message: "Invalid credentials" });
//     }

//     const token = generateToken(userExist._id);

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "Strict",
//       maxAge: 3600 * 1000,
//     });

//     // Include user data in the response
//     res.json({
//       success: true,
//       message: "User login successful",
//       user: {
//         _id: userExist._id,
//         name: userExist.name,
//         email: userExist.email,
//         isAdmin: userExist.isAdmin,
//         createdAt: userExist.createdAt,
//         updatedAt: userExist.updatedAt,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message || "Internal server error" });
//   }
// };
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
// export const checkUser = async (req, res) => {
//   try {
//     const user = req.user; // Extracted via auth middleware
//     if (!user) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     // Fetch full user details from the database
//     const userData = await User.findById(user.id).select("-password"); // Exclude password
//     if (!userData) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     res.status(200).json({ success: true, message: "User is authenticated", user: userData });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };
export const checkUser = async (req, res) => {
    try {
        res.status(200).json({ message: "autherized user" });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" });
    }
};

// Logout user
export const userLogout = (req, res) => {
    res.clearCookie('token');
    res.json({ success: true, message: "User logged out" });
};

