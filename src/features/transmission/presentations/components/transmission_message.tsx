import PaymentIcon from "@/components/payment-icon";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { IMessage } from "@/features/messages/contracts/IRecoilState";
import { messageState } from "@/features/messages/states/atoms";
import { useSetMessageReadUseCase } from "@/features/messages/useCases/useSetMessageReadUseCase";
import { formatPayment } from "@/helpers/formatPayment";
import { useIsMobile } from "@/hooks/use-mobile";
import { format } from "date-fns";
import { ExternalLink, MailCheck, MailX } from "lucide-react";
import { useRecoilValue } from "recoil";

export const TransmissionMessage = ({ message }: { message: IMessage }) => {
  const { setMessageRead, setMessageUnread } = useSetMessageReadUseCase();
  const { controller } = useRecoilValue(messageState);
  const isMobile = useIsMobile();
  const { isLoadingTransmissionMessages } = controller;
  return (
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
            <span className="font-semibold text-white">{message.sender}</span>
          </div>
          <div className="w-10 h-10 ml-2 bg-card-custom border p-1 rounded-md  -top-4 ">
            <PaymentIcon currency={message.currency} />
          </div>
        </div>
        <div className="flex items-center gap-2">
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
            title={message.read ? "Marcar como não lido" : "Marcar como lido"}
          >
            {message.read ? (
              <div className="flex items-center gap-2">
                <MailX className="w-4 h-4" />
              </div>
            ) : (
              <MailCheck className="w-4 h-4" />
            )}
          </Button>
          {!message.read && (
            <AlertDialog
              onOpenChange={(open) => {
                if (!open) {
                  if (message.read) return;
                  setMessageRead(message._id);
                }
              }}
            >
              <AlertDialogTrigger>
                <Button
                  title="Expandir mensagem"
                  size={isMobile ? "icon" : "default"}
                  variant="secondary"
                  className="flex items-center gap-2 "
                >
                  {!isMobile && "Expandir"}
                  <ExternalLink className="w-4   h-full" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent
                className="flex flex-col"
                style={{
                  width: "100%",
                  height: "100%",
                  maxWidth: "800px",
                  maxHeight: "500px",
                  minWidth: "300px",
                }}
              >
                <div className="h-fit mb-2">
                  <div className="flex items-center  ">
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
                    <div className="w-10 h-10 ml-2 bg-card-custom border p-1 rounded-md  -top-4 ">
                      <PaymentIcon currency={message.currency} />
                    </div>
                  </div>
                </div>
                <p className="break-words max-w-full overflow-auto text-4xl flex-1">
                  {message.content}
                </p>
                <AlertDialogFooter className="flex items-end">
                  <AlertDialogCancel
                    onClick={() => {
                      if (message.read) return;
                      setMessageRead(message._id);
                    }}
                  >
                    Voltar
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
      <div
        className={`rounded-lg border ${
          message.read ? "" : "border-primary"
        }  mt-2`}
      >
        <div className="p-2 flex gap-2 h-auto items-start whitespace-normal max-w-full">
          <span className="text-muted-foreground text-sm">
            {format(message.timestamp, "HH:mm")}
          </span>
          <p className="break-words max-w-full overflow-auto">
            {message.content}
          </p>
        </div>
      </div>
    </>
  );
};
