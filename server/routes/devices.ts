import { Router } from "express";

import createController from "../controllers/devices/create";
import deleteController from "../controllers/devices/delete";

const router = Router({ mergeParams: true });

router.post("/", createController);

router.delete("/:uuid", deleteController);

export default router;
