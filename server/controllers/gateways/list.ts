import { NextFunction, Request, Response } from "express";

import prisma from "../../config/prisma";

export default async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const gateways = await prisma.gateway.findMany({
      include: {
        devices: true,
      },
    });
    return res.json(gateways);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};
