import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization; // Expecting the token directly in the header
  const secretKey = process.env.AUTH_SECRET_KEY || 'my-secret-key';

  if (!token) {
    return res.status(401).json({ message: 'You cannot access this operation without a token!' });
  }

  // No need to replace 'Bearer ' since you are using only 'token'
  
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log("Token verification failed:", err); // Logs the error for debugging
      return res.status(403).json({ message: 'Invalid token provided!' });
    }

    console.log("Decoded token:", decoded);  // Logs the decoded token for debugging
    req.user = decoded;  // contains user information
    next();
  });
};

export default authMiddleware;
