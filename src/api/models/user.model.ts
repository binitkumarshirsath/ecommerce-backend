import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  gender: "male" | "female";
  dob: Date;
  role: "admin" | "user";
  password: string;
  avatar: string;

  // age is a virtual attribute
  age: number;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    _id: {
      required: [true, "Id property is missing"],
      type: String,
    },
    name: {
      required: [true, "Name is missing"],
      type: String,
    },
    email: {
      required: [true, "Email is missing"],
      type: String,
    },
    gender: {
      enum: ["male", "female"],
      required: true,
      default: "male",
      type: String,
    },
    role: {
      enum: ["admin", "user"],
      required: true,
      default: "user",
      type: String,
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("age").get(function (this: IUser) {
  const today = new Date();
  const birthdate = new Date(this.dob);
  const age = today.getFullYear() - birthdate.getFullYear();

  // Adjust age if birthday hasn't occurred yet this year

  if (
    today <
    new Date(today.getFullYear(), birthdate.getMonth(), birthdate.getDate())
  ) {
    return age - 1;
  }

  return age;
});

const User = mongoose.model("User", userSchema);

export default User;
