// src/socket.ts
import { io, Socket } from "socket.io-client";

const URL = "wss://live-pix-service-dot-livechat-437913.uc.r.appspot.com";
// const URL = "ws://localhost:3000";
const socket: Socket = io(URL, {
  autoConnect: false,
  transports: ["websocket", "polling"],
  reconnectionAttempts: 5, // Tenta reconectar até 5 vezes
  timeout: 20000,
});

export default socket;
