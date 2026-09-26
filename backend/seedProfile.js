const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const profile = await prisma.profile.upsert({
    where: {
      id: 1,
    },
    update: {
        bio: "Python Developer",
    },
    create: {
      name: "Kanimozhi",
      email: "kanimozhi@example.com",
      phone: "9876543210",
      bio: "Python Developer",
    },
  });

  console.log(profile);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());