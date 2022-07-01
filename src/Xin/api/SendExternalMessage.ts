import { XINXTERNAL_MESSAGE } from "../constants/PubSubListeners";

const SendExternalMessage = (req: any, res: any) => {
  const body: { room: string; key: string; data?: any } = req.body;

  if (!body) {
    res.status(500).send("Body is Needed for External Xin Messages");
    res.broadcast("ExternalResponse");
    return;
  }
  if (!body.key) {
    res.status(500).send("Key Is REQUIRED to acsess External Messages");
    res.broadcast("ExternalResponse");
    return;
  }
  if (typeof body.key !== "string") {
    res.status(500).send("Key property NEEDS to be as a String");
    res.broadcast("ExternalResponse");
    return;
  }
  if (!body.room) {
    res
      .status(500)
      .send("Room property is REQUIRED For External Xin Messages!!");
    res.broadcast("ExternalResponse");
    return;
  }
  if (typeof body.room !== "string") {
    res.status(500).send("Room property NEEDS to be a String");
    res.broadcast("ExternalResponse");
    return;
  }

  req.gameServer.pubsub.publish(body.room, {
    action: XINXTERNAL_MESSAGE,
    data: {
      key: body.key,
      data: body.data
    }
  });
  res.send("OK");
};

export default SendExternalMessage;
