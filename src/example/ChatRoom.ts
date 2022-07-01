import { Client, Room } from "../index";
import State from "./State";

class ChatRoom extends Room<State> {
  broadcast(arg0: string) {
    throw new Error("Method not implemented.");
  }
  public async onCreate() {
    try {
      this.setState(
        new State(
          this.initialGameValues.initialBotMessage || "Welcome to the chat!"
        )
      );
    } catch (e) {
      throw e;
    }
  }

  public onJoin(client: Client) {
    this.catchUp(client);
  }

  public onMessage(client: Client, action: string, data?: any) {
    if (!action) {
      return;
    }
    if (action === "LATENCY") {
      client.send("LATENCY", data);
    }
    if (action === "CHAT") {
      this.addMessage(data, client.id);
    }
  }

  public async beforeDispose() {
    this.broadcast("DISPOSED");
  }

  public onLeave = async (client: Client) => {
    const reconnected = await this.allowReconnection(client, 30);
    if (reconnected) {
      return;
    }
    this.addMessage(`${client.id} has left the room`, "Farwell");
    this.broadcast("LeavingRoom");
  };

  private addMessage = (text: string, senderId: string) => {
    const message = { message: text, senderId };
    this.state.messages.push(message);
    this.broadcast("MESSAGE", message);
  };

  private catchUp = (client: Client) =>
    client.send("MESSAGES", this.state.messages);
}

export default ChatRoom;
