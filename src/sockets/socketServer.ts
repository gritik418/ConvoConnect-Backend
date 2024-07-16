import http from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import { corsOptions } from "../constants/options.js";

const socketServer = (
  httpServer: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
  >
) => {
  const io = new Server(httpServer, { cors: corsOptions });

  io.use((socket: any) => {
    cookieParser()(socket.request, socket.request.res, (err) => {
      if (err) {
        return new Error("Please Login.");
      }
      const token = socket.request.headers.cookie[""];
      console.log(token);
    });
  });

  io.on("connection", (socket) => {
    console.log(socket.id);
  });
};

export default socketServer;
