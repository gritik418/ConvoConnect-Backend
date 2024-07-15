import express from "express";
import http from "http";
import connectGraphQLServer from "./graphql/index.js";
import { expressMiddleware } from "@apollo/server/express4";
import socketServer from "./sockets/socketServer.js";

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

socketServer(server);

const gqlServer = connectGraphQLServer();
await gqlServer.start();

app.use(express.json());

app.use(
  "/graphql",
  expressMiddleware(gqlServer, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
);

server.listen(PORT, () => {
  console.log(`App served at port: ${PORT}`);
});
