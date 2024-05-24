import { PrismaClient } from "@prisma/client";

const createUser = async (username, name, password, image) => {
  const newUser = {
    name,
    username,
    password,
    image,
  };

  const prisma = new PrismaClient();
  const user = await prisma.user.create({
    data: newUser,
  });

  return user;
};

export default createUser;
