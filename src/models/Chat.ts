import mongoose, { Schema, model } from "mongoose";

const ChatSchema = new Schema(
  {
    is_group_chat: {
      type: Boolean,
      default: false,
    },
    group_name: {
      type: String,
    },
    group_description: {
      type: String,
    },
    group_icon: {
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
    last_message: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.models.Chat || model("Chat", ChatSchema);

export default Chat;
