import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    auth0Id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      //   required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    addressLine1: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
export default User;
