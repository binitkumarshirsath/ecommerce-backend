export interface UserBody {
  name?: string;
  email: string;
  password: string;
  otp: number;
}

export interface OtpBody {
  email: string;
}
