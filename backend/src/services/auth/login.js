import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const login = async (identifier, password) => {
  // Check if identifier is an email or username
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: identifier }, // If it's an email
        { username: identifier } // If it's a username
      ]
    }
  });

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return token;
};

export default login;
