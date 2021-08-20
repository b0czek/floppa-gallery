import io from "socket.io-client";
import React from "react";

import Message from "./Message";

const Chat = (props) => {
    const [activeConnections, setActiveConnections] = React.useState(0);
    const [messages, setMessages] = React.useState([]);

    React.useEffect(() => {
        const socket = io("http://localhost:3000/chat");

        socket.on("connect", () => {
            socket.emit("activeConnections");
            socket.on("activeConnections", (connections) => {
                setActiveConnections(connections);
            });
            socket.emit("messages", (messages) => {
                setMessages(messages);
            });
        });
        /**
         * testing purposes
         */
        let messageCount = Math.floor(Math.random() * 15);
        for (let i = 0; i < messageCount; i++) {
            socket.emit("sendMessage", {
                text: i,
                author: "twoja stara",
            });
        }
    }, []);

    return (
        <div>
            activeConnections: {activeConnections}
            <div style={{ width: "30%" }}>
                {messages.map((message, index) => (
                    <Message key={index} message={message} />
                ))}
            </div>
        </div>
    );
};
export default Chat;
