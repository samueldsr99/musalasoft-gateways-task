import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  return res.json({
    code: 500,
    message: "SERVER ERROR",
  });
};

export default errorHandler;
