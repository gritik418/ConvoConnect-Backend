import { Request, Response } from "express";
import Message from "../models/Message.js";

export const getMessages = async (req: Request, res: Response) => {
  try {
    const chatId = req.params.id;

    const messages = await Message.find({ chat_id: chatId });

    return res.status(200).json({ success: true, data: messages });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};
