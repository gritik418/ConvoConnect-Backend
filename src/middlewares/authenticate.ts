import { NextFunction, Request, Response } from "express";
import { CCToken } from "../constants/variables.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWTPayloadType } from "../models/User.js";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies[CCToken];
    const user: JWTPayloadType = jwt.decode(token) as JWTPayloadType;

    if (!user || !user._id)
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
