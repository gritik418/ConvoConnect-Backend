import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {
  acceptChatRequest,
  createChatRequest,
  declineChatRequest,
  getChats,
} from "../controllers/chat.js";

const router = express.Router();

router.get("/", authenticate, getChats);

router.patch("/request", authenticate, createChatRequest);

router.patch("/decline/:senderId", authenticate, acceptChatRequest);

router.patch("/accept/:senderId", authenticate, declineChatRequest);

export default router;
