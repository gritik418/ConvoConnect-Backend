import mongoose, { Schema, model } from "mongoose";
const ChatSchema = new Schema({
    isGroupChat: {
        type: Boolean,
        default: false,
    },
    groupName: {
        type: String,
    },
    groupIcon: {
        type: String,
    },
    admins: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    ],
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: "Message",
    },
}, {
    timestamps: true,
});
const Chat = mongoose.models.Chat || model("Chat", ChatSchema);
export default Chat;
