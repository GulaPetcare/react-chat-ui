import * as React from "react";
import styled from "styled-components";
import Message from "../Message";

const ChatBubbleWrapper = styled.div`
  overflow: auto;
`;

const ChatBubbleUI = styled.div<{ me: boolean }>`
  background-color: ${props =>
    props.me
      ? props.theme.bubbles.mineBackground
      : props.theme.bubbles.theirBackground};
  border-radius: 20px;
  margin: 1px auto;
  max-width: 425px;
  padding: 8px 14px;
  width: -webkit-fit-content;
  float: ${props => (props.me ? "right" : "left")};
`;

const MessageUI = styled.p<{ me: boolean }>`
  color: ${props =>
    props.me ? props.theme.bubbles.mineColor : props.theme.bubbles.theirColor};
  font-size: ${props => props.theme.bubbles.messageFontSize};
  font-family: ${props => props.theme.bubbles.messageFontFamily};
  font-weight: normal;
  margin: 0;
`;

export interface ChatBubbleProps {
  message: Message;
}

export default function ChatBubble(props: ChatBubbleProps) {
  return (
    <ChatBubbleWrapper>
      <ChatBubbleUI data-test-id="rcu-bubble" me={props.message.fromMe}>
        <MessageUI me={props.message.fromMe} data-test-id="rcu-bubble-text">
          {props.message.message}
        </MessageUI>
      </ChatBubbleUI>
    </ChatBubbleWrapper>
  );
}
