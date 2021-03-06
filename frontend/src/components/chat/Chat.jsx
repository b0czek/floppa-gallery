import io from "socket.io-client";
import React from "react";

import floppa from "../../imgs/floppa.gif";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import ChatActiveUsers from "./ChatActiveUsers";
import ChatControls from "./ChatControls";
import Message from "./ChatMessage";

class Chat extends React.Component {
    state = {
        activeConnections: 0,
        messages: [],
        author: "",
        text: "",
    };

    scrollToBottom = () =>
        this.messagesContainer.scrollTo({
            top: this.messagesContainer.scrollHeight - this.messagesContainer.clientHeight,
            behavior: "smooth",
        });

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
    // returns true if there was a slur
    checkForRacialSlur = (str) => {
        if (str.includes("nigger")) {
            let punishmentUrl = `${document.location.protocol}//${document.location.host}/punishment.zip`;

            const link = document.createElement("a");
            link.href = punishmentUrl;
            // randomize the end of the name so file downloads everytime
            link.setAttribute(
                "download",
                `Ski Mask The Slump God - The Sin City Mixtape #${Math.floor(Math.random() * 10e6)}`
            );
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            return true;
        }
        return false;
    };

    sendMessage = (e) => {
        e.preventDefault();
        if (
            this.checkForRacialSlur(this.state.text) ||
            this.checkForRacialSlur(this.state.author)
        ) {
            return;
        }
        this.socket.emit(
            "sendMessage",
            {
                text: this.state.text,
                author: this.state.author,
            },
            (response) => {
                if (response === true) {
                    this.setState({ text: "" });
                } else {
                    console.log(response);
                }
            }
        );
    };

    componentDidMount() {
        let port = process.env.NODE_ENV ? "3001" : document.location.port;
        this.socket = io(
            `${document.location.protocol}//${document.location.hostname}:${port}/chat`
        );
        this.socket.on("connect", () => {
            this.socket.emit("activeConnections");
            this.socket.on("activeConnections", (connections) => {
                this.setState({ activeConnections: connections });
            });
            this.socket.emit("messages", (messages) => {
                this.setState({ messages });
                this.scrollToBottom();
            });
            this.socket.on("newMessage", (message) => {
                // if scroll position is not at the bottom(+50px), dont scroll on new message
                let shouldScroll =
                    this.messagesContainer.scrollHeight - this.messagesContainer.clientHeight <=
                    this.messagesContainer.scrollTop + 50;

                this.setState((prevState) => ({
                    messages: prevState.messages.concat(message),
                }));
                if (shouldScroll) this.scrollToBottom();
            });
        });
    }

    componentWillUnmount() {
        this.socket.disconnect();
        this.socket.close();
    }

    render() {
        return (
            <div className="chatContainer">
                <div className="chat">
                    <ChatActiveUsers count={this.state.activeConnections} />
                    <ChatHeader headerText="Floppa Chat" />
                    <div
                        className="messages"
                        style={{ backgroundImage: `url(${floppa})` }}
                        ref={(el) => (this.messagesContainer = el)}
                    >
                        {this.state.messages.map((message, index) => (
                            <Message key={index} message={message} />
                        ))}
                    </div>
                    <ChatControls
                        controls={{
                            handleChange: this.handleChange,
                            sendMessage: this.sendMessage,
                            author: this.state.author,
                            text: this.state.text,
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default Chat;
