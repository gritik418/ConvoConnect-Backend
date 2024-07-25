import { Router } from "express";
import authenticate from "../middlewares/authenticate.js";
import { createGroupChat, getChatById, getChats, } from "../controllers/chatControllers.js";
import { uploadGroupIcon } from "../middlewares/multer.js";
import multer from "multer";
const router = Router();
router.get("/", authenticate, getChats);
router.get("/:id", authenticate, getChatById);
router.post("/create", authenticate, function (req, res) {
    uploadGroupIcon(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }
        createGroupChat(req, res);
    });
});
export default router;
