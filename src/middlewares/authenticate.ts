import { NextFunction, Request, Response } from "express";
import { CC_TOKEN } from "../constants/variables.js";
import UserService from "../services/user.js";
import User from "../models/User.js";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies[CC_TOKEN];
    if (!token)
      return res.status(401).json({
        success: false,
        message: "Please Login.",
      });

    const verify: any = await UserService.verifyAuthToken(token);
    if (!verify)
      return res.status(401).json({
        success: false,
        message: "Please Login.",
      });

    const user = await User.findById(verify.id).select({ password: 0 });
    if (!user)
      return res.status(401).json({
        success: false,
        message: "Please Login.",
      });

    req.params.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};

export default authenticate;
