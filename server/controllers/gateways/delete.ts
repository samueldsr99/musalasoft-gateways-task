import { NextFunction, Request, Response } from "express";

import prisma from "../../config/prisma";
import { notFound } from "../../responses";
import { GATEWAY_NOT_FOUND } from "../../responses/gateways";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { serialNumber } = req.params;

    const result = await prisma.gateway.delete({
      where: { serialNumber },
    });
    if (!result) {
      return notFound(res, GATEWAY_NOT_FOUND(serialNumber));
    }
    return res.json(result);
  } catch (err) {
    return next(err);
  }
};
