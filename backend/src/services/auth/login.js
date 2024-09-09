import jwt from "jsonwebtoken"; // Import jsonwebtoken for token creation
import { PrismaClient } from "@prisma/client"; // Import PrismaClient to interact with the database

const login = async (username, password) => {
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key"; // Use secret key from environment or fallback to a default value
  const prisma = new PrismaClient(); // Initialize Prisma client
  
  // Find the user in the database matching the given username and password
  const user = await prisma.user.findFirst({
    where: { username, password },
  });

  // If user is not found, return null
  if (!user) {
    return null;
  }

  // Generate a JWT token that contains the userId and username
  const token = jwt.sign({ userId: user.id, username: user.username }, secretKey);

  // Return both the token and the username (or any additional user data you want to send)
  return { token, username: user.username };
};

export default login; // Export the login function
