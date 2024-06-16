import Message from "../models/Message.js";
export const getMessages = async (req, res) => {
    try {
        const { chatId } = req.params;
        if (!chatId)
            return res.status(400).json({
                success: false,
                message: "Chat Id is required.",
            });
        const messages = await Message.find({ chatId }).populate("sender", "name avatar _id");
        return res.status(200).json({ success: true, messages });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error.",
        });
    }
};
