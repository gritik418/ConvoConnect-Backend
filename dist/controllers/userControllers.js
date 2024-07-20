import signupSchema from "../validators/signupValidator.js";
import vine, { errors } from "@vinejs/vine";
import UserService from "../services/user.js";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";
import EmailVerification from "../models/EmailVerification.js";
import { v4 as uuidv4 } from "uuid";
import { ErrorReporter } from "../validators/ErrorReporter.js";
import loginSchema from "../validators/loginValidator.js";
import bcrypt from "bcryptjs";
import { CC_TOKEN } from "../constants/variables.js";
import { cookieOptions } from "../constants/options.js";
import verificationSchema from "../validators/verificationValidator.js";
vine.errorReporter = () => new ErrorReporter();
// Design Email Verification Template and also email subject
export const userSignup = async (req, res) => {
    try {
        const data = req.body;
        const output = await vine.validate({
            data,
            schema: signupSchema,
        });
        const checkExisting = await UserService.getUserByEmail(output.email);
        if (checkExisting)
            return res.status(401).json({
                success: false,
                message: "Email already exists.",
            });
        const checkExistingUsername = await UserService.getUserByUsername(output.username);
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
            subject: "Verify your email address.",
            html: `Any ${secretToken} <br/>
        <a href=${"http://localhost:3000"}/verify/${savedUser._id.toString()}/${secretToken}>Verify</a>
        `,
            text: "Verify your email address to continue with ConvoConnect.",
        });
        return res.status(201).json({
            success: true,
            message: "Email Sent.",
            email: output.email,
        });
    }
    catch (error) {
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
export const userLogin = async (req, res) => {
    try {
        const userData = req.body;
        const output = await vine.validate({
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
        });
    }
    catch (error) {
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
export const verifyEmail = async (req, res) => {
    try {
        const { secretToken, id } = req.params;
        const output = await vine.validate({
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
        const verify = await bcrypt.compare(output.secret_token, verification.secret_token);
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
        });
    }
    catch (error) {
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
