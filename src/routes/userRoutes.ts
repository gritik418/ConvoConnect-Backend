import { Router } from "express";
import {
  getUser,
  userLogin,
  userSignup,
  verifyEmail,
} from "../controllers/userControllers.js";
import authenticate from "../middlewares/authenticate.js";

const router = Router();

router.get("/", authenticate, getUser);

router.get("/verify/:id/:secretToken", verifyEmail);

router.post("/signup", userSignup);

router.post("/login", userLogin);

export default router;
