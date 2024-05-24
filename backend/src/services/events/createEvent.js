import { PrismaClient } from "@prisma/client";

const createEvent = async (
  title,
  description,
  location,
  image,
  startTime,
  endTime,
  createdBy,
  categoryIds
) => {
  const prisma = new PrismaClient();
  const event = await prisma.event.create({
    data: {
      title,
      description,
      location,
      image,
      startTime,
      endTime,
      createdBy: {
        connect: { id: createdBy },
      },
      categories: {
        connect: categoryIds.map((id) => ({ id })),
      },
    },
  });

  return event;
};

export default createEvent;
