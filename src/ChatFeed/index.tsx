// Copyright 2017 Brandon Mowat
// Written, developed, and designed by Brandon Mowat for the purpose of helping
// other developers make chat interfaces.

import * as React from "react";
import BubbleGroup from "../BubbleGroup";
import DefaultChatBubble, { ChatBubbleStyles } from "../ChatBubble";
import ChatInput from "../ChatInput";
import Message from "../Message";
import styles from "./styles";

// Model for ChatFeed props.
interface ChatFeedInterface {
  bubblesCentered?: boolean;
  bubbleStyles?: ChatBubbleStyles;
  hasInputField?: boolean;
  isTyping?: boolean;
  maxHeight?: number;
  messages: Array<Message>;
  showSenderName?: boolean;
  chatBubble?: typeof DefaultChatBubble;
}

// React component to render a complete chat feed
export default function ChatFeed(props: ChatFeedInterface) {
  const chat = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const scrollHeight = chat.current!.scrollHeight;
    const height = chat.current!.clientHeight;
    const maxScrollTop = scrollHeight - height;
    chat.current!.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }, []);

  const inputField = props.hasInputField && <ChatInput />;
  const { maxHeight } = props;

  const {
    messages,
    isTyping,
    bubbleStyles,
    chatBubble,
    showSenderName
  } = props;

  const ChatBubble = chatBubble || DefaultChatBubble;

  let group: Array<Message> = [];

  const messageNodes = messages.map((message: Message, index) => {
    group.push(message);
    // Find diff in message type or no more messages
    if (
      index === messages.length - 1 ||
      messages[index + 1].id !== message.id
    ) {
      const messageGroup: Array<Message> = group;
      group = [];
      return (
        <BubbleGroup
          key={index}
          messages={messageGroup}
          id={message.id}
          showSenderName={showSenderName}
          chatBubble={ChatBubble}
          bubbleStyles={bubbleStyles}
        />
      );
    }

    return null;
  });

  // Other end is typing...
  if (isTyping) {
    messageNodes.push(
      <div key="isTyping" style={{ ...styles.chatbubbleWrapper }}>
        <ChatBubble
          message={new Message({ id: 1, message: "...", senderName: "" })}
          bubbleStyles={bubbleStyles}
        />
      </div>
    );
  }

  return (
    <div id="chat-panel" style={styles.chatPanel}>
      <div
        ref={chat}
        className="chat-history"
        style={{ ...styles.chatHistory, maxHeight }}
      >
        <div className="chat-messages">{messageNodes}</div>
      </div>
      {inputField}
    </div>
  );
}

/**
 * Determines what type of message/messages to render.
 */
const renderMessages = (messages: [Message]) => {};
