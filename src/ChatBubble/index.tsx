import * as React from "react";
import ChatBubbleProps, { ChatBubbleStyles } from "./interface";
import styles from "./styles";
import styled from "styled-components";

const ChatBubbleWrapper = styled.div`
  overflow: auto;
`;

const defaultBubbleStyles = {
  userBubble: {},
  chatbubble: {},
  text: {}
};

export { ChatBubbleProps, ChatBubbleStyles };

export default function ChatBubble(props: ChatBubbleProps) {
  const { bubblesCentered } = props;
  let { bubbleStyles } = props;
  bubbleStyles = bubbleStyles || defaultBubbleStyles;
  const { userBubble, chatbubble, text } = bubbleStyles;

  // message.id 0 is reserved for blue
  const chatBubbleStyles =
    props.message.id === 0
      ? {
          ...styles.chatbubble,
          ...(bubblesCentered ? {} : styles.chatbubbleOrientationNormal),
          ...chatbubble,
          ...userBubble
        }
      : {
          ...styles.chatbubble,
          ...styles.recipientChatbubble,
          ...(bubblesCentered
            ? {}
            : styles.recipientChatbubbleOrientationNormal),
          ...chatbubble,
          ...userBubble
        };

  return (
    <ChatBubbleWrapper>
      <div style={chatBubbleStyles}>
        <p style={{ ...styles.p, ...text }}>{props.message.message}</p>
      </div>
    </ChatBubbleWrapper>
  );
}
