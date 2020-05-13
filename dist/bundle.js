import { createElement, useRef, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}

var ChatBubbleWrapper = styled.div(
  templateObject_1 ||
    (templateObject_1 = __makeTemplateObject(
      ["\n  overflow: auto;\n"],
      ["\n  overflow: auto;\n"]
    ))
);
var ChatBubbleUI = styled.div(
  templateObject_2 ||
    (templateObject_2 = __makeTemplateObject(
      [
        "\n  background-color: ",
        ";\n  border-radius: 20px;\n  margin: 1px auto;\n  max-width: 425px;\n  padding: 8px 14px;\n  width: -webkit-fit-content;\n  float: ",
        ";\n"
      ],
      [
        "\n  background-color: ",
        ";\n  border-radius: 20px;\n  margin: 1px auto;\n  max-width: 425px;\n  padding: 8px 14px;\n  width: -webkit-fit-content;\n  float: ",
        ";\n"
      ]
    )),
  function(props) {
    return props.me
      ? props.theme.bubbles.mineBackground
      : props.theme.bubbles.theirBackground;
  },
  function(props) {
    return props.me ? "right" : "left";
  }
);
var MessageUI = styled.p(
  templateObject_3 ||
    (templateObject_3 = __makeTemplateObject(
      [
        "\n  color: ",
        ";\n  font-size: ",
        ";\n  font-family: ",
        ";\n  font-weight: normal;\n  margin: 0;\n"
      ],
      [
        "\n  color: ",
        ";\n  font-size: ",
        ";\n  font-family: ",
        ";\n  font-weight: normal;\n  margin: 0;\n"
      ]
    )),
  function(props) {
    return props.me
      ? props.theme.bubbles.mineColor
      : props.theme.bubbles.theirColor;
  },
  function(props) {
    return props.theme.bubbles.messageFontSize;
  },
  function(props) {
    return props.theme.bubbles.messageFontFamily;
  }
);
function ChatBubble(props) {
  return createElement(
    ChatBubbleWrapper,
    null,
    createElement(
      ChatBubbleUI,
      { "data-test-id": "rcu-bubble", me: props.message.fromMe },
      createElement(
        MessageUI,
        { me: props.message.fromMe, "data-test-id": "rcu-bubble-text" },
        props.message.message
      )
    )
  );
}
var templateObject_1, templateObject_2, templateObject_3;

var BubbleGroupContainer = styled.div(
  templateObject_1$1 ||
    (templateObject_1$1 = __makeTemplateObject(
      ["\n  margin: 10px 0;\n  overflow: auto;\n  position: relative;\n"],
      ["\n  margin: 10px 0;\n  overflow: auto;\n  position: relative;\n"]
    ))
);
var BubbleGroupHeader = styled.h5(
  templateObject_2$1 ||
    (templateObject_2$1 = __makeTemplateObject(
      [
        "\n  margin: 0;\n  font-size: 14px;\n  font-weight: bold;\n  color: #999;\n  font-family: ",
        ";\n"
      ],
      [
        "\n  margin: 0;\n  font-size: 14px;\n  font-weight: bold;\n  color: #999;\n  font-family: ",
        ";\n"
      ]
    )),
  function(props) {
    return props.theme.fontFamily;
  }
);
function BubbleGroup(props) {
  var showSenderName = props.showSenderName,
    chatBubble = props.chatBubble,
    senderName = props.senderName,
    messages = props.messages;
  var ChatBubble$1 = chatBubble || ChatBubble;
  var sampleMessage = messages[0];
  return createElement(
    BubbleGroupContainer,
    { "data-test-id": "rcu-bubble-group" },
    showSenderName &&
      (senderName || sampleMessage.senderName) !== "" &&
      sampleMessage.fromMe === false &&
      createElement(
        BubbleGroupHeader,
        null,
        senderName || sampleMessage.senderName
      ),
    messages.map(function(message, i) {
      return createElement(ChatBubble$1, { key: i, message: message });
    })
  );
}
var templateObject_1$1, templateObject_2$1;

