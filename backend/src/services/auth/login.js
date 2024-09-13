import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const login = async (username, password) => {
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";
  const prisma = new PrismaClient();
  const user = await prisma.user.findFirst({
    where: { username, password },
  });

  if (!user) {
    return null;
  }

  const token = jwt.sign({ userId: user.id }, secretKey);

  return token;
};

export default login;
