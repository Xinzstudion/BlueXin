import { EventEmitter } from "events";

const Emitter = new EventEmitter();
Emitter.setMaxListeners(5135);

export default Emitter;
