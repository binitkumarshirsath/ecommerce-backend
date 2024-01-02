import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../../utils/ErrorHandler.js";
const errorMiddleware = async (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err);

  return res.status(err.statusCode || 500).json({
    success: false,
    err: err.error,
    stack: err.stack,
    message: err.message || "Something went wrong",
  });
};

export { errorMiddleware };
