import mongoose, { Schema, model } from "mongoose";
const MessageSchema = new Schema({
    chat_id: {
        type: Schema.Types.ObjectId,
        ref: "Chat",
    },
    content: {
        type: String,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    attachment: { type: String },
}, {
    timestamps: true,
});
const Message = mongoose.models.Message || model("Message", MessageSchema);
export default Message;
