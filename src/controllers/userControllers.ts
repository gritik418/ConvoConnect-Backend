import { Request, Response } from "express";
import signupSchema, { SignUpDataType } from "../validators/signupValidator.js";
import vine, { errors } from "@vinejs/vine";
import UserService from "../services/user.js";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";
import EmailVerification from "../models/EmailVerification.js";
import { v4 as uuidv4 } from "uuid";
import { ErrorReporter } from "../validators/ErrorReporter.js";
import loginSchema, { LoginDataType } from "../validators/loginValidator.js";
import bcrypt from "bcryptjs";
import { CC_TOKEN } from "../constants/variables.js";
import { cookieOptions } from "../constants/options.js";
import verificationSchema, {
  VerificationDataType,
} from "../validators/verificationValidator.js";
import verificationTemplate from "../utils/verificationTemplate.js";

vine.errorReporter = () => new ErrorReporter();

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user: any = req.params.user;
    const data = req.body;

    var updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          ...data,
        },
      },
      { new: true }
    );

    if (req.files) {
      const files = req.files as any;
      if (files.avatar) {
        const avatar = `${
          process.env.DOMAIN
        }/uploads/${user._id.toString()}/avatar/${
          files.avatar[0].originalname
        }`;

        updatedUser = await User.findByIdAndUpdate(
          user._id,
          {
            $set: {
              avatar,
            },
          },
          { new: true }
        );
      }
      if (files.background) {
        const background = `${
          process.env.DOMAIN
        }/uploads/${user._id.toString()}/background/${
          files.background[0].originalname
        }`;

        updatedUser = await User.findByIdAndUpdate(
          user._id,
          {
            $set: {
              background,
            },
          },
          { new: true }
        );
      }
    }

    return res.status(200).json({
      success: true,
      data: updatedUser,
      message: "Details Updated.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user: any = req.params.user;

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};

export const userSignup = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const output: SignUpDataType = await vine.validate({
      data,
      schema: signupSchema,
    });

    const checkExisting = await UserService.getUserByEmail(output.email);
    if (checkExisting)
      return res.status(401).json({
        success: false,
        message: "Email already exists.",
      });

    const checkExistingUsername = await UserService.getUserByUsername(
      output.username
    );
    if (checkExistingUsername) {
      if (checkExistingUsername.email_verified === true) {
        return res.status(401).json({
          success: false,
          message: "Username already taken.",
        });
      }
      await UserService.deleteUserByUsername(output.username);
    }

    const hashedPassword = await UserService.hashPassword(output.password);
    const newUser = new User({
      first_name: output.first_name,
      last_name: output.last_name || "",
      email: output.email,
      username: output.username,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    const secretToken = uuidv4();

    const emailVerification = new EmailVerification({
      secret_token: secretToken,
      user_id: savedUser._id,
    });
    await emailVerification.save();

    await sendEmail({
      from: "convoconnect@gmail.com",
      to: output.email,
      subject: "Verify your email address to continue with ConvoConnect.",
      html: verificationTemplate(
        `${
          process.env.CLIENT_URL
        }/verify/${savedUser._id.toString()}/${secretToken}`
      ),
      text: `Verify your email address to continue with ConvoConnect.\n Visit: ${
        process.env.CLIENT_URL
      }/verify/${savedUser._id.toString()}/${secretToken} to verify your email.`,
    });

    return res.status(201).json({
      success: true,
      message: "Email Sent.",
      email: output.email,
    });
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return res.status(400).json({
        success: false,
        message: "Validation Error.",
        errors: error.messages,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const output: LoginDataType = await vine.validate({
      data: userData,
      schema: loginSchema,
    });

    const user = await UserService.getUserByEmailOrUsername(output.email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials.",
      });
    }

    if (user && user.email_verified === false) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials.",
      });
    }

    if (user.provider === "google") {
      return res.status(401).json({
        success: false,
        message: "Previously Logged in with Google.",
      });
    }
    const verify = await bcrypt.compare(output.password, user.password);
    if (!verify) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials.",
      });
    }

    const token = await UserService.generateAuthToken({
      email: user.email,
      id: user._id.toString(),
    });

    return res.status(200).cookie(CC_TOKEN, token, cookieOptions).json({
      success: true,
      message: "Logged In Successfully.",
      token: token,
    });
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return res.status(400).json({
        success: false,
        message: "Validation Error.",
        errors: error.messages,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { secretToken, id } = req.params;
    const output: VerificationDataType = await vine.validate({
      data: { secret_token: secretToken, id },
      schema: verificationSchema,
    });

    const user = await UserService.getUserById(output.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid User.",
      });
    }

    const verification = await EmailVerification.findOne({
      user_id: output.id,
    });
    if (!verification) {
      return res.status(401).json({
        success: false,
        message: "Link Expired.",
      });
    }

    const verify = await bcrypt.compare(
      output.secret_token,
      verification.secret_token
    );
    if (!verify) {
      return res.status(401).json({
        success: false,
        message: "Verification Failed.",
      });
    }

    await User.findByIdAndUpdate(output.id, {
      $set: { email_verified: true },
    });
    await EmailVerification.findByIdAndDelete(verification._id.toString());

    const token = await UserService.generateAuthToken({
      email: user.email,
      id: user._id.toString(),
    });

    return res.status(200).cookie(CC_TOKEN, token, cookieOptions).json({
      success: true,
      message: "Email verified Successfully.",
      token,
    });
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return res.status(400).json({
        success: false,
        message: "Validation Error.",
        errors: error.messages,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};

export const userLogout = async (req: Request, res: Response) => {
  try {
    res.status(200).clearCookie(CC_TOKEN, cookieOptions).json({
      success: true,
      message: "Logged out Successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};
