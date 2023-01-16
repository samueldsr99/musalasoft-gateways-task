import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: { url: `${process.env.DATABASE_URL}/${process.env.NODE_ENV}` },
  },
});

export default prisma;
