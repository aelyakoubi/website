// backend/src/middleware/auth.js

import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  let token = req.headers.authorization;
  const secretKey = process.env.AUTH_SECRET_KEY || 'my-secret-key';

  // Log the token from local storage for debugging purposes
  console.log(localStorage.getItem('token'));

  if (!token) {
    return res.status(401).json({ message: 'You cannot access this operation without a token!' });
  }

  // Check if token starts with "Token " and remove it if necessary
  if (token.startsWith("Token ")) {
    token = token.slice(6, token.length).trim();
  }

  // Verifying the token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log("Token verification failed:", err);
      return res.status(403).json({ message: 'Invalid token provided!' });
    }

    // Log the decoded token for debugging purposes
    console.log("Decoded token:", decoded);
    req.user = {
      id: decoded.id,  // Ensure 'id' from the token is assigned
      username: decoded.username,
    };

    next();
  });
};

export default authMiddleware;
