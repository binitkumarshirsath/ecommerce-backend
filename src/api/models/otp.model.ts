import mongoose, { Document } from "mongoose";

interface IOtp extends Document {
  email: string;
  otp: number;
  expireAt: Date;
}

const otpSchema = new mongoose.Schema<IOtp>(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
      required: true,
    },
    expireAt: {
      type: Date,
      expires: 300,
    },
  },
  {
    timestamps: true,
  }
);

const Otp = mongoose.model<IOtp>("Otp", otpSchema);

export default Otp;
