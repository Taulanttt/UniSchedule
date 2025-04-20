const jwt = require('jsonwebtoken');

/**
 * Check for valid JWT and attach user data to req
 */
exports.verifyToken = (req, res, next) => {
  try {
    // Example header: "Authorization: Bearer <token>"
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role }, // ✅ must match what your middleware expects
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user data to request object
    req.userId = decoded.userId;
    req.userRole = decoded.role;

    next();
  } catch (err) {
    console.error('JWT Error:', err);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

/**
 * Optional: Role-based Access (e.g., admin only)
 */
exports.checkRole = (roles) => {
  return (req, res, next) => {
    // roles is an array, e.g. ['admin']
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({ error: 'Forbidden: You do not have the required role' });
    }
    next();
  };
};
