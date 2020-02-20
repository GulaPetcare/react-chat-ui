/**
 * A statndardized message object for use
 * in rendering messages in the chat feed.
 */

interface MessageData {
  message: string;
  senderId: string;
  fromMe: boolean;
  senderName?: string;
}

export default class Message {
  /**
   * Message object for organizing and storing current message data.
   */
  senderId: string;
  message: string;
  senderName?: string;
  fromMe: boolean;

  constructor(messageData: MessageData) {
    this.senderId = messageData.senderId; // id of the sender (0 is reserved for "blue bubble")
    this.message = messageData.message;
    this.senderName = messageData.senderName || undefined;
    this.fromMe = messageData.fromMe;
  }
}
