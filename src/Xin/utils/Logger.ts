export const LoggerTypes = {
  server: "SERVER",
  room: "ROOM",
  io: "IO"
};

const Logger = (message: string, type: string) => {
  if (process.env.BLUXINLOG) {
    console.log(`[${type}] - ${message}`);
  }
};

export default Logger;
