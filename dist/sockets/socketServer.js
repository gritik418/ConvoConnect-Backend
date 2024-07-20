import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import { corsOptions } from "../constants/options.js";
import { CC_TOKEN } from "../constants/variables.js";
import UserService from "../services/user.js";
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
        // console.log(socketMembers.keys());
        socket.on("disconnect", async () => {
            socketMembers.delete(socket.user._id.toString());
            await UserService.setUserToInActive(socket.user._id.toString());
        });
    });
};
export default socketServer;
