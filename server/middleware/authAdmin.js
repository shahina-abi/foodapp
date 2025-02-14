

 import jwt from "jsonwebtoken";
export const authAdmin = (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // ✅ Try getting token from cookies first

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = tokenVerified;

    if (tokenVerified.role !== "admin" && tokenVerified.role !== "user") {
      return res.status(403).json({ success: false, message: "Unauthorized: Insufficient permissions" });
    }

    next();
  } catch (error) {
    console.error("Error in authAdmin middleware:", error);
    res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
  }
};
