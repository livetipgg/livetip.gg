import { messageState } from "@/features/messages/states/atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { useLoadTransmissionMessagesUseCase } from "@/features/messages/useCases/useLoadTransmissionMessagesUseCase";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import PaymentIcon from "@/components/payment-icon";
import { formatPayment } from "@/helpers/formatPayment";
import { Button } from "@/components/ui/button";
import { useSetMessageReadUseCase } from "@/features/messages/useCases/useSetMessageReadUseCase";
import { GlobalLoader } from "@/components/global-loader";
import { Logotipo } from "@/components/logotipo";
import { BorderBeam } from "@/components/ui/border-beam";

export const TransmissionExpandedPage = () => {
  const [searchParams] = useSearchParams();
  const setMessageState = useSetRecoilState(messageState);
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const { setMessageRead } = useSetMessageReadUseCase();

  const [currentMessage, setCurrentMessage] = useState(null);
  const { transmissionMessages, controller } = useRecoilValue(messageState);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    console.log("currentMessage", currentMessage);
    if (!currentMessage.read) {
      setMessageRead(currentMessage._id);
    }

    if (currentIndex < transmissionMessages.results.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const { loadTransmissionMessages } = useLoadTransmissionMessagesUseCase();

  useEffect(() => {
    setMessageState((prevState) => ({
      ...prevState,
      controller: {
        ...prevState.controller,
        transmissionMessagesParams: {
          ...prevState.controller.transmissionMessagesParams,
          startDate: format(startDate, "yyyy-MM-dd"),
          endDate: format(endDate, "yyyy-MM-dd"),
        },
      },
    }));

    if (
      controller.transmissionMessagesParams.startDate &&
      controller.transmissionMessagesParams.endDate
    ) {
      loadTransmissionMessages();

      setCurrentMessage(transmissionMessages.results[currentIndex]);
    }
  }, [
    controller.transmissionMessagesParams.startDate,
    controller.transmissionMessagesParams.endDate,
  ]);

  useEffect(() => {
    setCurrentMessage(transmissionMessages.results[currentIndex]);
  }, [currentIndex, transmissionMessages]);

  if (controller.isLoadingTransmissionMessages) {
    return <GlobalLoader />;
  }

  return (
    <div className="flex flex-col justify-center h-screen w-screen items-center">
      <Logotipo classname="w-32 absolute top-0" />
      {currentMessage && (
        <div className="flex flex-col justify-between  border p-4  shadow-lg  max-w-md relative h-[300px] w-[400px] rounded-xl">
          <BorderBeam colorFrom="#FD451C" colorTo="#fd451c24" borderWidth={2} />

          <div className="flex items-center ">
            <div
              className={`${
                currentMessage.read ? "bg-gray-500" : "bg-success"
              } p-2 rounded-s-lg `}
            >
              <span className="text-white font-semibold">
                {formatPayment({
                  amount: currentMessage.amount,
                  type: currentMessage.currency,
                })}
              </span>
            </div>
            <div
              className={`p-2 ${
                currentMessage.read ? "bg-gray-400" : "bg-blue-600"
              } rounded-e-lg`}
            >
              <span className="font-semibold text-white">
                {currentMessage.sender}
              </span>
            </div>
            <div className="w-10 h-10 ml-2 bg-card-custom border p-1 rounded-md  -top-4 ">
              <PaymentIcon currency={currentMessage.currency} />
            </div>
          </div>
          <div className="p-2 flex gap-2 h-auto items-start whitespace-normal max-w-full">
            <span className="text-muted-foreground text-sm">
              {format(currentMessage.timestamp, "HH:mm")}
            </span>
            <p className="break-words max-w-full overflow-auto">
              {currentMessage.content}
            </p>
          </div>
          <div className="mt-4 flex  gap-2">
            {currentIndex !== 0 && (
              <Button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={`flex-1 ${
                  currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Voltar
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={
                currentIndex === transmissionMessages.results.length - 1
              }
              className={`flex-1 ${
                currentIndex === transmissionMessages.results.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Próxima
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
