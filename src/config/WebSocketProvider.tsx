/* eslint-disable react-refresh/only-export-components */
// src/WebSocketProvider.tsx
import socket from "@/socket";
import React, { createContext, useContext, useEffect } from "react";
import { Socket } from "socket.io-client";

type WebSocketContextType = {
  socket: Socket;
};

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    socket.connect();
    socket.on("connection", () => {});

    socket.on("joined_room", (room) => {
      console.log(`Joined room: ${room}`);
    });

    socket.on("connect_error", (err) => {
      console.error("Connection Error:", err);
    });

    const intervalId = setInterval(() => {
      socket.emit("heartbeat");
      console.log("Heartbeat sent");
    }, 5000);

    return () => {
      socket.off("joined_room");
      socket.off("connect_error");
      socket.off("heartbeat");
      socket.off("connection");
      socket.off("message");

      clearInterval(intervalId);
      socket.disconnect();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ socket }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context.socket;
};

export default WebSocketProvider;
