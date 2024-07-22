import { Router } from "express";
import authenticate from "../middlewares/authenticate.js";
import { getChatById, getChats } from "../controllers/chatControllers.js";
const router = Router();
router.get("/", authenticate, getChats);
router.get("/:id", authenticate, getChatById);
export default router;
