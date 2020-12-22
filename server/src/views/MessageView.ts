import Message from '@models/MessageModel';

export default {
  render(message: Message) {
    return {
      message: message.message,
      signature: message.signature,
    };
  },

  renderMany(messages: Message[]) {
    return messages.map((message) => this.render(message));
  },
};
