import { Request, Response } from "express";
import Chat from "../models/Chat.js";
import vine, { errors } from "@vinejs/vine";
import groupSchema, { GroupDataType } from "../validators/groupValidator.js";
import { ErrorReporter } from "../validators/ErrorReporter.js";

vine.errorReporter = () => new ErrorReporter();

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

export const createGroupChat = async (req: Request, res: Response) => {
  try {
    const user: any = req.params.user;
    const data = req.body;

    const output: GroupDataType = await vine.validate({
      data: {
        group_name: data.group_name,
        members: data.members,
      },
      schema: groupSchema,
    });

    let group_icon = "";

    if (req.file && req.params.chatId) {
      group_icon = `${process.env.DOMAIN}/uploads/${req.params.chatId}/icon/${req.file.originalname}`;
    }

    const newGroup = new Chat({
      is_group_chat: true,
      group_name: output.group_name,
      group_description: data.group_description || "",
      group_icon,
      admins: [user._id],
      members: [user._id, ...output.members],
    });

    await newGroup.save();

    return res.status(200).json({
      success: true,
      message: "Group Created.",
    });
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return res.status(400).json({
        success: false,
        message: "Validation Error.",
        errors: error.messages,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};
