import { NextFunction, Request, Response } from "express";

import prisma from "../../config/prisma";
import { notFound } from "../../responses";
import { GATEWAY_NOT_FOUND } from "../../responses/gateways";
import { zParse } from "../../schemas";
import {
  createGatewaySchema,
  patchGatewaySchema,
} from "../../schemas/gateways";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { serialNumber },
      body: { name, address },
    } = await zParse(patchGatewaySchema, req);

    const found = await prisma.gateway.count({
      where: { serialNumber },
    });
    if (!found) {
      return notFound(res, GATEWAY_NOT_FOUND(serialNumber));
    }

    const gateway = await prisma.gateway.update({
      data: {
        ...(name && { name }),
        ...(address && { address }),
      },
      where: { serialNumber },
    });

    return res.json(gateway);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};
