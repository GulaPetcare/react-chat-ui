import * as React from "react";
import styled from "styled-components";
import Message from "../Message";

const BubbleGroupHeader = styled.h5`
  margin: 0;
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  font-family: ${(props) => props.theme.fontFamily};
`;

const ChatBubbleWrapper = styled.div<{ me: boolean }>`
  overflow: auto;
  max-width: 420px;
  margin-left: ${(props) => props.me && "auto"};
`;

const ChatBubbleUI = styled.div<{ me: boolean; first?: boolean }>`
  background-color: ${(props) =>
    props.me
      ? props.theme.bubbles.mineBackground
      : props.theme.bubbles.theirBackground};

  // border-radius: 8px 8px ${(props) => (props.me ? "0 8px" : "8px 0")};
  border-radius: ${(props) =>
    props.first ? "8px 8px" : props.me ? "8px 4px" : "4px 8px"}
    ${(props) => (props.me ? "0 8px" : "8px 0")};
  margin: 1px auto;
  padding: 12px 16px;
  min-width: fit-content;
  float: ${(props) => (props.me ? "right" : "left")};
`;

const MessageUI = styled.p<{ me: boolean }>`
  color: ${(props) =>
    props.me ? props.theme.bubbles.mineColor : props.theme.bubbles.theirColor};
  font-size: ${(props) => props.theme.bubbles.messageFontSize};
  font-family: ${(props) => props.theme.bubbles.messageFontFamily};
  font-weight: normal;
  margin: 0;
`;

export interface ChatBubbleProps {
  message: Message;
  first?: boolean;
  senderName?: string;
  showSenderName?: boolean;
}

export default function ChatBubble(props: ChatBubbleProps) {
  if (props.first === undefined) {
    props = {
      message: props.message,
      first: true,
      senderName: props.senderName,
      showSenderName: props.showSenderName,
    };
  }

  return (
    <ChatBubbleWrapper me={props.message.fromMe}>
      <ChatBubbleUI
        data-test-id="rcu-bubble"
        me={props.message.fromMe}
        first={props.first}
      >
        <MessageUI me={props.message.fromMe} data-test-id="rcu-bubble-text">
          {props.showSenderName && (
            <BubbleGroupHeader>{props.senderName}</BubbleGroupHeader>
          )}
          {props.message.message}
        </MessageUI>
      </ChatBubbleUI>
    </ChatBubbleWrapper>
  );
}
