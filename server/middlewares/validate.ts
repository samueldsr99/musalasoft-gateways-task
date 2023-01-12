import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { badRequest } from "../responses";

export default (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationResult = await schema.safeParseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      if (!validationResult.success) {
        return badRequest(res, validationResult.error);
      }

      return next();
    } catch (err) {
      console.error(err);
    }
  };
