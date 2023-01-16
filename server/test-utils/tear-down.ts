import prisma from "../config/prisma";

const tearDown = async () => {
  console.log("Cleaning DB...");

  await prisma.$transaction([
    prisma.gateway.deleteMany({}),
    prisma.device.deleteMany({}),
  ]);
  await prisma.$disconnect();
};

export default tearDown;
