// Copyright 2017 Brandon Mowat
// Written, developed, and designed by Brandon Mowat for the purpose of helping
// other developers make chat interfaces.

import * as React from "react";
import BubbleGroup from "../BubbleGroup";
import DefaultChatBubble from "../ChatBubble";
import ChatInput from "../ChatInput";
import Message from "../Message";
import styled, { ThemeProvider } from "styled-components";
import merge from "deepmerge";

interface Theme {
  bubbles: {
    mineBackground: string;
    mineColor: string;
    theirColor: string;
    theirBackground: string;
    messageFontSize: string;
    messageFontFamily: string;
  };
}

function mergeParentTheme(parentTheme: Theme): Theme {
  return merge(
    {
      bubbles: {
        mineBackground: "blue",
        mineColor: "#fff",
        theirBackground: "#ccc",
        theirColor: "#90909",
        messageFontSize: "14px",
        messageFontFamily: "system-ui"
      }
    },
    parentTheme
  );
}

const ChatPanel = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  padding: 10px;
`;

const ChatHistory = styled.div<{ maxHeight?: number }>`
  overflow: auto;
  height: ${props =>
    props.maxHeight != null ? props.maxHeight + "px" : "auto"};
  max-height: ${props =>
    props.maxHeight != null ? props.maxHeight + "px" : "auto"};
`;

const TypingIndicator = styled.div`
  margin: 10px 0;
  overflow: auto;
  position: relative;
`;

// Model for ChatFeed props.
interface ChatFeedInterface {
  hasInputField?: boolean;
  isTyping?: boolean;
  maxHeight?: number;
  messages: Array<Message>;
  showSenderName?: boolean;
  chatBubble?: typeof DefaultChatBubble;
}

// React component to render a complete chat feed
export default function ChatFeed({
  messages,
  maxHeight,
  isTyping,
  chatBubble,
  showSenderName,
  hasInputField
}: ChatFeedInterface) {
  const chat = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const scrollHeight = chat.current!.scrollHeight;
    const height = chat.current!.clientHeight;
    const maxScrollTop = scrollHeight - height;
    chat.current!.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }, [messages]);

  const inputField = hasInputField && <ChatInput />;

  const ChatBubble = chatBubble || DefaultChatBubble;

  let group: Array<Message> = [];

  const messageNodes = messages.map((message: Message, index) => {
    group.push(message);
    // Find diff in message type or no more messages
    if (
      index === messages.length - 1 ||
      messages[index + 1].senderId !== message.senderId
    ) {
      const messageGroup: Array<Message> = group;
      group = [];
      return (
        <BubbleGroup
          key={index}
          messages={messageGroup}
          id={message.senderId}
          showSenderName={showSenderName}
          chatBubble={ChatBubble}
        />
      );
    }

    return null;
  });

  // Other end is typing...
  if (isTyping) {
    messageNodes.push(
      <TypingIndicator key="is-typing">
        <ChatBubble
          message={
            new Message({
              fromMe: false,
              senderId: "1",
              message: "...",
              senderName: ""
            })
          }
        />
      </TypingIndicator>
    );
  }

  return (
    <ThemeProvider theme={mergeParentTheme}>
      <ChatPanel>
        <ChatHistory ref={chat} maxHeight={maxHeight}>
          <div>{messageNodes}</div>
        </ChatHistory>
        {inputField}
      </ChatPanel>
    </ThemeProvider>
  );
}
