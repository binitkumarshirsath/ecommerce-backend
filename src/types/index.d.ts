import { Request } from "express";

export interface UserRequestBody extends Request {
  user: {
    _id: string;
  };
  data: UserBody;
}
export interface UserBody {
  name?: string;
  email: string;
  password: string;
  otp: number;
}

export interface OtpBody {
  email: string;
}
