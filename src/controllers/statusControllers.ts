import { Request, Response } from "express";
import Status from "../models/Status.js";
import User from "../models/User.js";

export const getUserStatus = async (req: Request, res: Response) => {
  try {
    const user: any = req.params.user;

    const status = await Status.findOne({ user_id: user._id });

    return res.status(200).json({
      success: true,
      data: { status },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};

export const getFriendStatus = async (req: Request, res: Response) => {
  try {
    const user: any = req.params.user;

    const status = await User.findById(user._id)
      .select({ friends: 1, _id: 0 })
      .populate({
        path: "friends",
        model: "User",
        select: "status first_name last_name avatar username",
        populate: { path: "status", model: "Status" },
      });

    return res.status(200).json({
      success: true,
      data: status,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};

export const uploadUserStatus = async (req: any, res: Response) => {
  try {
    const user: any = req.params.user;
    const { content } = req.body;
    const imagesPath: string[] = [];

    await Status.findOneAndDelete({ user_id: user._id });

    if (req.files) {
      for (let index = 0; index < Number(req.files!.length); index++) {
        const path = `${
          process.env.DOMAIN
        }/uploads/${user._id.toString()}/status/${
          req.files[index].originalname
        }`;

        imagesPath.push(path);
      }
    }

    const newStatus = new Status({
      user_id: user._id,
      images: imagesPath,
      content: content || "",
    });

    const status = await newStatus.save();
    await User.findByIdAndUpdate(user._id, {
      $set: {
        status: newStatus._id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Status Uploaded.",
      status,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};

export const removeUserStatus = async (req: Request, res: Response) => {
  try {
    const user: any = req.params.user;

    const removedStatus = await Status.findOneAndDelete({ user_id: user._id });
    const my = await User.findByIdAndUpdate(
      user._id,
      {
        $unset: {
          status: removedStatus._id,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Status removed.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};
