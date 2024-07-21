import { Request, Response } from "express";
import Chat from "../models/Chat.js";

export const getChats = async (req: Request, res: Response) => {
  try {
    const user: any = req.params.user;

    const chats = await Chat.find({ members: { $eq: user._id } });

    return res.status(200).json({ success: true, data: { chats } });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};
