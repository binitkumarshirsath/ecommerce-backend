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

    const user = await User.create({
      name,
      email,
      password,
    });

    res
      .status(201)
      .send(new ApiResponse("User created successfully", { name: user.name }));
  }
);

const login = asyncHandler(
  async (req: Request<{}, {}, UserBody>, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError("Email or Password missing", 401);
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new ApiError("User is not registered", 401);
    }

    const isPasswordCorrect = await existingUser.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      throw new ApiError("Incorrect password entered!", 401);
    }
    // create refresh token and add to db
    // create access token and send to user

    const refreshToken = await existingUser.generateRefreshToken();
    await User.findByIdAndUpdate(
      existingUser._id,
      {
        refreshToken,
      },
      {
        new: true,
      }
    );
    const accessToken = await existingUser.generateAccessToken();

    res.status(200).send(
      new ApiResponse("User logged in", {
        accessToken,
      })
    );
  }
);

export { createUser, login };
