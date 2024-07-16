import { Router } from "express";
import { userSignup } from "../controllers/userControllers.js";
const router = Router();
router.post("/signup", userSignup);
export default router;
