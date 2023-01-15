import { ErrorRequestHandler } from "express";
import { internalServerError } from "../responses";

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);
  return internalServerError(res, {
    code: 500,
    message: "Internal server error",
  });
};

export default errorHandler;
