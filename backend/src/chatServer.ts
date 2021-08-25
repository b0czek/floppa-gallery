import { Namespace, Server, Socket } from "socket.io";
import { validateMessage } from "./messageValidator";

export interface Message {
    author: string;
    text: string;
    date: Date;
}

class MessageBuffer extends Array {
    private bufferSize: number;
    constructor(bufferSize: number) {
        super();
        this.bufferSize = bufferSize;
    }
    public push(message: Message) {
        if (this.length === this.bufferSize) {
            this.shift();
        }
        return super.push(message);
    }
}

export default class ChatServer {
    private io: Namespace;
    private messageBuffer: MessageBuffer = new MessageBuffer(50);
    constructor(ioServer: Server) {
        this.io = ioServer.of("/chat");
        this.io.on("connection", (socket: Socket) => {
            this.broadcastActiveConnections();
            socket.on("disconnect", () => {
                this.broadcastActiveConnections();
            });
            socket.on("activeConnections", () => {
                socket.emit("activeConnections", this.io.sockets.size);
            });
            socket.on("messages", (callback) => {
                callback(this.messageBuffer);
            });
            socket.on("sendMessage", (messageData, callback) => {
                let message: Message = {
                    author: messageData.author,
                    text: messageData.text,
                    date: new Date(),
                };
                let validation = validateMessage(message);
                if (validation === true) {
                    this.messageBuffer.push(message);
                    this.io.emit("newMessage", this.messageBuffer[this.messageBuffer.length - 1]);
                }
                // message client if the message was rejected or not
                callback(validation);
            });
        });
    }

    private broadcastActiveConnections = () =>
        this.io.emit("activeConnections", this.io.sockets.size);
}
