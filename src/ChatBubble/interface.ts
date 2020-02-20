import Message from "../Message";
import { CSSProperties } from "react";
export interface ChatBubbleStyles {
  userBubble?: CSSProperties;
  chatbubble?: CSSProperties;
  text?: CSSProperties;
}
export default interface ChatBubbleProps {
  message: Message;
  bubbleStyles?: ChatBubbleStyles;
  bubblesCentered?: boolean;
}
