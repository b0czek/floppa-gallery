import { Namespace, Server, Socket } from "socket.io";
import { validateMessage } from "./messageValidator";
import config from "./config";
import fs from "fs";

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
    private messageBuffer: MessageBuffer = new MessageBuffer(
        config.chatServer.bufferSize
    );
    private messagesSinceSnapshot: number = 0;
    private snapshotInterval: NodeJS.Timeout;

    constructor(ioServer: Server) {
        this.loadMessagesSnapshot();
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
                    this.messagesSinceSnapshot++;
                    this.messageBuffer.push(message);
                    this.io.emit(
                        "newMessage",
                        this.messageBuffer[this.messageBuffer.length - 1]
                    );
                }
                // message client if the message was rejected or not
                callback(validation);
            });
        });
        // make a snapshot of chat messages and dump it into a file every x minutes
        // (if any message is actually sent in this period of time)
        this.snapshotInterval = setInterval(
            this.snapshotMessages,
            config.chatServer.snapshotInterval
        );
    }

    private loadMessagesSnapshot = () => {
        try {
            let chatFile = fs.readFileSync(config.chatServer.snapshotFilename, {
                encoding: "utf-8",
            });
            this.messageBuffer = JSON.parse(chatFile);
        } catch (e) {
            console.error(
                `messages could not be read - ${e.toString()}, starting with empty buffer`
            );
        }
    };

    private snapshotMessages = async () => {
        if (this.messagesSinceSnapshot == 0) {
            return;
        }
        let chat = JSON.stringify(this.messageBuffer);
        try {
            await fs.promises.writeFile(
                config.chatServer.snapshotFilename,
                chat,
                {
                    encoding: "utf-8",
                }
            );
            console.log("successfully saved a snapshot of messages");
        } catch (e) {
            console.error(
                `chat messages could not be snapshoted ${e.toString()}`
            );
        }

        this.messagesSinceSnapshot = 0;
    };

    private broadcastActiveConnections = () =>
        this.io.emit("activeConnections", this.io.sockets.size);
}
