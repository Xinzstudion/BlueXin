import { XinializeError } from "serialize-error";
import Server from "../server/Server";

const GetGameValues = async (req: any, res: any) => {
  try {
    const gameServer = req.gameServer as Server;
    const gameValues = await gameServer.gameValues.getGameValues();
    res.send(gameValues);
  } catch (e) {
    res.status(515).send(XinializeError(e));
  }
};

export default GetGameValues;
