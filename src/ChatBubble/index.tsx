import * as React from "react";
import styled from "styled-components";
import Message from "../Message";
import Linkify from "linkifyjs/react";

const BubbleGroupHeader = styled.h5<{ me: boolean }>`
  margin: 0;
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 500;
  color: ${(props) =>
    props.me
      ? props.theme.bubbles.mineHeader
      : props.theme.bubbles.theirHeader};
  font-family: ${(props) => props.theme.fontFamily};
`;

const ChatBubbleWrapper = styled.div<{ me: boolean }>`
  overflow: auto;
  max-width: 420px;
  margin-left: ${(props) => props.me && "auto"};
`;

const handleBorderRadius = (me: boolean, first?: boolean) => {
  let bubbleRadius = "2px 8px 8px 0";
  if (me) {
    bubbleRadius = "8px 2px 0 8px";
  }
  if (me && first) {
    bubbleRadius = "8px 8px 0 8px";
  }
  if (!me && first) {
    bubbleRadius = "8px 8px 8px 0";
  }
  return bubbleRadius;
};

const ChatBubbleUI = styled.div<{ me: boolean; first?: boolean }>`
  background-color: ${(props) =>
    props.me
      ? props.theme.bubbles.mineBackground
      : props.theme.bubbles.theirBackground};
  border-radius: ${(props) => handleBorderRadius(props.me, props.first)};
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
  a {
    color: ${(props) =>
      props.me ? props.theme.bubbles.mineColor : "#0000EE"};
  }
`;

export interface ChatBubbleProps {
  message: Message;
  first?: boolean;
  senderName?: string;
  showSenderName?: boolean;
}

export default function ChatBubble(props: ChatBubbleProps) {
  const isFirstMessage = props.first != null ? props.first : true;

  return (
    <ChatBubbleWrapper me={props.message.fromMe}>
      <ChatBubbleUI
        data-test-id="rcu-bubble"
        me={props.message.fromMe}
        first={isFirstMessage}
      >
        {props.showSenderName && props.senderName !== "You" && (
          <BubbleGroupHeader me={props.message.fromMe}>
            {props.senderName}
          </BubbleGroupHeader>
        )}
        <Linkify>
          <MessageUI me={props.message.fromMe} data-test-id="rcu-bubble-text">
            {props.message.message}
          </MessageUI>
        </Linkify>
      </ChatBubbleUI>
    </ChatBubbleWrapper>
  );
}
