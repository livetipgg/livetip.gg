// src/socket.ts
import { io, Socket } from "socket.io-client";

const URL = "wss://live-pix-service-dot-livechat-437913.uc.r.appspot.com";
// const URL = "ws://localhost:3000";
const socket: Socket = io(URL, {
  autoConnect: true,
  transports: ["websocket"],
});

export default socket;
