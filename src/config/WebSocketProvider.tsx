/* eslint-disable react-refresh/only-export-components */
// src/WebSocketProvider.tsx
import { IPaymentDonateState } from "@/features/carteira/contracts/IRecoilState";
import { paymentDonateState } from "@/features/carteira/states/atoms";
import { messageState } from "@/features/messages/states/atoms";
import socket from "@/socket";
import React, { createContext, useContext, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
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
  const setMessagesState = useSetRecoilState(messageState);
  const [paymentState, setPaymentDonateState] =
    useRecoilState(paymentDonateState);
  useEffect(() => {
    socket.connect();
    socket.on("connection", () => {});

    socket.on("joined_room", (room) => {
      console.log(`Joined room: ${room}`);
    });

    socket.on("message", (message) => {
      console.log("Received message:", message);

      console.log("Payment state:", paymentState);
      setPaymentDonateState((prev: IPaymentDonateState) => ({
        ...prev,
        content: {
          amount: "",
          content: "",
          currency: "BRL",
          sender: "",
        },
        controller: {
          ...prev.controller,
          currentStep: "SUCCESS",
        },
      }));
    });

    socket.on("message", (message) => {
      const parsedMessage = JSON.parse(message);
      console.log("Parsed message:", parsedMessage);
      setMessagesState((prev) => ({
        ...prev,
        transmissionMessages: {
          ...prev.transmissionMessages,
          results: [parsedMessage, ...prev.transmissionMessages.results],
        },
      }));
    });

    socket.on("connect_error", (err) => {
      console.error("Connection Error:", err);
    });

    const intervalId = setInterval(() => {
      socket.emit("heartbeat");
      console.log("Heartbeat");
    }, 5000);

    return () => {
      socket.off("message");

      clearInterval(intervalId);
      socket.disconnect();
      console.log("Socket disconnected");
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
