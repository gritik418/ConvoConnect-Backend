import { Router } from "express";
import authenticate from "../middlewares/authenticate.js";
import { getChats } from "../controllers/chatControllers.js";

const router = Router();

router.get("/", authenticate, getChats);

export default router;
