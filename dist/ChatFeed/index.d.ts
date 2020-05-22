/// <reference types="react" />
import DefaultChatBubble from "../ChatBubble";
import Message from "../Message";
interface ChatFeedInterface {
    hasInputField?: boolean;
    isTyping?: boolean;
    maxHeight?: number;
    messages: Array<Message>;
    showSenderName?: boolean;
    chatBubble?: typeof DefaultChatBubble;
}
export default function ChatFeed({ messages, maxHeight, isTyping, chatBubble, showSenderName, hasInputField, }: ChatFeedInterface): JSX.Element;
export {};
