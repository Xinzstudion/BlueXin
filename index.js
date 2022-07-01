import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Gameid from "./Gameid/Gameid.js";
import Externalproove from "./Externalproove/Externalproove.js";
import Absent from "./Absent/Absent.js";
import LeavingRoom from "./LeavingRoom/LeavingRoom.js";


const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Gameid: new Gameid({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 101.1,
    visible: false
  }),

  Externalproove: new Externalproove({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false
  })
  Absent: new Absent({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false
  })
  LeavingRoom: new LeavingRoom({
    x: 0,
    y: -326,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false
  })

  