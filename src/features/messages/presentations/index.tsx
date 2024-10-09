/* eslint-disable react-hooks/exhaustive-deps */

import { Button } from "@/components/ui/button";

import { withLayout } from "@/HOC/withLayout";
import { Search } from "lucide-react";
import { format } from "date-fns";
import React, { useEffect } from "react";
import { DateRange } from "react-day-picker";
import { ButtonNewLive } from "@/components/button-new-live";
import { SectionTitle } from "@/components/section-title";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { messageState } from "../states/atoms";
import { useLoadMessagesUseCase } from "../useCases/useLoadMessagesUseCase";
import MessagesList from "./components/messages-received/messages-list";
import SearchInput from "./components/messages-received/search-input";
import DateFilter from "./components/messages-received/date-filter";

const MessagesReceived = () => {
  const setMessageState = useSetRecoilState(messageState);
  const { controller, messages } = useRecoilValue(messageState);
  const { isLoadingMessages, errorMessages } = controller;
  const { messagesParams } = controller;
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: messagesParams.startDate
      ? new Date(messagesParams.startDate)
      : undefined,
    to: messagesParams.endDate ? new Date(messagesParams.endDate) : undefined,
  });

  const { loadMessages } = useLoadMessagesUseCase();

  const clearDate = () => {
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
  };

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
            <SearchInput
              query={messagesParams.query}
              onSearch={(query) =>
                setMessageState((prevState) => ({
                  ...prevState,
                  controller: {
                    ...prevState.controller,
                    messagesParams: {
                      ...prevState.controller.messagesParams,
                      query,
                    },
                  },
                }))
              }
              onSubmit={loadMessages}
              isLoading={isLoadingMessages}
            />

            <DateFilter
              date={date}
              onDateSelect={handleSetDate}
              onClear={clearDate}
            />
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
        <MessagesList
          isLoading={isLoadingMessages}
          messages={messages}
          error={errorMessages}
        />
      </div>
    </div>
  );
};

const MessagesReceivedPage = withLayout(
  MessagesReceived,
  "LiveChat - Mensagens Recebidas"
);

export default MessagesReceivedPage;
