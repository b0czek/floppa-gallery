import { Message } from "./chatServer";

export const validateMessage = (message: Message): boolean | string => {
    if (!message.author) return "No name provided.";
    if (message.author.length >= 30) return "Name too long.";
    if (!message.text) return "Message cannot be empty.";
    if (message.text.length >= 2000) return "Message too long.";
    return true;
};
