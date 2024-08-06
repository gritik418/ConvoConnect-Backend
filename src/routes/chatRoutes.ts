import { Router } from "express";
import authenticate from "../middlewares/authenticate.js";
import {
  createGroupChat,
  getChatById,
  getChats,
  updateGroupInfo,
} from "../controllers/chatControllers.js";
import { updateGroupIcon, uploadGroupIcon } from "../middlewares/multer.js";
import multer from "multer";

const router = Router();

router.get("/", authenticate, getChats);

router.get("/:id", authenticate, getChatById);

router.post("/create", authenticate, function (req, res) {
  uploadGroupIcon(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
    createGroupChat(req, res);
  });
});

router.patch("/update/:chatId", authenticate, function (req, res) {
  updateGroupIcon(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
    updateGroupInfo(req, res);
  });
});

export default router;
