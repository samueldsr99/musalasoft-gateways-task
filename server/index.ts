import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) | 3001;

app.use(express.json());

const prisma = new PrismaClient();

app.get("/", (req, res) => res.send("Express + Typescript Server"));

app.post("/gateways", async (req, res) => {
  const { serialNumber, name, address } = req.body;

  const gateway = await prisma.gateway.create({
    data: {
      serialNumber,
      name,
      address,
    },
  });

  return res.json({
    result: "created",
    data: gateway,
  });
});

app.get("/gateways", async (req, res) => {
  const gateways = await prisma.gateway.findMany();
  return res.json(gateways);
});

app.listen(port, async () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
