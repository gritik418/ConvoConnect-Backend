import express from "express";
import authenticate from "../middlewares/authenticate.js";
import { getChatRequests, getUser } from "../controllers/user.js";
const router = express.Router();
router.get("/", authenticate, getUser);
router.get("/requests", authenticate, getChatRequests);
export default router;
