import express from "express";
import authenticate from "../middlewares/authenticate.js";
import { createChatRequest } from "../controllers/chat.js";

const router = express.Router();

router.patch("/request", authenticate, createChatRequest);

export default router;
