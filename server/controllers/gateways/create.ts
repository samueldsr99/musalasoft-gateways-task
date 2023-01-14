import { NextFunction, Request, Response } from "express";

import prisma from "../../config/prisma";
import { zParse } from "../../schemas";
import { createGatewaySchema } from "../../schemas/gateways";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      body: { serialNumber, address, name, devices },
    } = await zParse(createGatewaySchema, req);

    console.log({
      ...(serialNumber && { serialNumber }),
      name,
      address,
      devices: {
        create: devices,
      },
    });

    const gateway = await prisma.gateway.create({
      data: {
        ...(serialNumber && { serialNumber }),
        name,
        address,
        devices: {
          create: devices,
        },
      },
      include: {
        devices: true,
      },
    });

    return res.json(gateway);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};
