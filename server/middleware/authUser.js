// import jwt from "jsonwebtoken";
// import User from "../models/userModel.js";

// export const authUser = async (req, res, next) => {
//   try {
//     const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({ success: false, message: "User not authorized" });
//     }

//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

//     // Fetch the user details using the ID in the token
//     const user = await User.findById(decodedToken.id).select("-password");
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     req.user = user; // Attach the full user object to the request

//     next(); // Proceed to the next middleware or route handler
//   } catch (error) {
//     return res.status(401).json({ success: false, message: "User authorization failed", error: error.message });
//   }
// };

import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  try {
    const {token} = req.cookies;
 console.log("Token from cookies:", token); 
    if (!token) {
      return res.status(401).json({ success: false, message: "Token not provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded token:", decoded); 
    if (!decoded) {
      return res.status(401).json({ success: false, message: "User not authorized" });
    }

    // Attach the user ID to the request
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message || "Authentication failed",
    });
  }
};
