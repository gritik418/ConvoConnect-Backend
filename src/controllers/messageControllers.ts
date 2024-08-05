import { Request, Response } from "express";
import Message from "../models/Message.js";

export const getMessages = async (req: Request, res: Response) => {
  try {
    const chatId = req.params.id;

    const rawMessages: any = await Message.find({ chat_id: chatId }).populate(
      "sender",
      {
        first_name: 1,
        last_name: 1,
        _id: 1,
        avatar: 1,
        background: 1,
        username: 1,
        email: 1,
        bio: 1,
      }
    );

    const messages: any = {};

    for (const message of rawMessages) {
      messages[message._id] = message;
    }

    return res.status(200).json({ success: true, data: messages });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};
