import { Search } from "lucide-react"; // Supondo que você use o ícone "Search" do Lucide
import SearchInput from "../messages-received/search-input";
import DateFilter from "../messages-received/date-filter";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { messageState } from "@/features/messages/states/atoms";
import React from "react";
import { useLoadMessagesUseCase } from "@/features/messages/useCases/useLoadMessagesUseCase";
import { format } from "date-fns";
import { SelectUserCombobox } from "@/components/select-user-combobox";
import { authState } from "@/features/auth/states/atoms";

const FilterBar = () => {
  const { user } = useRecoilValue(authState);
  const setMessageState = useSetRecoilState(messageState);
  const { controller } = useRecoilValue(messageState);
  const { messagesParams, isLoadingMessages } = controller;
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

  const isAdmin = user.id === 3;

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

  return (
    <div className="flex justify-between items-center flex-wrap bg-card-custom p-4">
      <div className="flex gap-4 flex-wrap flex-1">
        <SearchInput
          query={messagesParams.query}
          onSearch={(query) => {
            setMessageState((prevState) => ({
              ...prevState,
              controller: {
                ...prevState.controller,
                messagesParams: {
                  ...prevState.controller.messagesParams,
                  query,
                },
              },
            }));
          }}
          onSubmit={() =>
            loadMessages({
              page: 1,
            })
          }
          isLoading={isLoadingMessages}
        />

        <DateFilter
          date={date}
          onDateSelect={handleSetDate}
          onClear={clearDate}
        />

        {isAdmin && (
          <SelectUserCombobox
            onUserSelect={(user) => {
              setMessageState((prevState) => ({
                ...prevState,
                controller: {
                  ...prevState.controller,
                  messagesParams: {
                    ...prevState.controller.messagesParams,
                    userId: user,
                  },
                },
              }));
            }}
          />
        )}
      </div>

      <Button
        variant="default"
        className="w-full lg:w-auto mt-4 lg:mt-0"
        onClick={() =>
          loadMessages({
            page: 1,
          })
        }
        disabled={isLoadingMessages}
      >
        <Search className="h-4 w-4 mr-2" />
        Filtrar
      </Button>
    </div>
  );
};

export default FilterBar;
