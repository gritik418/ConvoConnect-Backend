import Chat from "../models/Chat.js";
const getChats = async (req, res) => {
    try {
        const userData = req.params.user;
        const userId = userData._id.toString();
        const chats = await Chat.find({ members: userId }).populate("members", "name email username avatar");
        return res.status(200).json({ success: true, chats });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error.",
        });
    }
};
const createGroupChat = async (req, res) => {
    try {
        const { members, groupName, groupIcon, } = req.body;
        const userData = req.params.user;
        const userId = userData._id.toString();
        if (members.length < 2)
            return res.status(400).json({
                success: false,
                message: "Minimum 2 members are required.",
            });
        const newGroupChat = new Chat({
            isGroupChat: true,
            groupName,
            groupIcon,
            admins: [userId],
            members: [userId, ...members],
        });
        await newGroupChat.save();
        return res.status(200).json({
            success: true,
            message: "Group Created.",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error.",
        });
    }
};
export { getChats, createGroupChat };
