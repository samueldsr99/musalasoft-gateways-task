import { NextFunction, Request, Response } from "express";

import prisma from "../../config/prisma";

export default async (_req: Request, res: Response, next: NextFunction) => {
  try {
    return res.json({
      data: await prisma.gateway.findMany(),
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};
