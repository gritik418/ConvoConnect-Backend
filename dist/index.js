import express from "express";
import http from "http";
import connectGraphQLServer from "./graphql/index.js";
import { expressMiddleware } from "@apollo/server/express4";
import socketServer from "./sockets/socketServer.js";
import cors from "cors";
import { corsOptions } from "./constants/options.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./database/db.config.js";
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;
connectDB();
socketServer(server);
const gqlServer = connectGraphQLServer();
await gqlServer.start();
app.use(cors(corsOptions));
app.use(express.json());
app.use("/graphql", cors(corsOptions), expressMiddleware(gqlServer, {
    context: async ({ req }) => ({ token: req.headers.token }),
}));
app.use("/api/user", userRoutes);
server.listen(PORT, () => {
    console.log(`App served at port: ${PORT}`);
});
