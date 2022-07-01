import { serializeError } from "serialize-error";
import Server from "../server/Server";

const SetGameValues = async (req: any, res: any) => {
  try {
    const gameServer = req.gameServer as Server;
    await gameServer.gameValues.setGlobalGameValuesObject(req.body);
    res.send("Good to go");
  } catch (e) {
    res.status(506).send(serializeError(e));
  }
};

export default SetGameValues;
