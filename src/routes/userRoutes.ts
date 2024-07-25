import { Router } from "express";
import {
  getUser,
  updateUser,
  userLogin,
  userSignup,
  verifyEmail,
} from "../controllers/userControllers.js";
import authenticate from "../middlewares/authenticate.js";
import uploadAvatar from "../middlewares/multer.js";
import multer from "multer";

const router = Router();

router.patch("/", authenticate, function (req, res) {
  uploadAvatar(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
    updateUser(req, res);
  });
});

router.get("/", authenticate, getUser);

router.get("/verify/:id/:secretToken", verifyEmail);

router.post("/signup", userSignup);

router.post("/login", userLogin);

export default router;
