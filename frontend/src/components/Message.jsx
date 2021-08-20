import React from "react";
import "./Message.css";
const Message = ({ message }) => {
    return (
        <div className="messageContainer">
            <div className="message">
                <span>{message.author}</span>
                <span>:&nbsp;</span>
                <span>{message.text}</span>
            </div>
        </div>
    );
};
export default Message;
