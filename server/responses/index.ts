import { Response } from "express";

export const HttpCode = {
  OK: 200,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const notFound = (res: Response, message: string) =>
  res.status(HttpCode.NOT_FOUND).json({
    code: HttpCode.NOT_FOUND,
    message,
  });

export const ok = (res: Response, body: Object) =>
  res.status(HttpCode.OK).json({
    code: HttpCode.OK,
    ...body,
  });

export const badRequest = (res: Response, body: Object) =>
  res.status(HttpCode.BAD_REQUEST).json({
    code: HttpCode.BAD_REQUEST,
    ...body,
  });
