import { CCToken } from "../constants/variables.js";
import jwt from "jsonwebtoken";
const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies[CCToken];
        const user = jwt.decode(token);
        console.log(user);
        req.params.user = user;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error.",
        });
    }
};
export default authenticate;
