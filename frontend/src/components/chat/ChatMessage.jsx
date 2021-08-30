import React from "react";
import styled from "styled-components";
import "./ChatMessage.css";

// eslint-disable-next-line
Number.prototype.leftPad = function (maxLength) {
    return this.toString().padStart(maxLength, "0");
};

const formatDate = (date) =>
    `${date.getDate().leftPad(2)}/${date.getMonth().leftPad(2)}/${(
        date.getFullYear() % 100
    ).leftPad(2)} ${date.getHours().leftPad(2)}:${date.getMinutes().leftPad(2)}`;

// const StyledMessage = styled.div`
//     position: relative;
//     display: inline-block;

//     &:hover::after {
//         position: absolute;
//         content: "${({ date }) => formatDate(date)}";
//         background-color: black;
//         color: white;

//         top: 100%;
//         left: 50%;
//         transform: translate(-50%);
//         z-index: 150;

//         width: 120%;
//         border-radius: 5px;
//         padding: 3px;

//         animation: hover-fade 0.15s linear 0s;
//     }
//     @keyframes hover-fade {
//         0% {
//             opacity: 0.3;
//         }
//         100% {
//             opacity: 1;
//         }
//     }
// `;

const ChatMessage = ({ message }) => {
    return (
        <div className="messageContainer">
            {/* <StyledMessage date={new Date(message.date)}> */}
            <div className="messageHeader">
                <div className="messageAuthor">{message.author}</div>
                <div className="messageDate">{formatDate(new Date(message.date))}</div>
            </div>
            <div className="messageText">{message.text}</div>
            {/* </StyledMessage> */}
        </div>
    );
};
export default ChatMessage;
