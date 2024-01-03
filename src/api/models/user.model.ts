import mongoose, { Document, Mongoose, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ENV_CONFIG } from "../../utils/env/env-config.js";

interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  additionalDetails: mongoose.Schema.Types.ObjectId;
  password: string;
  refreshToken: string;
  passwordResetToken: string;
  passwordResetTime: Date;

  // methods
  isPasswordCorrect(password: string): Promise<boolean>;
  generateRefreshToken(): Promise<string>;
  generateAccessToken(): Promise<string>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      required: [true, "Name is missing"],
      type: String,
    },
    email: {
      required: [true, "Email is missing"],
      type: String,
    },
    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      ref: "Profile",
    },

    role: {
      enum: ["user", "user", "seller"],
      required: true,
      default: "user",
      type: String,
    },

    password: {
      type: String,
    },
    refreshToken: {
      type: String,
    },

    //  for password reset
    passwordResetTime: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// hash the password before saving
userSchema.pre("save", async function (next) {
  const salt = bcrypt.genSaltSync(12);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

// check if password is correct
userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

//generate refresh token
userSchema.methods.generateRefreshToken = async function () {
  const REFRESH_TOKEN_KEY = ENV_CONFIG.REFRESH_TOKEN_KEY;

  return jwt.sign(
    {
      _id: this._id,
    },
    REFRESH_TOKEN_KEY!,
    {
      expiresIn: ENV_CONFIG.REFRESH_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateAccessToken = async function () {
  const ACCESS_TOKEN_KEY = ENV_CONFIG.ACCESS_TOKEN_KEY;

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
    },
    ACCESS_TOKEN_KEY!,
    {
      expiresIn: ENV_CONFIG.ACCESS_TOKEN_EXPIRY,
    }
  );
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
