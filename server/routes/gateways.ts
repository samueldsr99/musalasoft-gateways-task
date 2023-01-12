import { Router } from "express";

import createController from "../controllers/gateways/create";
import listController from "../controllers/gateways/list";
import readController from "../controllers/gateways/read";
import deleteController from "../controllers/gateways/delete";

import validate from "../middlewares/validate";

import {
  createGatewaySchema,
  deleteGatewaySchema,
  readGatewaySchema,
} from "../schemas/gateways";

const router = Router();

router.post("/", validate(createGatewaySchema), createController);

router.get("/", listController);

router.get("/:serialNumber", validate(readGatewaySchema), readController);

router.delete(
  "/:serialNumber",
  validate(deleteGatewaySchema),
  deleteController
);

export default router;
