import { Request, Response } from "express";
import Chat from "../models/Chat.js";

export const getChats = async (req: Request, res: Response) => {
  try {
    const user: any = req.params.user;

    const chats = await Chat.find({ members: { $eq: user._id } })
      .populate("members", {
        first_name: 1,
        last_name: 1,
        avatar: 1,
        username: 1,
      })
      .populate("admins", {
        first_name: 1,
        last_name: 1,
        avatar: 1,
        username: 1,
      })
      .populate("last_message");

    return res.status(200).json({ success: true, data: { chats } });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};

export const getChatById = async (req: Request, res: Response) => {
  try {
    const chatId = req.params.id;

    const chat = await Chat.findById(chatId)
      .populate("members", {
        first_name: 1,
        last_name: 1,
        avatar: 1,
        username: 1,
      })
      .populate("admins", {
        first_name: 1,
        last_name: 1,
        avatar: 1,
        username: 1,
      });

    return res.status(200).json({
      success: true,
      data: chat,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};
