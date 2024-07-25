import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const avatarStorage = multer.diskStorage({
  destination: async function (req: { params: any }, file, cb) {
    const userId = req.params.user._id.toString();

    if (file.fieldname === "avatar") {
      const destinationPath = path.join(
        __dirname,
        "../../public/uploads/",
        userId,
        "/avatar"
      );
      fs.rmSync(destinationPath, { recursive: true, force: true });
      fs.mkdirSync(destinationPath, { recursive: true });
      cb(null, destinationPath);
    }

    if (file.fieldname === "background") {
      const destinationPath = path.join(
        __dirname,
        "../../public/uploads/",
        userId,
        "/background"
      );
      fs.rmSync(destinationPath, { recursive: true, force: true });
      fs.mkdirSync(destinationPath, { recursive: true });
      cb(null, destinationPath);
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  limits: { fileSize: 1000000 },
  storage: avatarStorage,
}).fields([
  { name: "avatar", maxCount: 1 },
  { name: "background", maxCount: 1 },
]);

export default upload;
