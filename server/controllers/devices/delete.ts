import { NextFunction, Request, Response } from "express";

import prisma from "../../config/prisma";
import { notFound } from "../../responses";
import { DEVICE_NOT_FOUND } from "../../responses/devices";
import { zParse } from "../../schemas";
import { deleteDeviceSchema } from "../../schemas/devices";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { uuid },
    } = await zParse(deleteDeviceSchema, req);

    const device = await prisma.device.delete({
      where: {
        uuid,
      },
    });
    if (!device) {
      return notFound(res, DEVICE_NOT_FOUND(uuid));
    }

    return res.json(device);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};
