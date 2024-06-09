import { Request, Response } from "express";
import User, { JWTPayloadType } from "../models/User.js";
import bcrypt from "bcryptjs";
import { cookieOptions } from "../constants/options.js";
import { CCToken } from "../constants/variables.js";

// validation and otp pending
const userSignup = async (req: Request, res: Response) => {
  try {
    const { name, username, email, password, password_confirmation } = req.body;

    const checkExisting = await User.findOne({ email, email_verified: true });

    if (checkExisting)
      return res.status(401).json({
        success: false,
        message: "Account already exists.",
      });

    const checkUsername = await User.findOne({ username });

    if (checkUsername)
      return res.status(401).json({
        success: false,
        message: "Username already taken.",
      });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });

    await user.save();

    return res.status(201).json({ success: true, message: "OTP Sent." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};

// validation pending
const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: email }, { username: email }],
    }).select({
      password: 1,
      email: 1,
      username: 1,
      email_verified: 1,
      provider: 1,
    });

    if (!user || !user.email_verified)
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials.",
      });

    if (user.provider !== "credentials")
      return res.status(401).json({
        success: false,
        message: "You previously logged in with Google.",
      });

    const verify = await bcrypt.compare(password, user.password);

    if (!verify)
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials.",
      });

    const payload: JWTPayloadType = {
      _id: user._id,
    };

    const token = await user.generateAuthToken(payload);

    return res.status(200).cookie(CCToken, token, cookieOptions).json({
      success: true,
      message: "Logged in successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};

export { userLogin, userSignup };
