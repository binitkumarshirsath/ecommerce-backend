import mongoose, { Document } from "mongoose";

interface IAddress extends Document {
  address: string;
  city: string;
  state: string;
  pincode: number;
}

const addressSchema = new mongoose.Schema<IAddress>(
  {
    address: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Address = mongoose.model("Address", addressSchema);

export default Address;
