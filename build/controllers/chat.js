import User from "../models/User.js";
import Chat from "../models/Chat.js";
const getChats = async (req, res) => {
    try {
        const userData = req.params.user;
        const userId = userData._id.toString();
        const chats = await Chat.find({ members: userId });
        return res.status(200).json({ chats });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error.",
        });
    }
};
const createChatRequest = async (req, res) => {
    try {
        const { receiverId } = req.body;
        const userData = req.params.user;
        const userId = userData._id.toString();
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
const acceptChatRequest = async (req, res) => {
    try {
        const senderId = req.params.senderId;
        const userData = req.params.user;
        const userId = userData._id.toString();
        const sender = await User.findById(senderId);
        if (!sender)
            return res.status(400).json({
                success: false,
                message: "Invalid request.",
            });
        const newChat = new Chat({
            members: [senderId, userId],
        });
        await newChat.save();
        await User.findByIdAndUpdate(userId, {
            $pull: { requests: senderId },
        });
        return res.status(200).json({
            success: true,
            message: "Chat Request Accepted.",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error.",
        });
    }
};
const declineChatRequest = async (req, res) => {
    try {
        const senderId = req.params.senderId;
        const userData = req.params.user;
        const userId = userData._id.toString();
        const sender = await User.findById(senderId);
        if (!sender)
            return res.status(400).json({
                success: false,
                message: "Invalid request.",
            });
        await User.findByIdAndUpdate(userId, {
            $pull: { requests: senderId },
        });
        return res.status(200).json({
            success: true,
            message: "Chat Request Declined.",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error.",
        });
    }
};
export { createChatRequest, acceptChatRequest, getChats, declineChatRequest };
