/* eslint-disable react-hooks/exhaustive-deps */
import { withLayout } from "@/HOC/withLayout";
import { useEffect } from "react";
import { ButtonNewLive } from "@/components/button-new-live";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { messageState } from "../states/atoms";
import { useLoadMessagesUseCase } from "../useCases/useLoadMessagesUseCase";
import MessagesList from "./components/messages-received/messages-list";

import PaginationComponent from "@/components/pagination";
import FilterBar from "./components/filterBar";
const MessagesReceived = () => {
  const setMessageState = useSetRecoilState(messageState);
  const { controller, messages } = useRecoilValue(messageState);
  const { isLoadingMessages, errorMessages } = controller;
  const { messagesParams } = controller;

  const { loadMessages } = useLoadMessagesUseCase();

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-end mb-4">
        <ButtonNewLive />
      </div>
      <FilterBar />
      <MessagesList
        isLoading={isLoadingMessages}
        messages={messages.results}
        error={errorMessages}
      />
      <PaginationComponent
        currentPage={messagesParams.page}
        totalPages={messages.totalPages}
        total={messages.count}
        onPageChange={(page) => {
          setMessageState((prevState) => ({
            ...prevState,
            controller: {
              ...prevState.controller,
              messagesParams: {
                ...prevState.controller.messagesParams,
                page,
              },
            },
          }));
          loadMessages({
            page,
          });

          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
};

const MessagesReceivedPage = withLayout(
  MessagesReceived,
  "LiveTip - Mensagens Recebidas"
);

export default MessagesReceivedPage;
