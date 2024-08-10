import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import Chat from "../models/Chat.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const avatarStorage = multer.diskStorage({
  destination: async function (req: { params: any }, file, cb) {
    const userId = req.params.user._id.toString();
    if (!file) return cb(new Error("No File"), "");

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

const groupIconStorage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const chatId = uuidv4();
    req.params.chatId = chatId;

    const destinationPath = path.join(
      __dirname,
      "../../public/uploads/",
      chatId,
      "/icon"
    );
    fs.rmSync(destinationPath, { recursive: true, force: true });
    fs.mkdirSync(destinationPath, { recursive: true });
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const updateGroupIconStorage = multer.diskStorage({
  destination: async function (req: { params: any }, file, cb) {
    const chat: ChatType | null = await Chat.findById(req.params.chatId);
    if (!chat) {
      return cb(new Error("No File."), "");
    }

    const chatIds: string[] = chat.admins.map((admin: ChatAdminType) =>
      admin._id.toString()
    );

    if (!chatIds.includes(req.params.user._id.toString())) {
      return cb(new Error("Only admin can update."), "");
    }

    const destinationPath = path.join(
      __dirname,
      "../../public/uploads/",
      chat._id.toString(),
      "/icon"
    );
    fs.rmSync(destinationPath, { recursive: true, force: true });
    fs.mkdirSync(destinationPath, { recursive: true });
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const statusStorage = multer.diskStorage({
  destination: async function (req: { params: any }, file, cb) {
    const userId = req.params.user._id.toString();
    if (!file) return cb(new Error("No File"), "");

    const destinationPath = path.join(
      __dirname,
      "../../public/uploads/",
      userId,
      "/status"
    );
    fs.mkdirSync(destinationPath, { recursive: true });
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const uploadGroupIcon = multer({
  limits: { fileSize: 1000000 },
  storage: groupIconStorage,
}).single("group_icon");

export const updateGroupIcon = multer({
  limits: { fileSize: 1000000 },
  storage: updateGroupIconStorage,
}).single("group_icon");

export const uploadStatus = multer({
  limits: { fileSize: 1000000 },
  storage: statusStorage,
}).array("images", 4);

const upload = multer({
  limits: { fileSize: 1000000 },
  storage: avatarStorage,
}).fields([
  { name: "avatar", maxCount: 1 },
  { name: "background", maxCount: 1 },
]);

export default upload;
