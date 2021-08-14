import { createServer } from "http";
import { Server, Socket } from "socket.io";

console.log("starting socket server");
const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"],
    },
});

const emitActiveConnections = () =>
    io.emit("activeConnections", io.sockets.sockets.size);

io.on("connection", (socket: Socket) => {
    emitActiveConnections();
    socket.on("disconnect", (_) => {
        emitActiveConnections();
    });
    socket.on("activeConnections", () => {
        socket.emit("activeConnections", io.sockets.sockets.size);
    });
});

httpServer.listen(3000);
