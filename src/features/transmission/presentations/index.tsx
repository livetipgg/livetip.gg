/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import { useCustomSonner } from "@/hooks/useCustomSonner";
import { Copy, MailCheck, MailX, RefreshCw, User } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "@/features/auth/states/atoms";
import { ModeToggle } from "@/components/mode-toggle";
import { useLoadTransmissionMessagesUseCase } from "@/features/messages/useCases/useLoadTransmissionMessagesUseCase";
import { messageState } from "@/features/messages/states/atoms";
import { NoContent } from "@/components/no-content";
import { formatPayment } from "@/helpers/formatPayment";
import PaymentIcon from "@/components/payment-icon";
import { useSetMessageReadUseCase } from "@/features/messages/useCases/useSetMessageReadUseCase";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useWebSocket } from "@/config/WebSocketProvider";
import notificationAudio from "@/assets/notification-sound.wav";
import { paymentDonateState } from "@/features/carteira/states/atoms";
import { IPaymentDonateState } from "@/features/carteira/contracts/IRecoilState";

const TransmissionPage = () => {
  const setMessagesState = useSetRecoilState(messageState);
  const [processedMessages, setProcessedMessages] = useState(new Set());
  const audio = new Audio(notificationAudio);
  const setPaymentDonateState = useSetRecoilState(paymentDonateState);
  const socket = useWebSocket();
  const { user } = useRecoilValue(authState);
  const { transmissionMessages, controller } = useRecoilValue(messageState);
  const { isLoadingTransmissionMessages } = controller;
  const { successSonner } = useCustomSonner();
  const { loadTransmissionMessages } = useLoadTransmissionMessagesUseCase();
  const { setMessageRead, setMessageUnread } = useSetMessageReadUseCase();
  const today = new Date();
  const date = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(today);

  const loadAudio = () => {
    audio.load();

    audio.volume = 0.1;
  };

  // Função para reestabelecer a conexão se o socket cair
  const connectSocket = useCallback(() => {
    console.log(socket);
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

      console.log("Recebeu mensagem", message);
      console.log("teste");
      if (message && message.sender && !processedMessages.has(message.id)) {
        setProcessedMessages((prev) => new Set(prev).add(message.id));

        if (
          !transmissionMessages.results.some((msg) => msg._id === message._id)
        ) {
          setMessagesState((prev) => ({
            ...prev,
            transmissionMessages: {
              ...prev.transmissionMessages,
              results: [message, ...prev.transmissionMessages.results],
            },
          }));
        }

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
      console.log("Desconectado. Tentando reconectar...");
      reconnectSocket();
    });
  }, []);

  const reconnectSocket = useCallback(() => {
    setTimeout(() => {
      console.log("Tentando reconectar o WebSocket...");
      connectSocket();
    }, 5000);
  }, [connectSocket]);

  useEffect(() => {
    loadAudio();
    connectSocket();

    return () => {
      if (socket) {
        socket.disconnect();
        console.log("Socket desconectado");
      }
    };
  }, [connectSocket, socket]);

  useEffect(() => {
    loadTransmissionMessages();
  }, []);

  const url = import.meta.env.PROD
    ? import.meta.env.VITE_PRODUCTION_URL
    : import.meta.env.VITE_DEVELOPMENT_URL;
  return (
    <>
      <div className="w-full h-32 bg-muted/80 relative mb-10"></div>
      <div className="absolute w-full top-8">
        <div className="max-w-4xl h-screen m-auto p-10 ">
          <div className=" flex items-centermb-5 justify-center md:justify-between  flex-wrap">
            <div className="flex items-center justify-center flex-wrap  gap-4">
              <div className="w-28 h-28 bg-background rounded-full flex items-center justify-center  shadow-md p-1">
                <Avatar className="cursor-pointer w-full h-full">
                  <AvatarImage
                    // src="https://musicaecinema.com/wp-content/uploads/2024/02/the-office-how-to-watch.jpg"
                    className="object-cover"
                  />
                  <AvatarFallback>
                    <User className="w-10 h-10 text-gray-500" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col  w-full md:w-fit text-center">
                <strong className="text-xl bg-background px-4 py-2 rounded-md shadow-sm">
                  {user.username}
                </strong>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 ">
              <div className="max-w-fit bg-background shadow-sm">
                <div className="border rounded flex items-center ">
                  <Button
                    className="text-secondary"
                    variant="link"
                    onClick={() => {
                      navigator.clipboard.writeText(`${url}${user.username}`);

                      successSonner("Link copiado com sucesso!");
                    }}
                  >
                    {url}
                    {user.username}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      navigator.clipboard.writeText(`${url}${user.username}`);

                      successSonner("Link copiado com sucesso!");
                    }}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar
                  </Button>
                </div>
              </div>
              <div className="bg-background shadow-sm border">
                <ModeToggle />
              </div>
            </div>
          </div>
          <div className="my-5 text-md md:text-2xl">
            <strong>{`Transmissão - ${date}`}</strong>
          </div>

          <div className="space-y-5 pb-10">
            <div className="flex items-center justify-between">
              <strong className="text-sm md:text-lg">
                Mensagens do dia ({transmissionMessages.results.length})
              </strong>

              <Button
                variant={"outline"}
                className={`${
                  isLoadingTransmissionMessages ? "text-muted-foreground" : ""
                }`}
                title="Atualizar"
                onClick={() => {
                  loadTransmissionMessages();
                }}
                disabled={isLoadingTransmissionMessages}
              >
                <span className="mr-2">Atualizar</span>
                <RefreshCw
                  className={`w-4 h-4 mb-0 ${
                    isLoadingTransmissionMessages ? "animate-spin" : ""
                  }`}
                />
              </Button>
            </div>
            <div className="flex flex-col">
              {!transmissionMessages.results.length && (
                <NoContent message="Nenhuma mensagem para mostrar" />
              )}

              {!!transmissionMessages.results.length &&
                transmissionMessages.results.map((message) => (
                  <>
                    <div className="flex items-center justify-between mt-5">
                      <div className="flex items-center ">
                        <div
                          className={`${
                            message.read ? "bg-gray-500" : "bg-success"
                          } p-2 rounded-s-lg `}
                        >
                          <span className="text-white font-semibold">
                            {formatPayment({
                              amount: message.amount,
                              type: message.currency,
                            })}
                          </span>
                        </div>
                        <div
                          className={`p-2 ${
                            message.read ? "bg-gray-400" : "bg-primary"
                          } rounded-e-lg`}
                        >
                          <span className="font-semibold text-white">
                            {message.sender}
                          </span>
                        </div>
                        <div className="w-6 h-6 ml-2 bg-muted/40 border p-1 rounded-md  -top-4 ">
                          <PaymentIcon currency={message.currency} />
                        </div>
                      </div>
                      <Button
                        disabled={isLoadingTransmissionMessages}
                        onClick={() => {
                          if (message.read) {
                            setMessageUnread(message._id);
                          }

                          if (!message.read) {
                            setMessageRead(message._id);
                          }
                        }}
                        variant="outline"
                        size={"icon"}
                        title={
                          message.read
                            ? "Marcar como não lido"
                            : "Marcar como lido"
                        }
                      >
                        {message.read ? (
                          <div className="flex items-center gap-2">
                            <MailX className="w-4 h-4" />
                          </div>
                        ) : (
                          <MailCheck className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    <div
                      className={`rounded-lg border ${
                        message.read ? "" : "border-primary"
                      }  mt-2`}
                    >
                      <div className="p-2 flex gap-2 h-auto items-start whitespace-normal max-w-full">
                        {/* Horário */}
                        <span className="text-muted-foreground text-sm">
                          {format(message.timestamp, "HH:mm")}
                        </span>
                        <p className="break-words max-w-full overflow-auto">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransmissionPage;
