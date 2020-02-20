/**
 * A statndardized message object for use
 * in rendering messages in the chat feed.
 */
interface MessageData {
    message: string;
    senderId: string;
    fromMe: boolean;
    senderName?: string;
}
export default class Message {
    /**
     * Message object for organizing and storing current message data.
     */
    senderId: string;
    message: string;
    senderName?: string;
    fromMe: boolean;
    constructor(messageData: MessageData);
}
export {};
