import { CC_TOKEN } from "../constants/variables.js";
import UserService from "../services/user.js";
const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies[CC_TOKEN];
        if (!token)
            return res.status(401).json({
                success: false,
                message: "Please Login.",
            });
        const verify = await UserService.verifyAuthToken(token);
        if (!verify)
            return res.status(401).json({
                success: false,
                message: "Please Login.",
            });
        const user = await UserService.getUserById(verify.id);
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
