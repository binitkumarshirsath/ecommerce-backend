import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { UserBody } from "../../types/index.js";
import User from "../models/user.model.js";
import { ApiError } from "../../utils/ErrorHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const createUser = asyncHandler(
  async (req: Request<{}, {}, UserBody>, res: Response, next: NextFunction) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      throw new ApiError("Empty field found", 402);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError("User already registed with email", 402);
    }

    await User.create({
      name,
      email,
      password,
    });

    res.status(201).send(new ApiResponse("User created successfully", {}, 201));
  }
);

export { createUser };
