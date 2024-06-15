import { Request, Response } from "express";
import Chat from "../models/Chat.js";
import { UserType } from "../middlewares/authenticate.js";

const getChats = async (req: Request, res: Response) => {
  try {
    const userData = req.params.user as unknown as UserType;
    const userId = userData._id.toString();

    const chats = await Chat.find({ members: userId }).populate(
      "members",
      "name email username avatar isActive"
    );

    return res.status(200).json({ success: true, chats });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};

const createGroupChat = async (req: Request, res: Response) => {
  try {
    const {
      members,
      groupName,
      groupIcon,
    }: { members: string[]; groupName: string; groupIcon: string } = req.body;

    const userData = req.params.user as unknown as UserType;
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};

export { getChats, createGroupChat };
