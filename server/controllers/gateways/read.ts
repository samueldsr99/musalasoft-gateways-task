import { NextFunction, Request, Response } from "express";

import prisma from "../../config/prisma";
import { notFound } from "../../responses";
import { GATEWAY_NOT_FOUND } from "../../responses/gateways";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { serialNumber } = req.params;

    const gateway = await prisma.gateway.findUnique({
      where: { serialNumber },
    });
    if (!gateway) {
      return notFound(res, GATEWAY_NOT_FOUND(serialNumber));
    }
    return res.json(gateway);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};
