import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  let token = req.headers.authorization;
  const secretKey = process.env.AUTH_SECRET_KEY || 'my-secret-key';

  if (!token) {
    return res.status(401).json({ message: 'You cannot access this operation without a token!' });
  }

  // Handle cases where the token is prefixed with "Bearer "
  token = token.replace('Bearer ', '');

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log("Token verification failed:", err); // Logs the error for debugging
      return res.status(403).json({ message: 'Invalid token provided!' });
    }

    console.log("Decoded token:", decoded);  // Logs the decoded token for debugging
    req.user = decoded;  // Assuming decoded contains user information
    next();
  });
};

export default authMiddleware;
