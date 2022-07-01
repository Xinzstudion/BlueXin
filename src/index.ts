import EventEmitterPubSub from "./Xin/pubsub/EventEmitter";
import * as EventEmitterClusterPubsub from "./Xin/pubsub/EventEmitterCluster";
import XinEubPubSub from "./Xin/pubsub/PubSub";
import RabbitMQPubSub from "./Xin/pubsub/RabbitMQ";
import RedisPubSub from "./Xin/pubsub/Redis";
import Client from "./Xin/room/Client";
import XinRoom from "./Xin/room/Room";
import XinsServer from "./Xin/server/Server";
import XiClusterMemoryStorage from "./Xin/storage/ClusterMemory";
import MemoryStorage from "./Xin/storage/Memory";
import RedisStorage from "./Xin/storage/Redis";
import BartlettStorage from "./Xin/storage/Storage";
import inSimpleClient from "./types/SimpleClient";

export interface EntityMap<T> {
  [entityId: string]: T;
}

export {
  XinsServer,
  XinRoom,
  Client,
  inSimpleClient,
  XinEubPubSub,
  RedisPubSub,
  EventEmitterPubSub,
  RabbitMQPubSub,
  BartlettStorage,
  RedisStorage,
  MemoryStorage,
  EventEmitterClusterPubsub,
  XiClusterMemoryStorage
};