var styles = {
  chatInput: {
    flex: 1
  },
  inputStyle: {
    border: "none",
    borderTopWidth: "1",
    borderTopStyle: "solid",
    borderTopColor: "#ddd",
    fontSize: "16",
    outline: "none",
    padding: "30",
    width: "100%"
  }
};
var ChatInput = function(props) {
  var inputStyles = props.inputStyles,
    inputPlaceholder = props.inputPlaceholder;
  return createElement(
    "div",
    { className: "chat-input", style: styles.chatInput },
    createElement("input", {
      type: "text",
      style: inputStyles || styles.inputStyle,
      placeholder: inputPlaceholder
    })
  );
};

/**
 * A statndardized message object for use
 * in rendering messages in the chat feed.
 */
var Message = /** @class */ (function() {
  function Message(messageData) {
    this.senderId = messageData.senderId; // id of the sender (0 is reserved for "blue bubble")
    this.message = messageData.message;
    this.senderName = messageData.senderName || undefined;
    this.fromMe = messageData.fromMe;
  }
  return Message;
})();

var isMergeableObject = function isMergeableObject(value) {
  return isNonNullObject(value) && !isSpecial(value);
};

function isNonNullObject(value) {
  return !!value && typeof value === "object";
}

function isSpecial(value) {
  var stringValue = Object.prototype.toString.call(value);

  return (
    stringValue === "[object RegExp]" ||
    stringValue === "[object Date]" ||
    isReactElement(value)
  );
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === "function" && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 0xeac7;

function isReactElement(value) {
  return value.$$typeof === REACT_ELEMENT_TYPE;
}

function emptyTarget(val) {
  return Array.isArray(val) ? [] : {};
}

function cloneUnlessOtherwiseSpecified(value, options) {
  return options.clone !== false && options.isMergeableObject(value)
    ? deepmerge(emptyTarget(value), value, options)
    : value;
}

function defaultArrayMerge(target, source, options) {
  return target.concat(source).map(function(element) {
    return cloneUnlessOtherwiseSpecified(element, options);
  });
}

function getMergeFunction(key, options) {
  if (!options.customMerge) {
    return deepmerge;
  }
  var customMerge = options.customMerge(key);
  return typeof customMerge === "function" ? customMerge : deepmerge;
}

function getEnumerableOwnPropertySymbols(target) {
  return Object.getOwnPropertySymbols
    ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
        return target.propertyIsEnumerable(symbol);
      })
    : [];
}

function getKeys(target) {
  return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
}

function propertyIsOnObject(object, property) {
  try {
    return property in object;
  } catch (_) {
    return false;
  }
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target, key) {
  return (
    propertyIsOnObject(target, key) && // Properties are safe to merge if they don't exist in the target yet,
    !(
      Object.hasOwnProperty.call(target, key) && // unsafe if they exist up the prototype chain,
      Object.propertyIsEnumerable.call(target, key)
    )
  ); // and also unsafe if they're nonenumerable.
}

function mergeObject(target, source, options) {
  var destination = {};
  if (options.isMergeableObject(target)) {
    getKeys(target).forEach(function(key) {
      destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
    });
  }
  getKeys(source).forEach(function(key) {
    if (propertyIsUnsafe(target, key)) {
      return;
    }

    if (
      propertyIsOnObject(target, key) &&
      options.isMergeableObject(source[key])
    ) {
      destination[key] = getMergeFunction(key, options)(
        target[key],
        source[key],
        options
      );
    } else {
      destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
    }
  });
  return destination;
}

function deepmerge(target, source, options) {
  options = options || {};
  options.arrayMerge = options.arrayMerge || defaultArrayMerge;
  options.isMergeableObject = options.isMergeableObject || isMergeableObject;
  // cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
  // implementations can use it. The caller may not replace it.
  options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

  var sourceIsArray = Array.isArray(source);
  var targetIsArray = Array.isArray(target);
  var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

  if (!sourceAndTargetTypesMatch) {
    return cloneUnlessOtherwiseSpecified(source, options);
  } else if (sourceIsArray) {
    return options.arrayMerge(target, source, options);
  } else {
    return mergeObject(target, source, options);
  }
}

