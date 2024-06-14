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
import { corsOptions } from "./constants/options.js";
import { ONLINE, USER_ONLINE } from "./constants/events.js";

export const eventEmitter = new EventEmitter();

const port = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);

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

io.on("connection", (socket) => {
  socket.on(ONLINE, ({ chats, id }) => {
    socket.join(id);
    console.log(id, chats);

    for (const chat in chats) {
      console.log(chat, id);
      socket.to(chat).emit(USER_ONLINE, { id: id });
    }
  });

  // eventEmitter.on("online", () => {
  //   socket.emit("online", { hello: "i m online" });
  // });
});

server.listen(port, () => {
  console.log(`App served at: http://localhost:${port}`);
});
