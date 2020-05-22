/// <reference types="react" />
import Message from "../Message";
export interface ChatBubbleProps {
    message: Message;
    first?: boolean;
    senderName?: string;
    showSenderName?: boolean;
}
export default function ChatBubble(props: ChatBubbleProps): JSX.Element;
