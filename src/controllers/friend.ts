import { Request, Response } from "express";
import User from "../models/User.js";
import { UserType } from "../middlewares/authenticate.js";
import Chat from "../models/Chat.js";

export const searchUsers = async (req: Request, res: Response) => {
  try {
    const userData = req.params.user as unknown as UserType;
    const userId = userData._id.toString();

    const searchQuery = req.query.search;

    const existingFriends = await User.findById(userId).select({ friends: 1 });

    const allUsers = await User.find({
      _id: { $ne: userId },
      email_verified: true,
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { username: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } },
      ],
    }).select({ name: 1, email: 1, username: 1, avatar: 1 });

    const users = allUsers.filter((user) => {
      return !existingFriends.friends.includes(user._id);
    });

    return res.status(200).json({ success: true, users });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};

export const sendFriendRequest = async (req: Request, res: Response) => {
  try {
    const { receiverId } = req.body;
    const userData = req.params.user as unknown as UserType;
    const userId = userData._id.toString();

    if (!receiverId)
      return res.status(400).json({
        success: false,
        message: "Receiver Id is required.",
      });

    const receiver = await User.findById(receiverId);

    if (!receiver)
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });

    const checkExistingRequest = await User.findOne({
      _id: receiver._id,
      requests: userId,
    });

    if (checkExistingRequest)
      return res.status(200).json({
        success: true,
        message: "Friend Request Sent.",
      });

    await User.findByIdAndUpdate(receiver._id, {
      $push: { requests: userId },
    });

    return res.status(200).json({
      success: true,
      message: "Friend Request Sent.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};

export const acceptFriendRequest = async (req: Request, res: Response) => {
  try {
    const { senderId } = req.params;
    const userData = req.params.user as unknown as UserType;
    const userId = userData._id.toString();

    if (!senderId)
      return res.status(400).json({
        success: false,
        message: "Sender Id is required.",
      });

    const sender = await User.findById(senderId);

    if (!sender)
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });

    await User.findByIdAndUpdate(userId, {
      $pull: { requests: senderId },
      $push: { friends: senderId },
    });

    await User.findByIdAndUpdate(senderId, {
      $push: { friends: userId },
    });

    const newChat = new Chat({
      members: [userId, senderId],
    });

    await newChat.save();

    return res.status(200).json({
      success: true,
      message: "Friend Request Accepted.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};

export const declineFriendRequest = async (req: Request, res: Response) => {
  try {
    const { senderId } = req.params;
    const userData = req.params.user as unknown as UserType;
    const userId = userData._id.toString();

    if (!senderId)
      return res.status(400).json({
        success: false,
        message: "Sender Id is required.",
      });

    const sender = await User.findById(senderId);

    if (!sender)
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });

    await User.findByIdAndUpdate(userId, {
      $pull: { requests: senderId },
    });

    return res.status(200).json({
      success: true,
      message: "Friend Request Declined.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};
