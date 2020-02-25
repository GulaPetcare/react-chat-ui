import * as React from "react";
import BubbleGroupInterface from "./interface";
import DefaultChatBubble from "../ChatBubble";
import styled from "styled-components";

const BubbleGroupContainer = styled.div`
  margin: 10px 0;
  overflow: auto;
  position: relative;
`;

const BubbleGroupHeader = styled.h5`
  margin: 0;
  font-size: 14px;
  font-weight: bold;
  color: #999;
  font-family: ${props => props.theme.fontFamily};
`;

export default function BubbleGroup(props: BubbleGroupInterface) {
  const { showSenderName, chatBubble, senderName, messages } = props;
  const ChatBubble = chatBubble || DefaultChatBubble;
  const sampleMessage = messages[0];

  return (
    <BubbleGroupContainer data-test-id="rcu-bubble-group">
      {showSenderName &&
        (senderName || sampleMessage.senderName) !== "" &&
        sampleMessage.fromMe === false && (
          <BubbleGroupHeader>
            {senderName || sampleMessage.senderName}
          </BubbleGroupHeader>
        )}
      {messages.map((message, i) => (
        <ChatBubble key={i} message={message} />
      ))}
    </BubbleGroupContainer>
  );
}
