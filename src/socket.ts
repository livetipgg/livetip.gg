// src/socket.ts
import { io, Socket } from "socket.io-client";

const URL = "wss://live-pix-service-dot-livechat-437913.uc.r.appspot.com";

const socket: Socket = io(URL, {
  autoConnect: false,
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionAttempts: 5,
  timeout: 20000,
  protocols: ["websocket", "polling"],
});

export default socket;
