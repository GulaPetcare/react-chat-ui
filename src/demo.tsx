import * as React from "react";
import { render } from "react-dom";
import { ChatFeed, ChatBubble, BubbleGroup, Message } from "./index";
import { ThemeProvider, createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    font-family: system-ui;
    color: #010101;
  }
`;

const styles = {
  button: {
    backgroundColor: "#fff",
    borderColor: "#1D2129",
    borderStyle: "solid",
    borderRadius: 20,
    borderWidth: 2,
    color: "#1D2129",
    fontSize: 18,
    fontWeight: "normal",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16
  } as React.CSSProperties,
  selected: {
    color: "#fff",
    backgroundColor: "#0084FF",
    borderColor: "#0084FF"
  } as React.CSSProperties
};

const users = {
  you: "You",
  mark: "Mark",
  evan: "Evan"
};

const customBubble = (props: any) => (
  <div>
    <p>
      {props.message.senderName} {props.message.id ? "says" : "said"}{" "}
      {props.message.message}
    </p>
  </div>
);

interface State {
  curr_user: "you" | "mark" | "evan";
  messages: Array<Message>;
  useCustomBubble: boolean;
}
class Chat extends React.Component<{}, State> {
  message = React.createRef<HTMLInputElement>();

  constructor(props: any) {
    super(props);
    this.state = {
      messages: [
        new Message({
          fromMe: false,
          senderId: "mark",
          message: "Hey guys!",
          senderName: "Mark"
        }),
        new Message({
          fromMe: false,
          senderId: "evan",
          message: "Hey! Evan here. react-chat-ui is pretty dooope.",
          senderName: "Evan"
        })
      ],
      useCustomBubble: false,
      curr_user: "you"
    };
  }

  onPress(user: State["curr_user"]) {
    this.setState({ curr_user: user });
  }

  onMessageSubmit(e: any) {
    const input = this.message;
    e.preventDefault();
    if (!input.current!.value) {
      return false;
    }
    this.pushMessage(this.state.curr_user, input.current!.value);
    input.current!.value = "";
    return true;
  }

  pushMessage(recipient: "you" | "mark" | "evan", message: any) {
    const prevState = this.state;
    const newMessage = new Message({
      fromMe: this.state.curr_user === "you",
      senderId: recipient,
      message,
      senderName: users[recipient] as string
    });

    this.setState({
      messages: prevState.messages.concat(newMessage)
    });
  }

  render() {
    return (
      <div className="container">
        <GlobalStyles />
        <h1 className="text-center">react-chat-ui</h1>
        <p className="text-center">
          <a
            href="https://github.com/brandonmowat/react-chat-ui"
            target="_blank"
          >
            Github
          </a>
        </p>
        <div className="install">
          <code>npm i -S react-chat-ui</code>
        </div>
        <div className="chatfeed-wrapper">
          <ChatFeed
            chatBubble={this.state.useCustomBubble ? customBubble : undefined}
            maxHeight={250}
            messages={this.state.messages} // Boolean: list of message objects
            showSenderName
          />

          <form onSubmit={e => this.onMessageSubmit(e)}>
            <input
              ref={this.message}
              placeholder="Type a message..."
              className="message-input"
            />
          </form>

          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <button
              style={{
                ...styles.button,
                ...(this.state.curr_user === "you" ? styles.selected : {})
              }}
              onClick={() => this.onPress("you")}
            >
              You
            </button>
            <button
              style={{
                ...styles.button,
                ...(this.state.curr_user === "mark" ? styles.selected : {})
              }}
              onClick={() => this.onPress("mark")}
            >
              Mark
            </button>
            <button
              style={{
                ...styles.button,
                ...(this.state.curr_user === "evan" ? styles.selected : {})
              }}
              onClick={() => this.onPress("evan")}
            >
              Evan
            </button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 10
            }}
          >
            <button
              style={{
                ...styles.button,
                ...(this.state.useCustomBubble ? styles.selected : {})
              }}
              onClick={() =>
                this.setState({
                  useCustomBubble: !this.state.useCustomBubble
                })
              }
            >
              Custom Bubbles
            </button>
          </div>
        </div>
        <h2 className="text-center">There are Bubbles!</h2>
        <ThemeProvider
          theme={{
            bubbles: { mineBackground: "red", theirBackground: "blue" }
          }}
        >
          <ChatBubble
            message={
              new Message({
                senderId: "mark",
                message: "I float to the left!",
                fromMe: false
              })
            }
          />
          <ChatBubble
            message={
              new Message({
                senderId: "evan",
                message: "I float to the right!",
                fromMe: true
              })
            }
          />

          <h2 className="text-center">And we have Bubble Groups!</h2>
          <BubbleGroup
            messages={[
              new Message({ fromMe: false, senderId: "1", message: "Hey!" }),
              new Message({
                fromMe: false,
                senderId: "1",
                message: "I forgot to mention..."
              }),
              new Message({
                fromMe: false,
                senderId: "1",
                message:
                  "Oh no, I forgot... I think I was going to say I'm a BubbleGroup"
              })
            ]}
            id={1}
            showSenderName={true}
            senderName={"Elon Musk"}
          />
          <ChatBubble
            message={
              new Message({
                fromMe: false,
                senderId: "2",
                message: "I 'm a single ChatBubble!"
              })
            }
          />
          <BubbleGroup
            messages={[
              new Message({
                fromMe: true,
                senderId: "0",
                message: "How could you forget already?!"
              }),
              new Message({
                fromMe: true,
                senderId: "0",
                message: "Oh well. I'm a BubbleGroup as well"
              })
            ]}
            id={1}
            showSenderName={true}
            senderName={"Elon Musk"}
          />
        </ThemeProvider>
      </div>
    );
  }
}

render(<Chat />, document.getElementById("chat-ui"));
