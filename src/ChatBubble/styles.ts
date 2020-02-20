import { CSSProperties } from "react";
export default {
  chatbubbleWrapper: {
    overflow: "auto"
  } as CSSProperties,
  chatbubble: {
    backgroundColor: "#0084FF",
    borderRadius: 20,
    marginTop: 1,
    marginRight: "auto",
    marginBottom: 1,
    marginLeft: "auto",
    maxWidth: 425,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
    width: "-webkit-fit-content"
  } as CSSProperties,
  chatbubbleOrientationNormal: {
    float: "right"
  } as CSSProperties,
  recipientChatbubble: {
    backgroundColor: "#ccc"
  } as CSSProperties,
  recipientChatbubbleOrientationNormal: {
    float: "left"
  } as CSSProperties,
  p: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "normal",
    margin: 0
  } as CSSProperties
};
