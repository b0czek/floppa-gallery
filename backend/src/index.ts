import { createServer } from "http";
import { Server } from "socket.io";
import ChatServer from "./chatServer";
import config from "./config";

console.log("starting socket server");
const isProd = process.env.NODE_ENV === "production";
const httpServer = createServer();

const io = new Server(httpServer, {
    cors: {
        origin: isProd ? config.httpServer.corsOrigin : "*",
        methods: ["GET", "POST"],
    },
});
httpServer.listen(isProd ? config.httpServer.port : 3001);

// const chatServer =
new ChatServer(io);
