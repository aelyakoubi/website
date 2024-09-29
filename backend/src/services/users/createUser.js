import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const createUser = async ( name, email, username, password, image) => {
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
