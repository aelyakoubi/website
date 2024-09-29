import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const createUser = async (name, email, username, password, image) => {
  // Check if the email or username already exists
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: email },
        { username: username },
      ],
    },
  });

  if (existingUser) {
    throw new Error('Email or username already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name, // Store name in the database
      email,
      username,
      password: hashedPassword,
      image // Store image path in the database
    },
  });

  return newUser;
};

export default createUser;

