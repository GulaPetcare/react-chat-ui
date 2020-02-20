import * as React from "react";
import BubbleGroupInterface from "./interface";
import DefaultChatBubble from "../ChatBubble";
import styles from "./styles";

export default function BubbleGroup(props: BubbleGroupInterface) {
  const {
    bubblesCentered,
    bubbleStyles,
    showSenderName,
    chatBubble,
    senderName,
    messages
  } = props;
  const ChatBubble = chatBubble || DefaultChatBubble;
  const sampleMessage = messages[0];

  const messageNodes = messages.map((message, i) => {
    return (
      <ChatBubble
        key={i}
        message={message}
        bubblesCentered={bubblesCentered}
        bubbleStyles={bubbleStyles}
      />
    );
  });

  return (
    <div style={styles.chatbubbleWrapper}>
      {showSenderName &&
        (senderName || sampleMessage.senderName) !== "" &&
        sampleMessage.id !== 0 && (
          <h5 style={styles.bubbleGroupHeader}>
            {senderName || sampleMessage.senderName}
          </h5>
        )}
      {messageNodes}
    </div>
  );
}
