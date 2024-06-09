import User from "../models/User.js";
const createChatRequest = async (req, res) => {
    try {
        const { receiverId } = req.body;
        const userData = req.params.user;
        const userId = userData._id;
        const user = await User.findById(userId);
        if (!user)
            return res.status(401).json({
                success: false,
                message: "Please Login.",
            });
        const receiver = await User.findById(receiverId);
        if (!receiver || !receiver.email_verified)
            return res.status(400).json({
                success: false,
                message: "User not exists.",
            });
        await User.findByIdAndUpdate(receiver._id, {
            $push: { requests: userId },
        });
        return res.status(200).json({
            success: true,
            message: "Request Sent.",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error.",
        });
    }
};
export { createChatRequest };
