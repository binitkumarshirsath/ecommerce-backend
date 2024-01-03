import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { OtpBody, UserBody } from "../../types/index.js";
import User from "../models/user.model.js";
import { ApiError } from "../../utils/ErrorHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import Otp from "../models/otp.model.js";
import { generateOTP } from "../../utils/OTP.js";
import { sendMail } from "../../config/node-mailer.js";

const sendOTP = asyncHandler(
  async (req: Request<{}, {}, OtpBody>, res: Response, next: NextFunction) => {
    const { email } = req.body;
    // check if otp body exists , resend the otp and increase expiry time
    const existingOtp = await Otp.findOne({ email });
    if (!existingOtp) {
      // generate , save in db and send  otp
      const otp = generateOTP();
      // save otp
      await Otp.create({
        email,
        otp,
      });
      // send otp
      await sendMail({
        to: email,
        subject: "One time password for email verification",
        html: `${otp}`,
        text: "hi",
      });
    } else {
      // resend otp and increase expiry
      const newExpiry = new Date(Date.now() + 5 * 60 * 1000);
      existingOtp.expireAt = newExpiry;
      await existingOtp.save();
      await sendMail({
        to: email,
        subject: "One time password for email verification",
        html: `${existingOtp.otp}`,
        text: "hi",
      });
    }
  }
);

const signup = asyncHandler(
  async (req: Request<{}, {}, UserBody>, res: Response, next: NextFunction) => {
    const { email, name, password, otp } = req.body;
    if (!email || !name || !password || !otp) {
      throw new ApiError("Empty field found", 402);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError("User already registed with email", 402);
    }

    // verify otp
    const existingOtp = await Otp.findOne({ email });
    if (!existingOtp) {
      throw new ApiError("OTP expired", 400);
    }

    if (existingOtp?.otp !== otp) {
      throw new ApiError("Invalid OTP", 404);
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

export { signup, login, sendOTP };
