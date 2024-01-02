import mongoose, { Document } from "mongoose";

interface IProfile extends Document {
  userId: mongoose.Types.ObjectId;
  address: mongoose.Types.ObjectId;
  dob: Date;
  phone: number;
  gender: "male" | "female";
  avatar: string;
}

const profileSchema = new mongoose.Schema<IProfile>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    dob: {
      type: Date,
    },
    phone: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model<IProfile>("Profile", profileSchema);

export default Profile;
