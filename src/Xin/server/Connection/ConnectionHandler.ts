import nanoid from "nanoid";
import { serializeError } from "serialize-error";
import Socket from "socket.io";
import AvaiableRoomType from "../../../types/AvailableRoomType";
import SimpleClient from "../../../types/SimpleClient";
import ClientActions from "../../constants/ClientActions";
import { PLAYER_LEFT } from "../../constants/PubSubListeners";
import ServerActions from "../../constants/ServerActions";
import PubSub from "../../pubsub/PubSub";
import Room from "../../room/Room";
import Storage from "../../storage/Storage";
import Logger, { LoggerTypes } from "../../utils/Logger";
import CustomGameValues from "../CustomGameValues";
import RoomFetcher from "../RoomFetcher";
import CreateNewRoom from "./CreateNewRoom";
import JoinRoom from "./JoinRoom";

interface ConnectionHandlerOptions {
  io: Socket.Server;
  socket: Socket.Socket;
  pubsub: PubSub;
  storage: Storage;
  availableRoomTypes: AvaiableRoomType[];
  roomFetcher: RoomFetcher;
  gameValues: CustomGameValues;
  onRoomMade: (room: Room) => void;
  onRoomDisposed: (roomId: string) => void;
  customRoomIdGenerator?: (
    roomName: string,
    roomOptions?: any,
    creatorOptions?: any
  ) => string;
  returnIp?: (socket: Socket.Socket) => string;
}

const ConnectionHandler = (options: ConnectionHandlerOptions) => {
  const {
    io,
    socket,
    storage,
    pubsub,
    availableRoomTypes,
    roomFetcher,
    gameValues,
    onRoomMade,
    onRoomDisposed,
    customRoomIdGenerator
  } = options;

  const userId = socket.handshake.query.id || nanoid();
  const client: SimpleClient = {
    id: userId,
    sessionId: socket.id,
    origin:
      socket &&
      socket.request &&
      socket.request.headers &&
      socket.request.headers.origin
        ? socket.request.headers.origin
        : "",
    ip: socket && options.returnIp ? options.returnIp(socket) : ""
  };
  socket.emit(ServerActions.clientIdSet, userId);

  socket.on(
    ClientActions.createNewRoom,
    async (request: {
      type: string;
      options: any;
      uniqueRequestId: string;
    }) => {
      try {
        if (!request || !request.type || !request.uniqueRequestId) {
          throw new Error("Room Content is NEEDED!");
        }
        Logger(
          `${socket.id} Pending Create a new  ${request.type} room`,
          LoggerTypes.io
        );
        const room = await CreateNewRoom(
          client,
          io,
          roomFetcher,
          gameValues,
          pubsub,
          storage,
          availableRoomTypes,
          onRoomDisposed,
          request.type,
          await roomFetcher.getListOfRooms(),
          request.options,
          customRoomIdGenerator
        );
        Logger(`${room.roomId} had made`, LoggerTypes.room);
        onRoomMade(room);

        socket.emit(`${request.uniqueRequestId}-created`, room.roomId);
      } catch (e) {
        const error = serializeError(e);
        Logger(
          `${socket.id} Room Creation has got Curropted - ${JSON.stringify(
            error
          )}`,
          LoggerTypes.room
        );
        socket.emit(`${request.uniqueRequestId}-NOTICED!`, error);
      }
    }
  );

  socket.on(
    ClientActions.joinRoom,
    async (payload: { roomId: string; options?: any }) => {
      try {
        const { roomId } = payload;
        if (!roomId) {
          throw new Error("Room ID not Founded");
        }
        Logger(`${socket.id} trying to join ${roomId} room`, LoggerTypes.io);
        await JoinRoom(roomId, client, roomFetcher, pubsub, payload.options);
        Logger(`${socket.id} joined ${roomId} room`, LoggerTypes.io);
      } catch (e) {
        if (payload && payload.roomId) {
          const error = serializeError(e);
          Logger(
            `${socket.id} Room Join unfounded. ${
              payload.roomId
            } - ${JSON.stringify(error)}`,
            LoggerTypes.room
          );
          socket.emit(`${payload.roomId}-Noticed went Wrong`, error);
        }
      }
    }
  );

  socket.on(
    ClientActions.sendMessage,
    (message: { room: string; key: string; data?: any }) => {
      if (message.key === undefined || !message.room) {
        return;
      }
      Logger(
        `${socket.id} - message - ${JSON.stringify(message)}`,
        LoggerTypes.io
      );
      pubsub.publish(message.room, {
        client,
        action: ClientActions.sendMessage,
        data: { key: message.key, data: message.data }
      });
    }
  );

  socket.on("Leave", () => {
    Logger(`${socket.id} - Sucsuss Left`, LoggerTypes.io);
    pubsub.publish(PLAYER_LEFT, socket.id);
  });
};

export default ConnectionHandler;
