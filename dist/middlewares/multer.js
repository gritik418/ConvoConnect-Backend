import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const avatarStorage = multer.diskStorage({
    destination: async function (req, file, cb) {
        const userId = req.params.user._id.toString();
        const destinationPath = path.join(__dirname, "../../public/uploads/", userId, "avatar");
        fs.rmSync(destinationPath, { recursive: true, force: true });
        fs.mkdirSync(destinationPath, { recursive: true });
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({
    limits: { fileSize: 1000000, files: 1 },
    storage: avatarStorage,
}).single("avatar");
export default upload;
