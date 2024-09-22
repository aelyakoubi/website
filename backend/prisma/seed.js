import { PrismaClient } from "@prisma/client";
import eventsData from "../src/data/events.json" assert { type: "json" };
import userData from "../src/data/users.json" assert { type: "json" };
import categoryData from "../src/data/categories.json" assert { type: "json" };

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  const { events } = eventsData;
  const { users } = userData;
  const { categories } = categoryData;

  // Upsert categories
  for (const category of categories) {
    try {
      await prisma.category.upsert({
        where: { id: category.id },
        update: {},
        create: category,
      });
      console.log(`Category upserted: ${category.id}`);
    } catch (error) {
      console.error(`Error upserting category ${category.id}:`, error);
    }
  }

  // Upsert users
  for (const user of users) {
    try {
      await prisma.user.upsert({
        where: { id: user.id },
        update: {},
        create: user,
      });
      console.log(`User upserted: ${user.id}`);
    } catch (error) {
      console.error(`Error upserting user ${user.id}:`, error);
    }
  }

  // Upsert events
  for (const event of events) {
    try {
      const eventData = {
        id: event.id,
        title: event.title,
        description: event.description,
        startTime: event.startTime,
        endTime: event.endTime,
        location: event.location,
        image: event.image,
        categories: event.categoryIds ? {
          connect: event.categoryIds.map((id) => ({ id })),
        } : undefined,
        createdBy: {
          connect: { id: event.createdBy },
        },
      };

      await prisma.event.upsert({
        where: { id: event.id },
        update: {},
        create: eventData,
      });

      console.log(`Event upserted: ${event.id}`);
    } catch (error) {
      console.error(`Error upserting event ${event.id}:`, error);
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
