import express from "express";
import authenticate from "../middlewares/authenticate.js";
import { getMessages } from "../controllers/message.js";
const router = express.Router();
router.get("/:chatId", authenticate, getMessages);
export default router;
