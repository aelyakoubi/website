import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteUserById = async (id) => {
 

  // Delete user's events first
  await prisma.event.deleteMany({
    where: { createdBy: id },
  });

  // Delete the user
  const deletedUser = await prisma.user.delete({
    where: { id },
  });

  return deletedUser ? id : null; // Return user id if deleted successfully
};

export default deleteUserById;