deepmerge.all = function deepmergeAll(array, options) {
  if (!Array.isArray(array)) {
    throw new Error("first argument should be an array");
  }

  return array.reduce(function(prev, next) {
    return deepmerge(prev, next, options);
  }, {});
};

var deepmerge_1 = deepmerge;

var cjs = deepmerge_1;

// Copyright 2017 Brandon Mowat
function mergeParentTheme(parentTheme) {
  return cjs(
    {
      bubbles: {
        mineBackground: "blue",
        mineColor: "#fff",
        theirBackground: "#ccc",
        theirColor: "#90909",
        messageFontSize: "14px",
        messageFontFamily: "system-ui"
      },
      fontFamily: "system-ui"
    },
    parentTheme || {}
  );
}
var ChatPanel = styled.div(
  templateObject_1$2 ||
    (templateObject_1$2 = __makeTemplateObject(
      [
        "\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  overflow: hidden;\n"
      ],
      [
        "\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  overflow: hidden;\n"
      ]
    ))
);
var ChatHistory = styled.div(
  templateObject_2$2 ||
    (templateObject_2$2 = __makeTemplateObject(
      [
        "\n  padding: 0 10px;\n  overflow: auto;\n  height: ",
        ";\n  max-height: ",
        ";\n"
      ],
      [
        "\n  padding: 0 10px;\n  overflow: auto;\n  height: ",
        ";\n  max-height: ",
        ";\n"
      ]
    )),
  function(props) {
    return props.maxHeight != null ? props.maxHeight + "px" : "auto";
  },
  function(props) {
    return props.maxHeight != null ? props.maxHeight + "px" : "auto";
  }
);
var TypingIndicator = styled.div(
  templateObject_3$1 ||
    (templateObject_3$1 = __makeTemplateObject(
      ["\n  margin: 10px 0;\n  overflow: auto;\n  position: relative;\n"],
      ["\n  margin: 10px 0;\n  overflow: auto;\n  position: relative;\n"]
    ))
);
// React component to render a complete chat feed
function ChatFeed(_a) {
  var messages = _a.messages,
    maxHeight = _a.maxHeight,
    isTyping = _a.isTyping,
    chatBubble = _a.chatBubble,
    showSenderName = _a.showSenderName,
    hasInputField = _a.hasInputField;
  var chat = useRef(null);
  useEffect(
    function() {
      var scrollHeight = chat.current.scrollHeight;
      var height = chat.current.clientHeight;
      var maxScrollTop = scrollHeight - height;
      chat.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    },
    [messages]
  );
  var inputField = hasInputField && createElement(ChatInput, null);
  var ChatBubble$1 = chatBubble || ChatBubble;
  var group = [];
  var messageNodes = messages.map(function(message, index) {
    group.push(message);
    // Find diff in message type or no more messages
    if (
      index === messages.length - 1 ||
      messages[index + 1].senderId !== message.senderId
    ) {
      var messageGroup = group;
      group = [];
      return createElement(BubbleGroup, {
        key: index,
        messages: messageGroup,
        id: message.senderId,
        showSenderName: showSenderName,
        chatBubble: ChatBubble$1
      });
    }
    return null;
  });
  // Other end is typing...
  if (isTyping) {
    messageNodes.push(
      createElement(
        TypingIndicator,
        { key: "is-typing" },
        createElement(ChatBubble$1, {
          message: new Message({
            fromMe: false,
            senderId: "1",
            message: "...",
            senderName: ""
          })
        })
      )
    );
  }
  return createElement(
    ThemeProvider,
    { theme: mergeParentTheme },
    createElement(
      ChatPanel,
      null,
      createElement(
        ChatHistory,
        { ref: chat, maxHeight: maxHeight },
        createElement("div", null, messageNodes)
      ),
      inputField
    )
  );
}
var templateObject_1$2, templateObject_2$2, templateObject_3$1;

export { BubbleGroup, ChatBubble, ChatFeed, ChatInput, Message };
