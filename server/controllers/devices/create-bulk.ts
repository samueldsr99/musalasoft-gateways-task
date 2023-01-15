import { NextFunction, Request, Response } from "express";

import prisma from "../../config/prisma";
import { badRequest, notFound } from "../../responses";
import { GATEWAY_NOT_FOUND } from "../../responses/gateways";
import { zParse } from "../../schemas";
import { createDeviceBulkSchema } from "../../schemas/devices";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { serialNumber },
      body: { devices: devicesSchema },
    } = await zParse(createDeviceBulkSchema, req);

    const gateway = await prisma.gateway.findUnique({
      where: { serialNumber },
      include: {
        devices: true,
      },
    });
    if (!gateway) {
      return notFound(res, GATEWAY_NOT_FOUND(serialNumber));
    }

    if (gateway.devices.length + devicesSchema.length > 10) {
      return badRequest(res, {
        code: 400,
        message: "A Gateway cannot has more than 10 devices related.",
      });
    }

    const devices = await prisma.device.createMany({
      data: devicesSchema.map((e) => ({
        ...e,
        gatewayId: gateway.id,
      })),
    });

    return res.json(devices);
  } catch (err) {
    return next(err);
  }
};
