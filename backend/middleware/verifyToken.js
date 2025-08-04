// backend/middleware/verifyToken.js
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log("🛡️ Authorization Header:", authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn("⚠️ No token provided or wrong format");
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token verified:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("❌ Invalid token:", err.message);
    return res.status(403).json({ error: 'Invalid token.' });
  }
}

module.exports = verifyToken;
