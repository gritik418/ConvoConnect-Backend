import Chat from "../models/Chat.js";
import vine, { errors } from "@vinejs/vine";
import groupSchema from "../validators/groupValidator.js";
import { ErrorReporter } from "../validators/ErrorReporter.js";
import { socketEventEmitter } from "../sockets/socketServer.js";
import { SOCKET_EMIT_NEW_GROUP } from "../constants/events.js";
vine.errorReporter = () => new ErrorReporter();
export const getChats = async (req, res) => {
    try {
        const user = req.params.user;
        const rawChats = await Chat.find({ members: { $eq: user._id } })
            .populate("members", {
            first_name: 1,
            last_name: 1,
            avatar: 1,
            username: 1,
            email: 1,
            bio: 1,
            background: 1,
        })
            .populate("admins", {
            first_name: 1,
            last_name: 1,
            email: 1,
            bio: 1,
            avatar: 1,
            username: 1,
            background: 1,
        })
            .populate("last_message");
        const chats = {};
        for (const chat of rawChats) {
            chats[chat._id] = chat;
        }
        return res.status(200).json({ success: true, data: { chats } });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error.",
        });
    }
};
export const getChatById = async (req, res) => {
    try {
        const chatId = req.params.id;
        const chat = await Chat.findById(chatId)
            .populate("members", {
            first_name: 1,
            last_name: 1,
            avatar: 1,
            username: 1,
            background: 1,
            email: 1,
            bio: 1,
        })
            .populate("admins", {
            first_name: 1,
            last_name: 1,
            avatar: 1,
            username: 1,
            background: 1,
            email: 1,
            bio: 1,
        });
        return res.status(200).json({
            success: true,
            data: chat,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error.",
        });
    }
};
export const createGroupChat = async (req, res) => {
    try {
        const user = req.params.user;
        const data = req.body;
        const output = await vine.validate({
            data: {
                group_name: data.group_name,
                members: data.members,
            },
            schema: groupSchema,
        });
        let group_icon = "";
        if (req.file && req.params.chatId) {
            group_icon = `${process.env.DOMAIN}/uploads/${req.params.chatId}/icon/${req.file.originalname}`;
        }
        const newGroup = new Chat({
            is_group_chat: true,
            group_name: output.group_name,
            group_description: data.group_description || "",
            group_icon,
            admins: [user._id],
            members: [user._id, ...output.members],
        });
        await newGroup.save();
        socketEventEmitter.emit(SOCKET_EMIT_NEW_GROUP, {
            group: newGroup,
            user: user._id,
        });
        return res.status(200).json({
            success: true,
            message: "Group Created.",
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
export const updateGroupInfo = async (req, res) => {
    try {
        const user = req.params.user;
        const data = req.body;
        const chat = await Chat.findById(req.params.chatId);
        if (!chat) {
            return res.status(400).json({
                success: false,
                message: "Invalid Chat Id.",
            });
        }
        const chatIds = chat.admins.map((admin) => admin._id.toString());
        if (!chatIds.includes(user._id.toString())) {
            return res.status(401).json({
                success: false,
                message: "Only Admin can update.",
            });
        }
        if (req.file && req.params.chatId) {
            const group_icon = `${process.env.DOMAIN}/uploads/${req.params.chatId}/icon/${req.file.originalname}`;
            await Chat.findByIdAndUpdate(chat._id, {
                $set: {
                    group_icon,
                },
            });
        }
        await Chat.findByIdAndUpdate(chat._id, {
            $set: {
                group_name: data.group_name,
                group_description: data.group_description,
            },
        });
        return res.status(200).json({
            success: true,
            message: "Group info updated.",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error.",
        });
    }
};
