/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import { setDocumentTitle } from "@/helpers/setDocumentTitle";
import { useCustomSonner } from "@/hooks/useCustomSonner";
import { Copy, MailCheck, MailX } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
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
import socket from "@/socket";

const TransmissionPage = () => {
  const { user } = useRecoilValue(authState);
  const { transmissionMessages } = useRecoilValue(messageState);
  const { successSonner } = useCustomSonner();
  const { loadTransmissionMessages } = useLoadTransmissionMessagesUseCase();
  const { setMessageRead, setMessageUnread } = useSetMessageReadUseCase();
  const navigate = useNavigate();
  const today = new Date();

  const date = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(today);

  useEffect(() => {
    console.log(socket);
    // Connect to the server when the component mounts
    socket.connect();

    // Cleanup when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    setDocumentTitle(`Transmissão - ${date}`);
  }, [date]);

  useEffect(() => {
    loadTransmissionMessages();
  }, []);

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
                    src="https://musicaecinema.com/wp-content/uploads/2024/02/the-office-how-to-watch.jpg"
                    className="object-cover"
                  />
                  <AvatarFallback></AvatarFallback>
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
                      navigate(`/${user.username}`, {
                        relative: "path",
                      });
                    }}
                  >
                    http://localhost:5173/{user.username}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        ` http://localhost:5173/${user.username}`
                      );

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
            <strong className="text-sm md:text-lg">
              Mensagens da transmissão ({transmissionMessages.results.length})
            </strong>
            <div className="flex flex-col">
              {!transmissionMessages.results.length && (
                <NoContent message="Nenhuma mensagem para mostrar" />
              )}
              {!!transmissionMessages.results.length &&
                transmissionMessages.results.map((message) => (
                  <>
                    <div className="flex items-center justify-between mt-5">
                      <div className="flex items-center">
                        <div className="bg-success p-2 rounded-s-lg ">
                          <span className="text-white font-semibold">
                            {formatPayment({
                              amount: message.amount,
                              type: message.currency,
                            })}
                          </span>
                        </div>
                        <div className="p-2 bg-primary rounded-e-lg">
                          <span className="font-semibold text-white">
                            {message.sender}
                          </span>
                        </div>
                        <div className="w-6 h-6 ml-2 bg-muted/40 border p-1 rounded-md  -top-4 ">
                          <PaymentIcon currency={message.currency} />
                        </div>
                      </div>
                      <Button
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
                        title="Marcar como lido"
                      >
                        {message.read ? (
                          <MailX className="w-4 h-4" />
                        ) : (
                          <MailCheck className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    <div className="rounded-lg border border-primary mt-2">
                      <p className="p-2 flex gap-2 items-center">
                        {/* Horário */}
                        <span className="text-muted-foreground text-sm">
                          {format(message.timestamp, "HH:mm")}
                        </span>
                        {message.content}
                      </p>
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
