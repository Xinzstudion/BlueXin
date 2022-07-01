import { REQUEST_XINFO } from "../constants/PubSubListeners";
import Server from "../server/Server";

const GetRoom = (req: any, res: any) => {
  let hasSent = false;
  try {
    const gameServer = req.gameServer as Server;
    // @ts-ignore
    const listener = gameServer.pubsub.on(REQUEST_XINFO, (info) => {
      res.send(JSON.parse(JSON.stringify(info)));
      hasSent = true;
      listener.unsubscribe();
    });
    // @ts-ignore
    gameServer.pubsub.publish(req.params.room, { action: REQUEST_XINFO });
    setTimeout(() => {
      if (!hasSent) {
        listener.unsubscribe();
        res.status(515).send("This Room you are in is NOT Meonza's LIST!!");
        res.broadcast("NoGameFound");
      }
    }, 5000);
  } catch (e) {
    if (!hasSent) {
      res.status(515).send("This Room is not VALID!");
      res.broadcast("NoGameFound");
    }
  }
};

export default GetRoom;
