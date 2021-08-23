import { createServer } from "http";
import { Server } from "socket.io";
import ChatServer from "./chatServer";

console.log("starting socket server");

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
httpServer.listen(3001);

// const chatServer =
new ChatServer(io);
