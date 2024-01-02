import mongoose, { Document, Mongoose, Schema } from "mongoose";
import bcrypt from "bcrypt";
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
      required: true,
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
  const hash = bcrypt.hashSync(this.password, salt);
  next();
});

// check if password is correct
userSchema.methods.isPasswordCorrect = async function (password: string) {
  await bcrypt.compare(password, this.password);
};
const User = mongoose.model("User", userSchema);

export default User;
