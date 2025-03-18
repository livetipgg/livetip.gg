/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "@/features/auth/states/atoms";
import { ModeToggle } from "@/components/mode-toggle";
import { useLoadTransmissionMessagesUseCase } from "@/features/messages/useCases/useLoadTransmissionMessagesUseCase";

import { useWebSocket } from "@/config/WebSocketProvider";
import notificationAudio from "@/assets/notification-sound.wav";
import { paymentDonateState } from "@/features/carteira/states/atoms";
import { IPaymentDonateState } from "@/features/carteira/contracts/IRecoilState";
import { Logotipo } from "@/components/logotipo";

import { TransmissionUserHeader } from "./components/transmission-user-header";
import { TransmissionMessages } from "./components/transmission-messages";
import { TransmissionMessagesFilter } from "./components/transmission-messages-filter";
import { useIsMobile } from "@/hooks/use-mobile";
import { UserQrCode } from "@/components/user-qrcode";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { messageState } from "@/features/messages/states/atoms";
import { format } from "date-fns";

const TransmissionPage = () => {
  const [processedMessages, setProcessedMessages] = useState(new Set());
  const { controller, transmissionMessages } = useRecoilValue(messageState);
  const audio = new Audio(notificationAudio);
  const setPaymentDonateState = useSetRecoilState(paymentDonateState);
  const { user } = useRecoilValue(authState);
  const isMobile = useIsMobile();
  const { loadTransmissionMessages } = useLoadTransmissionMessagesUseCase();
  const today = new Date();
  const date = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(today);

  window.document.title = `LiveTip - Apresentação - ${date}`;

  const loadAudio = () => {
    audio.load();

    audio.volume = 0.1;
  };
  const socket = useWebSocket();
  const connectSocket = useCallback(() => {
    if (!socket || socket.connected) return;

    socket.connect();

    socket.on("connect", () => {
      socket.emit("join_room", {
        room: `private-${user.id}`,
        token: user.token,
      });
    });

    socket.on("message", (response) => {
      const message = JSON.parse(response);

      if (message && message.sender && !processedMessages.has(message.id)) {
        setProcessedMessages((prev) => new Set(prev).add(message.id));

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

        audio.play().catch((error) => {
          console.error("Erro ao reproduzir som:", error);
        });
      }
    });

    socket.on("disconnect", () => {
      reconnectSocket();
    });
  }, []);

  const reconnectSocket = useCallback(() => {
    setTimeout(() => {
      connectSocket();
    }, 5000);
  }, [connectSocket]);

  useEffect(() => {
    loadAudio();
    connectSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    loadTransmissionMessages({});
  }, []);

  return (
    <>
      <div className="w-full h-32 bg-muted/80 relative mb-10"></div>
      {!isMobile && (
        <UserQrCode
          user={user}
          className="fixed top-1 right-1 xl:top-10 xl:right-10  z-[9999] "
        />
      )}
      <div className="absolute top-0 w-full  px-4 flex items-center justify-between">
        <Logotipo classname="w-32" />
        <ModeToggle className="bg-background   shadow-sm  flex md:hidden  border" />
      </div>
      <div className="absolute w-full top-8">
        <div className="max-w-4xl h-screen m-auto p-10 ">
          <TransmissionUserHeader user={user} />
          {!!transmissionMessages.results.length && (
            <div className="flex items-center justify-end ">
              <Button
                onClick={() => {
                  const start = new Date();
                  start.setDate(start.getDate());
                  start.setHours(0, 0, 0, 0);

                  const end = new Date();
                  end.setDate(end.getDate() + 1);
                  end.setHours(23, 59, 59, 999);

                  const startDate =
                    controller.transmissionMessagesParams.startDate ||
                    format(start, "yyyy-MM-dd");
                  const endDate =
                    controller.transmissionMessagesParams.endDate ||
                    format(end, "yyyy-MM-dd");

                  // Constroi a URL com os parâmetros
                  const url = new URL(
                    `${window.location.origin}/transmissao/expanded`
                  );
                  url.searchParams.append("startDate", startDate.toString());
                  url.searchParams.append("endDate", endDate.toString());

                  // Abre a URL em uma nova aba
                  window.open(url.toString(), "_blank");
                }}
                title="Expandir mensagem"
                size={isMobile ? "icon" : "default"}
                variant="link"
                className="flex items-center gap-2"
              >
                {!isMobile && "Expandir mensagens"}
                <ExternalLink className="w-4 h-full" />
              </Button>
            </div>
          )}

          <TransmissionMessagesFilter />
          <TransmissionMessages />
        </div>
      </div>
    </>
  );
};

export default TransmissionPage;
