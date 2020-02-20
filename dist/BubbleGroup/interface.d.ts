import { Message, ChatBubble } from "../";
export default interface BubbleGroupInterface {
    messages: Array<Message>;
    id: string | number;
    showSenderName?: boolean;
    chatBubble?: typeof ChatBubble;
    bubblesCentered?: boolean;
    senderName?: string;
}
