import { CCToken } from "../constants/variables.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies[CCToken];
        const userPayload = jwt.decode(token);
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
        }));
        if (!user)
            return res.status(401).json({
                success: false,
                message: "Please Login.",
            });
        req.params.user = user;
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error.",
        });
    }
};
export default authenticate;
