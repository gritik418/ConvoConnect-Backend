import { Router } from "express";
import {
  userLogin,
  userSignup,
  verifyEmail,
} from "../controllers/userControllers.js";

const router = Router();

router.get("/verify/:id/:secretToken", verifyEmail);
router.post("/signup", userSignup);
router.post("/login", userLogin);

export default router;
