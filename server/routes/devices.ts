import { Router } from "express";

import createController from "../controllers/devices/create";
import createBulkController from "../controllers/devices/create-bulk";
import deleteController from "../controllers/devices/delete";

import validate from "../middlewares/validate";
import { createDeviceBulkSchema, createDeviceSchema } from "../schemas/devices";

const router = Router({ mergeParams: true });

router.post("/", validate(createDeviceSchema), createController);

router.post("/bulk", validate(createDeviceBulkSchema), createBulkController);

router.delete("/:uuid", deleteController);

export default router;
