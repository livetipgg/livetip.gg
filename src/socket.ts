// src/socket.ts
import { io, Socket } from "socket.io-client";

// Configure the URL for the Socket.IO server
const URL =
  "https://live-pix-service-dot-livechat-437913.uc.r.appspot.com/api/v1/";

// Initialize the socket instance
const socket: Socket = io(URL, {
  autoConnect: false, // Only connect when necessary
});

export default socket;
