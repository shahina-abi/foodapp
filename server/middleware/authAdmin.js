import jwt from 'jsonwebtoken'

export const authAdmin = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized access', success: false });

    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (verified.role !== 'Admin') return res.status(403).json({ message: 'Access denied', success: false });

    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authorization failed', success: false });
  }
};