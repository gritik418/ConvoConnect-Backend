import { Request, Response } from "express";
import User from "../models/User.js";
import { UserType } from "../middlewares/authenticate.js";

const getUser = async (req: Request, res: Response) => {
  try {
    const userData = req.params.user as unknown as UserType;
    const userId = userData._id.toString();

    const user = await User.findById(userId)
      .select({
        name: 1,
        username: 1,
        email: 1,
        _id: 1,
        isActive: 1,
        avatar: 1,
        friends: 1,
        requests: 1,
      })
      .populate("requests", "_id email name username avatar");

    if (!user || !userData || !userId)
      return res.status(401).json({
        success: false,
        message: "Please Login.",
      });

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};

const getChatRequests = async (req: Request, res: Response) => {
  try {
    const userData = req.params.user as unknown as UserType;
    const userId = userData._id.toString();

    if (!userId)
      return res.status(401).json({
        success: false,
        message: "Please Login.",
      });

    const requests = await User.findById(userId)
      .select({ requests: 1 })
      .populate("requests", {
        name: 1,
        email: 1,
        avatar: 1,
        username: 1,
      });

    return res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};

export { getUser, getChatRequests };
