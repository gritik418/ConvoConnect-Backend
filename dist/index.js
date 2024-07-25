import express from "express";
import http from "http";
import connectGraphQLServer from "./graphql/index.js";
import { expressMiddleware } from "@apollo/server/express4";
import socketServer from "./sockets/socketServer.js";
import cors from "cors";
import { corsOptions } from "./constants/options.js";
import { CC_TOKEN } from "./constants/variables.js";
import connectDB from "./database/db.config.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import friendRoutes from "./routes/friendRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const staticPath = path.resolve(__dirname, "../public");
connectDB();
socketServer(server);
const gqlServer = connectGraphQLServer();
await gqlServer.start();
app.use(cors(corsOptions));
app.use(express.static(staticPath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use("/graphql", cors(corsOptions), expressMiddleware(gqlServer, {
    context: async ({ req }) => {
        try {
            if (!req.cookies[CC_TOKEN])
                return null;
            return { token: req.cookies[CC_TOKEN] };
        }
        catch (error) {
            return null;
        }
    },
}));
app.use("/api/user", userRoutes);
app.use("/api/friend", friendRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
server.listen(PORT, () => {
    console.log(`App served at port: ${PORT}`);
});
