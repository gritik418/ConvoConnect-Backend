import mongoose, { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";

export type JWTPayloadType = {
  _id: string;
};

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    provider: {
      type: String,
      default: "credentials",
      enum: ["credentials", "google"],
    },
    password: {
      type: String,
      select: false,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    requests: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.generateAuthToken = async function (
  payload: JWTPayloadType
) {
  const token = jwt.sign(payload, process.env.JWT_SECRET!);
  return token;
};

const User = mongoose.models.User || model("User", UserSchema);

export default User;
