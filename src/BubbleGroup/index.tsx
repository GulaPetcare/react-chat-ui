import * as React from "react";
import BubbleGroupInterface from "./interface";
import DefaultChatBubble from "../ChatBubble";
import styled from "styled-components";

const BubbleGroupContainer = styled.div`
  margin: 16px 0;
  overflow: auto;
  position: relative;
`;

export default function BubbleGroup(props: BubbleGroupInterface) {
  const { showSenderName, chatBubble, senderName, messages } = props;
  const ChatBubble = chatBubble || DefaultChatBubble;
  const sampleMessage = messages[0];

  let senderNameToRender = "";
  if (sampleMessage.senderName) {
    senderNameToRender = sampleMessage.senderName;
  }
  if (senderName) {
    senderNameToRender = senderName;
  }

  return (
    <BubbleGroupContainer data-test-id="rcu-bubble-group">
      {messages.map((message, i) => (
        <ChatBubble
          key={i}
          message={message}
          first={i === 0}
          senderName={senderNameToRender}
          showSenderName={
            showSenderName &&
            (senderName || sampleMessage.senderName) !== "" &&
            sampleMessage.fromMe === false &&
            i === 0
          }
        />
      ))}
    </BubbleGroupContainer>
  );
}
