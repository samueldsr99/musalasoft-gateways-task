import { Request } from "express";
import { z, ZodError, AnyZodObject } from "zod";

export async function zParse<T extends AnyZodObject>(
  schema: T,
  req: Request
): Promise<z.infer<T>> {
  try {
    return schema.parseAsync(req);
  } catch (err) {
    if (err instanceof ZodError) {
      throw Error(err.message);
    }
    return Error(JSON.stringify(err));
  }
}
