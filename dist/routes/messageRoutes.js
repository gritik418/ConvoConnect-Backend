import { Router } from "express";
import authenticate from "../middlewares/authenticate.js";
import { getMessages } from "../controllers/messageControllers.js";
const router = Router();
router.get("/:id", authenticate, getMessages);
export default router;
