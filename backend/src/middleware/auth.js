import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization; // Expecting the token directly in the header
  const secretKey = process.env.JWT_SECRET || 'my-secret-key'; // Use JWT_SECRET for consistency

  if (!token) {
    return res.status(401).json({ message: 'You cannot access this operation without a token!' });
  }

  // Verifying the token without Bearer prefix
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log("Token verification failed:", err); // Logs the error for debugging
      return res.status(403).json({ message: 'Invalid token provided!' });
    }

    console.log("Decoded token:", decoded);  // Logs the decoded token for debugging
    req.user = decoded;  // Attach user information to the request object
    next(); // Proceed to the next middleware or route handler
  });
};

export default authMiddleware;
