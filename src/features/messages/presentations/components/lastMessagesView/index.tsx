/* eslint-disable react-hooks/exhaustive-deps */
import { messageState } from "@/features/messages/states/atoms";
import { useRecoilValue } from "recoil";
import MessageContainer from "../message-view/message-container";
import { NoContent } from "@/components/no-content";
import { useEffect } from "react";
import { ErrorAlert } from "@/components/error-alert";
import { MessageSkeleton } from "../message-view/message-skeleton";
import { useLoadMessagesUseCase } from "@/features/messages/useCases/useLoadMessagesUseCase";

export const LastMessagesViewList = () => {
  const { controller: messageStateController, messages } =
    useRecoilValue(messageState);
  const { isLoadingLastMessages: lastMessagesIsLoading, errorLastMessages } =
    messageStateController;

  const { loadMessages } = useLoadMessagesUseCase();

  useEffect(() => {
    loadMessages({
      limit: 4,
    });
  }, []);

  if (errorLastMessages || !messages)
    return <ErrorAlert error={errorLastMessages} />;

  if (lastMessagesIsLoading) {
    return Array.from({ length: 4 }).map((_, index) => (
      <MessageSkeleton key={index} />
    ));
  }

  if (
    !lastMessagesIsLoading &&
    messages &&
    messages.results &&
    messages.results.length === 0
  ) {
    return (
      <div className="my-10">
        <h4 className="text-xl font-semibold mb-10">Últimas mensagens</h4>
        <NoContent message="Nenhuma mensagem para mostrar" />
      </div>
    );
  }

  return (
    <div className="my-10">
      <h4 className="text-xl font-semibold mb-10">Últimas mensagens</h4>
      {messages.results.map((message) => (
        <MessageContainer
          key={message._id}
          messages={messages.results}
          message={message}
        />
      ))}
    </div>
  );
};
