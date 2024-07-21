import http from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import { corsOptions } from "../constants/options.js";
import { CC_TOKEN } from "../constants/variables.js";
import UserService from "../services/user.js";
import {
  ACTIVE_FRIENDS,
  NEW_MESSAGE,
  SEND_MESSAGE,
} from "../constants/events.js";
import Message from "../models/Message.js";
import { v4 as uuidv4 } from "uuid";

const socketMembers = new Map();

const socketServer = (
  httpServer: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
  >
) => {
  const io = new Server(httpServer, { cors: corsOptions });

  io.use((socket: any, next) => {
    cookieParser()(socket.request, socket.request.res, async (err) => {
      if (err) return new Error("Please Login.");
      const token = socket.request.cookies[CC_TOKEN];
      if (!token) return new Error("Please Login.");
      const verify: any = await UserService.verifyAuthToken(token);
      if (!verify) return new Error("Please Login.");
      const user = await UserService.getUserById(verify.id);
      if (!user) return new Error("Please Login.");
      socket.user = user;
      next();
    });
  });

  io.on("connection", async (socket: any) => {
    socketMembers.set(socket.user._id.toString(), socket.id);
    await UserService.setUserToActive(socket.user._id.toString());

    socket.user.friends.map((friend: string) => {
      if (!socketMembers.get(friend.toString())) return;
      return io.to(socketMembers.get(friend.toString())).emit(ACTIVE_FRIENDS, {
        id: socket.user._id.toString(),
      });
    });

    socket.on(
      SEND_MESSAGE,
      async ({
        message,
        selectedChat,
      }: {
        message: string;
        selectedChat: ChatType;
      }) => {
        const newMessage = new Message({
          chat_id: selectedChat._id,
          content: message,
          sender: socket.user._id.toString(),
        });

        const realTimeMessage = {
          _id: uuidv4().toString(),
          chat_id: selectedChat._id,
          content: message,
          sender: socket.user._id.toString(),
        };

        selectedChat.members.map((member: ChatMemberType) => {
          if (member._id.toString() === socket.user._id.toString()) return;
          if (!socketMembers.get(member._id.toString())) return;
          return io
            .to(socketMembers.get(member._id.toString()))
            .emit(NEW_MESSAGE, {
              chat: selectedChat,
              message: realTimeMessage,
            });
        });
        await newMessage.save();
      }
    );

    socket.on("disconnect", async () => {
      socketMembers.delete(socket.user._id.toString());
      await UserService.setUserToInActive(socket.user._id.toString());
    });
  });
};

export default socketServer;
