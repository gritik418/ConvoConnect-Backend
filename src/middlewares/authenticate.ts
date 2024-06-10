import { NextFunction, Request, Response } from "express";
import { CCToken } from "../constants/variables.js";
import jwt from "jsonwebtoken";
import User, { JWTPayloadType } from "../models/User.js";

export type UserType = {
  _id: string;
  name: string;
  email: string;
  username: string;
  avatar: string;
};

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies[CCToken];
    const userPayload: JWTPayloadType = jwt.decode(token) as JWTPayloadType;

    if (!userPayload || !userPayload._id)
      return res.status(401).json({
        success: false,
        message: "Please Login.",
      });

    const user = (await User.findById(userPayload._id).select({
      name: 1,
      username: 1,
      email: 1,
      avatar: 1,
    })) as UserType | null;

    if (!user)
      return res.status(401).json({
        success: false,
        message: "Please Login.",
      });

    req.params.user = user as unknown as string;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};

export default authenticate;
