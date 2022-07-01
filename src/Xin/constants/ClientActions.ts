/**
 * List of actions sent from the client
 */

const ClientActions = {
  createNewRoom: "blueXin_CREATE_NEW_ROOM",
  joinRoom: "blueXin_JOIN_ROOM",
  sendMessage: "blueXin_SEND_MESSAGE",
  listen: "blueXin_LISTEN_STATE",
  requestAvailableRooms: "blueXin_AVAILABLE_ROOMS",
  ping: "blueXin-ping"
};

export default ClientActions;
