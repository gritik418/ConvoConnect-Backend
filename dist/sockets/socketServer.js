import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import { corsOptions } from "../constants/options.js";
import { CC_TOKEN } from "../constants/variables.js";
import UserService from "../services/user.js";
import { ACTIVE_FRIENDS, NEW_MESSAGE, OFFLINE_FRIEND, SEND_MESSAGE, } from "../constants/events.js";
import Message from "../models/Message.js";
import { v4 as uuidv4 } from "uuid";
const socketMembers = new Map();
const socketServer = (httpServer) => {
    const io = new Server(httpServer, { cors: corsOptions });
    io.use((socket, next) => {
        cookieParser()(socket.request, socket.request.res, async (err) => {
            if (err)
                return new Error("Please Login.");
            const token = socket.request.cookies[CC_TOKEN];
            if (!token)
                return new Error("Please Login.");
            const verify = await UserService.verifyAuthToken(token);
            if (!verify)
                return new Error("Please Login.");
            const user = await UserService.getUserById(verify.id);
            if (!user)
                return new Error("Please Login.");
            socket.user = user;
            next();
        });
    });
    io.on("connection", async (socket) => {
        socketMembers.set(socket.user._id.toString(), socket.id);
        await UserService.setUserToActive(socket.user._id.toString());
        socket.user.friends.map((friend) => {
            if (!socketMembers.get(friend.toString()))
                return;
            return io.to(socketMembers.get(friend.toString())).emit(ACTIVE_FRIENDS, {
                id: socket.user._id.toString(),
            });
        });
        socket.on(SEND_MESSAGE, async ({ message, selectedChat, }) => {
            const newMessage = new Message({
                chat_id: selectedChat._id,
                content: message,
                sender: socket.user._id.toString(),
            });
            const realTimeMessage = {
                _id: uuidv4().toString(),
                chat_id: selectedChat._id,
                content: message,
                sender: {
                    first_name: socket.user.first_name,
                    last_name: socket.user.last_name,
                    _id: socket.user._id.toString(),
                    avatar: socket.user.avatar,
                    username: socket.user.username,
                },
            };
            selectedChat.members.map((member) => {
                if (member._id.toString() === socket.user._id.toString())
                    return;
                if (!socketMembers.get(member._id.toString()))
                    return;
                return io
                    .to(socketMembers.get(member._id.toString()))
                    .emit(NEW_MESSAGE, {
                    message: realTimeMessage,
                    chat: selectedChat,
                });
            });
            await newMessage.save();
        });
        socket.on("disconnect", async () => {
            socketMembers.delete(socket.user._id.toString());
            await UserService.setUserToInActive(socket.user._id.toString());
            socket.user.friends.map((friend) => {
                if (!socketMembers.get(friend.toString()))
                    return;
                return io
                    .to(socketMembers.get(friend.toString()))
                    .emit(OFFLINE_FRIEND, {
                    id: socket.user._id.toString(),
                });
            });
        });
    });
};
export default socketServer;
