import { Button } from "@/components/ui/button";
import DateFilter from "@/features/messages/presentations/components/messages-received/date-filter";
import { messageState } from "@/features/messages/states/atoms";
import { useLoadTransmissionMessagesUseCase } from "@/features/messages/useCases/useLoadTransmissionMessagesUseCase";
import { format } from "date-fns";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const TransmissionMessagesFilter = () => {
  const { controller } = useRecoilValue(messageState);
  const { isLoadingTransmissionMessages, transmissionMessagesParams } =
    controller;
  const setMessageState = useSetRecoilState(messageState);
  const { loadTransmissionMessages } = useLoadTransmissionMessagesUseCase();
  const start = new Date();
  start.setDate(start.getDate());
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setDate(end.getDate() + 1);
  end.setHours(23, 59, 59, 999);

  const [date, setDate] = useState<DateRange | undefined>({
    from: transmissionMessagesParams.startDate
      ? new Date(transmissionMessagesParams.startDate)
      : start,
    to: transmissionMessagesParams.endDate
      ? new Date(transmissionMessagesParams.endDate)
      : end,
  });

  const handleSetDate = (date: DateRange) => {
    setDate(date);

    const from_date_formatted = date.from && format(date.from, "yyyy-MM-dd");
    const to_date_formatted = date.to && format(date.to, "yyyy-MM-dd");

    setMessageState((prevState) => ({
      ...prevState,
      controller: {
        ...prevState.controller,
        transmissionMessagesParams: {
          ...prevState.controller.transmissionMessagesParams,
          startDate: from_date_formatted,
          endDate: to_date_formatted,
        },
      },
    }));
  };

  return (
    <div className="space-y-5 pb-10">
      <div className="flex items-center justify-between">
        <DateFilter date={date} onDateSelect={handleSetDate} />
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
    </div>
  );
};
