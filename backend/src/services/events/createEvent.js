import { PrismaClient } from "@prisma/client";

const createEvent = async (
  title,
  description,
  location,
  image,
  startTime,
  endTime,
  createdBy,  // This should be the user ID
  categoryIds
) => {
  const prisma = new PrismaClient();
  
  if (!createdBy) {
    throw new Error("User ID (createdBy) is required to create an event.");
  }

  try {
    const event = await prisma.event.create({
      data: {
        title,
        description,
        location,
        image,
        startTime: new Date(startTime),  // Convert to Date object
        endTime: new Date(endTime),      // Convert to Date object
        createdBy: {
          connect: { id: String(createdBy) },  // Ensure ID is a string
        },
        categories: {
          connect: Array.isArray(categoryIds)
            ? categoryIds.map((id) => ({ id: String(id) })) // Ensure IDs are strings
            : [],
        },
      },
    });

    return event;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  } finally {
    await prisma.$disconnect(); // Always disconnect Prisma client
  }
};

export default createEvent;
