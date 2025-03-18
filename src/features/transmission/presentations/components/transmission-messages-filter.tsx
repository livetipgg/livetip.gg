import { Button } from "@/components/ui/button";
import { messageState } from "@/features/messages/states/atoms";
import { useLoadTransmissionMessagesUseCase } from "@/features/messages/useCases/useLoadTransmissionMessagesUseCase";
import { format } from "date-fns";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { DatePicker } from "./date-picker";
import { Label } from "@/components/ui/label";

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

  const [startDate, setStartDate] = useState<Date | undefined>(
    transmissionMessagesParams.startDate
      ? new Date(transmissionMessagesParams.startDate)
      : start
  );

  const [endDate, setEndDate] = useState<Date | undefined>(
    transmissionMessagesParams.endDate
      ? new Date(transmissionMessagesParams.endDate)
      : end
  );

  const handleSetStartDate = (date: Date | undefined) => {
    setStartDate(date);

    const from_date_formatted = date && format(date, "yyyy-MM-dd");
    const to_date_formatted = endDate && format(endDate, "yyyy-MM-dd");

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

    loadTransmissionMessages({
      startDate: date,
      endDate,
    });
  };

  const handleSetEndDate = (date: Date | undefined) => {
    setEndDate(date);

    const from_date_formatted = startDate && format(startDate, "yyyy-MM-dd");
    const to_date_formatted = date && format(date, "yyyy-MM-dd");

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

    loadTransmissionMessages({
      startDate,
      endDate: date,
    });
  };

  return (
    <div className="space-y-5 pb-10">
      <div className="flex items-center gap-2 justify-between flex-wrap">
        <div className="w-full md:w-fit">
          <div className="flex gap-4">
            <div className="flex flex-col">
              <Label>Data Início</Label>
              <DatePicker
                initialDate={startDate}
                onDateSelect={handleSetStartDate}
                placeholder="Data Início"
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <div className="flex flex-col">
              <Label>Data Fim</Label>
              <DatePicker
                initialDate={endDate}
                onDateSelect={handleSetEndDate}
                placeholder="Data Fim"
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>
        </div>
        <Button
          variant={"outline"}
          className={`w-full md:w-fit ${
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
