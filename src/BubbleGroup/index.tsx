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
  const { chatBubble, senderName, messages } = props;
  const ChatBubble = chatBubble || DefaultChatBubble;
  const sampleMessage = messages[0];

  const senderNameHandler = () => {
    if (senderName || sampleMessage.senderName !== "") {
      return senderName || sampleMessage.senderName;
    } else {
      return "";
    }
  };

  return (
    <BubbleGroupContainer data-test-id="rcu-bubble-group">
      {messages.map((message, i) => (
        <ChatBubble
          key={i}
          message={message}
          first={i === 0}
          senderName={senderNameHandler()}
          showSenderName={i === 0 ? true : false}
        />
      ))}
      {/* {showSenderName &&
        (senderName || sampleMessage.senderName) !== "" &&
        sampleMessage.fromMe === false && (
          <BubbleGroupHeader>
            {senderName || sampleMessage.senderName}
          </BubbleGroupHeader>
        )} */}
    </BubbleGroupContainer>
  );
}
