import cors from "cors";
import Express from "express";
import { EventEmitterPubSub, MemoryStorage, Server } from "../index";
import ChatRoom from "./ChatRoom";

const redisOptions = {
  host: "localhost",
  port: 6151
};

const start = async () => {
  try {
    const app = Express();
    app.use(cors());
    app.options("*", cors());
    const server = new Server({
      app,
      storage: MemoryStorage(),
      transports: ["polling", "websocket"],
      pubsub: EventEmitterPubSub(),
      redis: redisOptions,
      admins: { blueboat: "pass" }
    });
    server.registerRoom("Chat", ChatRoom);
    server.listen(4110, () => {
      console.log("Server listening on port 4110");
    });
  } catch (e) {
    console.log(e);
  }
};

start();
