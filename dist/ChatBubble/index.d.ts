/// <reference types="react" />
import Message from "../Message";
export interface ChatBubbleProps {
    message: Message;
}
export default function ChatBubble(props: ChatBubbleProps): JSX.Element;
