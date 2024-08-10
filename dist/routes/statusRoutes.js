import { Router } from "express";
import { uploadStatus } from "../middlewares/multer.js";
import authenticate from "../middlewares/authenticate.js";
import multer from "multer";
import { getFriendStatus, getUserStatus, removeUserStatus, uploadUserStatus, } from "../controllers/statusControllers.js";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const router = Router();
router.get("/", authenticate, getUserStatus);
router.get("/friends", authenticate, getFriendStatus);
router.post("/upload", authenticate, function (req, res) {
    const destinationPath = path.join(__dirname, "../../public/uploads/", req.params.user._id.toString(), "/status");
    fs.rmSync(destinationPath, { recursive: true, force: true });
    uploadStatus(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }
        uploadUserStatus(req, res);
    });
});
router.delete("/remove", authenticate, removeUserStatus);
export default router;
