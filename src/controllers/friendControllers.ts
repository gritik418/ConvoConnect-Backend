import { Request, Response } from "express";
import User from "../models/User.js";
import Chat from "../models/Chat.js";

export const getFriendRequests = async (req: Request, res: Response) => {
  try {
    const user: any = req.params.user;

    const data = await User.findById(user._id)
      .select({ friend_requests: 1, _id: 0 })
      .populate("friend_requests", {
        first_name: 1,
        last_name: 1,
        _id: 1,
        avatar: 1,
        username: 1,
      });

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};

export const sendFriendRequest = async (req: Request, res: Response) => {
  try {
    const user: any = req.params.user;
    const friendId: string = req.params.id;

    const friend = await User.findById(friendId).select({ _id: 1 });
    if (!friend)
      return res
        .status(400)
        .json({ success: false, message: "User not found." });

    await User.findByIdAndUpdate(friendId, {
      $push: {
        friend_requests: user._id,
      },
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
    const user: any = req.params.user;
    const friendId: string = req.params.id;

    const friend = await User.findById(friendId).select({ _id: 1 });
    if (!friend)
      return res
        .status(400)
        .json({ success: false, message: "User not found." });

    await User.findByIdAndUpdate(user._id, {
      $push: {
        friends: friendId,
      },
      $pull: {
        friend_requests: friendId,
      },
    });

    await User.findByIdAndUpdate(friendId, {
      $push: {
        friends: user._id,
      },
    });

    const newChat = new Chat({
      members: [friendId, user._id.toString()],
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
    const user: any = req.params.user;
    const friendId: string = req.params.id;

    await User.findByIdAndUpdate(user._id, {
      $pull: {
        friend_requests: friendId,
      },
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

export const getActiveFriends = async (req: Request, res: Response) => {
  try {
    const user: any = req.params.user;

    const { friends } = await User.findById(user?._id.toString())
      .select({ friends: 1, _id: 0 })
      .populate("friends", {
        is_active: 1,
        first_name: 1,
        last_name: 1,
        avatar: 1,
        username: 1,
      });

    const activeFriends = friends.filter((friend: { is_active: boolean }) => {
      return friend.is_active;
    });

    return res.status(200).json({ success: true, data: { activeFriends } });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};
