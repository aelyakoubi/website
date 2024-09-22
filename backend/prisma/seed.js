import { PrismaClient } from "@prisma/client";
import eventsData from "../src/data/events.json" assert { type: "json" };
import userData from "../src/data/users.json" assert { type: "json" };
import categoryData from "../src/data/categories.json" assert { type: "json" };

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  const { events } = eventsData;
  const { users } = userData;
  const { categories } = categoryData;

  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {},
      create: category,
    });
  }

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }

  for (const event of events) {
    // Check if event has categoryIds property
    if (event.categoryIds) {
      await prisma.event.upsert({
        where: { id: event.id },
        update: {},
        create: {
          id: event.id,
          title: event.title,
          description: event.description,
          startTime: event.startTime,
          endTime: event.endTime,
          location: event.location,
          image: event.image,
          categories: {
            connect: event.categoryIds.map((id) => ({ id })),
          },
          createdBy: {
            connect: { id: event.createdBy },
          },
        },
      });
    } else {
      // Handle case where categoryIds property is missing or undefined
      console.error(`CategoryIds missing for event with ID ${event.id}`);
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