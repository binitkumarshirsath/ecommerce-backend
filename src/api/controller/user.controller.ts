import { NextFunction, Response, Request } from "express";
import { UserBody } from "../../types/index.js";
import User from "../models/user.model.js";

const createUser = async (
  req: Request<{}, {}, UserBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id, avatar, dob, email, gender, name, password } = req.body;
    if (!_id || !avatar || !dob || !email || !gender || !name || !password) {
      return res.status(400).json({
        success: false,
        message: "Incomplete user data found.",
      });
    }

    const user = await User.create({
      _id,
      avatar,
      dob,
      email,
      gender,
      name,
      password, //hash the password
    });

    return res.status(201).json({
      success: true,
      message: "User created susccessfully.",
    });
  } catch (error) {
    console.error("Error while creating user", error);
    return res.status(404).json({
      success: false,
      message: "Error while creating user",
      error,
    });
  }
};

export { createUser };
