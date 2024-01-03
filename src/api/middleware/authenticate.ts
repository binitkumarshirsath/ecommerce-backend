import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ErrorHandler.js";
import { ENV_CONFIG } from "../../config/env/env-config.js";
import User from "../models/user.model.js";

const authenticate = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token =
      req.headers.authorization?.replace("Bearer ", "") ||
      req.cookies.accessToken;
    if (!token) {
      throw new ApiError("Unauthorized request", 401);
    }
    const ACCESS_TOKEN_KEY = ENV_CONFIG.ACCESS_TOKEN_KEY;
    if (!ACCESS_TOKEN_KEY) {
      throw new ApiError("ACCESS_TOKEN_KEY not found!", 500);
    }
    const decode = jwt.verify(token, ACCESS_TOKEN_KEY) as { _id: string };
    if (!decode) {
      throw new ApiError("Invalid token");
    }
    const userId = decode._id;
    const user = await User.findById(userId).select(
      "-password -passwordResetToken -passwordResetTime"
    );
    if (!user) {
      throw new ApiError("Invalid UserId", 402);
    }
    (req as any).user = user;
    next();
  }
);

export { authenticate };
