import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Routes
import gatewaysRoutes from "./routes/gateways";
import devicesRoutes from "./routes/devices";

// Middlewares
import errorHandler from "./middlewares/error-handler";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) | 3001;

app.use(express.json());
app.use(cors());

app.get("/", (_req, res) => res.send("Express + Typescript Server"));

app.use("/gateways", gatewaysRoutes);
app.use("/gateways/:serialNumber/devices", devicesRoutes);

app.get("/error", () => {
  throw new Error("Mock error");
});

app.use(() => {
  throw new Error("Route was not found");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
