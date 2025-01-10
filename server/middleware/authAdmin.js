import jwt from 'jsonwebtoken';

export const authAdmin = (req, res, next) => {
  try {
    const token = req.cookies.adminToken; // Use cookies or headers as needed
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) {
      return res.status(403).json({ error: 'Access denied. Admins only.' });
    }

    req.user = decoded; // Attach the decoded token to the request
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};
