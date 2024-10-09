/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { withLayout } from "@/HOC/withLayout";
import { cn } from "@/lib/utils";
import { CalendarIcon, Search } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import React, { useEffect } from "react";
import { DateRange } from "react-day-picker";
import { ButtonNewLive } from "@/components/button-new-live";
import { SectionTitle } from "@/components/section-title";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { messageState } from "../states/atoms";
import { useLoadMessagesUseCase } from "../useCases/useLoadMessagesUseCase";
import MessageContainer from "./components/message-view/message-container";
import { NoContent } from "@/components/no-content";
import ContentLoader from "@/components/content-loader";
import { ptBR } from "date-fns/locale";

const MessagesReceived = () => {
  const setMessageState = useSetRecoilState(messageState);
  const { controller, messages } = useRecoilValue(messageState);
  const { isLoadingMessages } = controller;
  const { messagesParams } = controller;
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: messagesParams.startDate
      ? new Date(messagesParams.startDate)
      : undefined,
    to: messagesParams.endDate ? new Date(messagesParams.endDate) : undefined,
  });

  const { loadMessages } = useLoadMessagesUseCase();
  const handleSetDate = (date: DateRange) => {
    setDate(date);

    const from_date_formatted = date.from && format(date.from, "yyyy-MM-dd");
    const to_date_formatted = date.to && format(date.to, "yyyy-MM-dd");

    setMessageState((prevState) => ({
      ...prevState,
      controller: {
        ...prevState.controller,
        messagesParams: {
          ...prevState.controller.messagesParams,
          startDate: from_date_formatted,
          endDate: to_date_formatted,
        },
      },
    }));
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div>
      <SectionTitle title="Mensagens Recebidas" actions={[<ButtonNewLive />]} />

      <div>
        <div className="flex justify-between items-center flex-wrap bg-muted/40 p-4">
          <div className="flex gap-4 flex-wrap flex-1 ">
            <Input
              value={messagesParams.query}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  loadMessages();
                }
              }}
              onChange={(e) =>
                setMessageState((prevState) => ({
                  ...prevState,
                  controller: {
                    ...prevState.controller,
                    messagesParams: {
                      ...prevState.controller.messagesParams,
                      query: e.target.value,
                    },
                  },
                }))
              }
              placeholder="Pesquisar"
              className="w-full lg:w-[320px] bg-white dark:bg-black"
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-full lg:w-[320px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLLL dd, y", {
                          locale: ptBR,
                        })}{" "}
                        -{" "}
                        {format(date.to, "LLLL dd, y", {
                          locale: ptBR,
                        })}
                      </>
                    ) : (
                      format(date.from, "LLLL dd, y", {
                        locale: ptBR,
                      })
                    )
                  ) : (
                    <span>Selecione um intervalo de datas</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date || undefined}
                  onSelect={handleSetDate as any}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            {(date?.from || date?.to) && (
              <Button
                variant="link"
                className="w-full lg:w-auto mt-4 lg:mt-0"
                onClick={() => {
                  setDate(undefined);
                  setMessageState((prevState) => ({
                    ...prevState,
                    controller: {
                      ...prevState.controller,
                      messagesParams: {
                        ...prevState.controller.messagesParams,
                        startDate: undefined,
                        endDate: undefined,
                      },
                    },
                  }));
                }}
              >
                Limpar Data
              </Button>
            )}
          </div>

          <Button
            variant="default"
            className="w-full lg:w-auto mt-4 lg:mt-0"
            onClick={loadMessages}
            disabled={isLoadingMessages}
          >
            <Search className="h-4 w-4 mr-2" />
            Filtrar
          </Button>
        </div>
      </div>
      <div className="mt-10">
        {isLoadingMessages && <ContentLoader message="Carregando mensagens" />}
        {!isLoadingMessages &&
          messages.length > 0 &&
          messages.map((message) => (
            <MessageContainer
              key={message._id}
              messages={messages}
              message={message}
            />
          ))}
        {!isLoadingMessages && messages.length === 0 && (
          <NoContent message="Nenhuma mensagem para mostrar" />
        )}
      </div>
    </div>
  );
};

const MessagesReceivedPage = withLayout(
  MessagesReceived,
  "LiveChat - Mensagens Recebidas"
);

export default MessagesReceivedPage;
