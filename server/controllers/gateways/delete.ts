import { NextFunction, Request, Response } from "express";

import prisma from "../../config/prisma";
import { notFound } from "../../responses";
import { GATEWAY_NOT_FOUND } from "../../responses/gateways";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { serialNumber } = req.params;

    const count = await prisma.gateway.count({
      where: { serialNumber },
    });
    if (!count) {
      return notFound(res, GATEWAY_NOT_FOUND(serialNumber));
    }

    const result = await prisma.gateway.delete({
      where: { serialNumber },
    });

    return res.json(result);
  } catch (err) {
    return next(err);
  }
};
