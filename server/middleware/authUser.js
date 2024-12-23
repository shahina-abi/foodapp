
// import jwt from "jsonwebtoken";

// export const authUser = (req, res, next) => {
//   try {
//     const { token } = req.cookies;
//     if (!token) {
//       return res.status(401).json({ message: "User not authorized", success: false });
//     }

//     // Verify the token
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

//     // Attach user information to the request
//     req.user = decodedToken;

//     next(); // Proceed to the next middleware or route handler
//   } catch (error) {
//     // Handle verification errors (e.g., expired or invalid token)
//     return res.status(401).json({ message: "User authorization failed", success: false });
//   }
// };
import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  try {
    // Check for token in cookies or Authorization header
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "User not authorized" });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Attach user information to the request
    req.user = decodedToken;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ success: false, message: "User authorization failed", error: error.message });
  }
};
