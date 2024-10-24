/* eslint-disable react-hooks/exhaustive-deps */
import { withLayout } from "@/HOC/withLayout";
import { useEffect } from "react";
import { ButtonNewLive } from "@/components/button-new-live";
import { SectionTitle } from "@/components/section-title";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { messageState } from "../states/atoms";
import { useLoadMessagesUseCase } from "../useCases/useLoadMessagesUseCase";
import MessagesList from "./components/messages-received/messages-list";

import PaginationComponent from "@/components/pagination";
import FilterBar from "./components/filterBar";
import socket from "@/socket";
const MessagesReceived = () => {
  const setMessageState = useSetRecoilState(messageState);
  const { controller, messages } = useRecoilValue(messageState);
  const { isLoadingMessages, errorMessages } = controller;
  const { messagesParams } = controller;

  const { loadMessages } = useLoadMessagesUseCase();

  useEffect(() => {
    loadMessages();
  }, []);
  useEffect(() => {
    console.log(socket);
    // Connect to the server when the component mounts
    socket.connect();

    // Cleanup when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <SectionTitle title="Mensagens Recebidas" actions={[<ButtonNewLive />]} />
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
  "LiveChat - Mensagens Recebidas"
);

export default MessagesReceivedPage;
