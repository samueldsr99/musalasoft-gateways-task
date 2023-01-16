import { NextFunction, Request, Response } from "express";

import prisma from "../../config/prisma";
import { notFound } from "../../responses";
import { GATEWAY_NOT_FOUND } from "../../responses/gateways";
import { zParse } from "../../schemas";
import { createDeviceSchema } from "../../schemas/devices";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { serialNumber },
      body: { status, vendor },
    } = await zParse(createDeviceSchema, req);

    const gateway = await prisma.gateway.findUnique({
      where: { serialNumber },
    });
    if (!gateway) {
      return notFound(res, GATEWAY_NOT_FOUND(serialNumber));
    }

    const device = await prisma.device.create({
      data: {
        vendor,
        status,
        gatewayId: gateway.id,
      },
    });

    return res.json(device);
  } catch (err) {
    return next(err);
  }
};
