import * as React from "react";
import styled from "styled-components";
import Message from "../Message";

const ChatBubbleWrapper = styled.div`
  overflow: auto;
`;

const ChatBubbleUI = styled.div<{ me: boolean }>`
  background-color: ${props => (props.me ? "#0084ff" : "#ccc")};
  border-radius: 20px;
  margin: 1px auto;
  max-width: 425px;
  padding: 8px 14px;
  width: -webkit-fit-content;
  float: ${props => (props.me ? "right" : "left")};
`;

const MessageUI = styled.p`
  color: #fff;
  font-size: 16p;
  xfont-weight: normal;
  margin: 0;
`;

export interface ChatBubbleProps {
  message: Message;
}

export default function ChatBubble(props: ChatBubbleProps) {
  return (
    <ChatBubbleWrapper>
      <ChatBubbleUI me={props.message.fromMe}>
        <MessageUI>{props.message.message}</MessageUI>
      </ChatBubbleUI>
    </ChatBubbleWrapper>
  );
}
