import express from "express";
import connectToDB from "./database/mongoose.config.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import EventEmitter from "node:events";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import chatRoutes from "./routes/chat.js";
import friendRoutes from "./routes/friend.js";
import messageRoutes from "./routes/message.js";
import { corsOptions } from "./constants/options.js";
import {
  MESSAGE_RECEIVED,
  OFFLINE,
  ONLINE,
  SEND_MESSAGE,
  USER_OFFLINE,
  USER_ONLINE,
} from "./constants/events.js";
import User from "./models/User.js";
import { ChatType, MemberType, UserDataType } from "./types/types.js";
import { v4 as uuidv4 } from "uuid";
import Message from "./models/Message.js";

export const eventEmitter = new EventEmitter();

const port = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);
const socketMembers = new Map();

const io = new Server(server, {
  cors: corsOptions,
});

connectToDB();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/friend", friendRoutes);
app.use("/api/message", messageRoutes);

io.on("connection", (socket) => {
  socket.on(ONLINE, async ({ friends, id }) => {
    socketMembers.set(id, socket.id);
    await User.findByIdAndUpdate(id, { $set: { isActive: true } });
    if (!friends) return;

    friends.forEach((friend: string) => {
      socket.to(socketMembers.get(friend)).emit(USER_ONLINE, { id: id });
    });
  });

  socket.on(OFFLINE, async ({ friends, id }) => {
    socketMembers.delete(id);
    await User.findByIdAndUpdate(id, { $set: { isActive: false } });
    if (!friends) return;

    friends.forEach((friend: string) => {
      socket.to(socketMembers.get(friend)).emit(USER_OFFLINE, { id: id });
    });
  });

  socket.on(
    SEND_MESSAGE,
    async ({
      chat,
      message,
      user,
    }: {
      chat: ChatType;
      message: string;
      user: UserDataType;
    }) => {
      const realTimeMessage = {
        _id: uuidv4(),
        chatId: chat._id,
        content: message,
        sender: { _id: user._id, name: user.name, avatar: user.avatar },
        // attachment: ,
        updatedAt: Date.now(),
      };

      const dbMessage = new Message({
        chatId: chat._id,
        content: message,
        sender: user._id,
        // attachment: { type: String },
      });

      await dbMessage.save();

      chat.members.map((member: MemberType) => {
        if (member._id === user._id) return;
        socket.to(socketMembers.get(member._id)).emit(MESSAGE_RECEIVED, {
          chatId: chat._id,
          message: realTimeMessage,
          sender: { _id: user._id, name: user.name, avatar: user.avatar },
        });
      });
    }
  );
});

server.listen(port, () => {
  console.log(`App served at: http://localhost:${port}`);
});
