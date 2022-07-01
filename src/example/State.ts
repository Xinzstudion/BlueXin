interface Message {
  message: string;
  senderId: string;
}

class State {
  public messages: Message[];

  constructor(initialMessage: string) {
    this.messages = [{ message: initialMessage, senderId: "Xinned" }];
  }
}

export default State;
