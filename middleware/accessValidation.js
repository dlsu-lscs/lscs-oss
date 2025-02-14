
import jwt from 'jsonwebtoken';

const accessValidation = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expecting "Bearer <token>"

  if (!token) {
    return res.status(401).json({ status: "error", message: "Access token missing." });
  }

  jwt.verify(token, process.env.CLIENT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ status: "error", message: "Invalid or expired token." });
    }
    req.user = user;
    next();
  });
};

export default accessValidation;

