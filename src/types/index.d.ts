export interface UserBody {
  _id: string;
  name: string;
  email: string;
  gender: "male" | "female";
  dob: Date;
  password: string;
  avatar: string;
}
