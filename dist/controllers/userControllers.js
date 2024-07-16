import signupSchema from "../validators/signupValidator.js";
import vine, { errors } from "@vinejs/vine";
import UserService from "../services/user.js";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";
import EmailVerification from "../models/EmailVerification.js";
import { v4 as uuidv4 } from "uuid";
import { ErrorReporter } from "../validators/ErrorReporter.js";
import loginSchema from "../validators/loginValidator.js";
vine.errorReporter = () => new ErrorReporter();
// Design Email Verification Template
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
            html: `Any ${secretToken}`,
            text: "Verify your email address to continue with ConvoConnect.",
        });
        return res.status(201).json({
            success: true,
            message: "Email Sent.",
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
// Pending
export const userLogin = async (req, res) => {
    try {
        const userData = req.body;
        const output = await vine.validate({
            data: userData,
            schema: loginSchema,
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
// Pending
export const verifyEmail = async (req, res) => {
    try {
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
