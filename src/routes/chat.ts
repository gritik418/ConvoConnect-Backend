import express from "express";
import authenticate from "../middlewares/authenticate.js";
import { createGroupChat, getChats } from "../controllers/chat.js";

const router = express.Router();

router.get("/", authenticate, getChats);

router.post("/create", authenticate, createGroupChat);

export default router;
