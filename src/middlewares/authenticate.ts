import { NextFunction, Request, Response } from "express";
import { CCToken } from "../constants/variables.js";
import jwt, { JwtPayload } from "jsonwebtoken";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies[CCToken];
    const user = jwt.decode(token) as any;
    console.log(user);
    req.params.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};

export default authenticate;
