import User from "../models/User.js";
const getUser = async (req, res) => {
    try {
        const userData = req.params.user;
        const userId = userData._id.toString();
        const user = await User.findById(userId).select({
            name: 1,
            username: 1,
            email: 1,
            _id: 1,
            avatar: 1,
        });
        if (!user || !userData || !userId)
            return res.status(401).json({
                success: false,
                message: "Please Login.",
            });
        return res.status(200).json({
            success: true,
            user,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error.",
        });
    }
};
const getChatRequests = async (req, res) => {
    try {
        const userData = req.params.user;
        const userId = userData._id.toString();
        if (!userId)
            return res.status(401).json({
                success: false,
                message: "Please Login.",
            });
        const requests = await User.findById(userId)
            .select({ requests: 1 })
            .populate("requests", {
            name: 1,
            email: 1,
            avatar: 1,
            username: 1,
        });
        return res.status(200).json({
            success: true,
            requests,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error.",
        });
    }
};
export { getUser, getChatRequests };
