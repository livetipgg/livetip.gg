/* eslint-disable react-hooks/exhaustive-deps */
import { messageState } from "@/features/messages/states/atoms";
import { useRecoilValue } from "recoil";
import MessageContainer from "../message-view/message-container";
import { NoContent } from "@/components/no-content";
import { useEffect } from "react";
import { useLoadLastMessagesUseCase } from "@/features/messages/useCases/useLoadLastMessagesUseCase";
import { ErrorAlert } from "@/components/error-alert";
import { MessageSkeleton } from "../message-view/message-skeleton";

export const LastMessagesViewList = () => {
  const { controller: messageStateController, lastMessages } =
    useRecoilValue(messageState);
  const { isLoadingLastMessages: lastMessagesIsLoading, errorLastMessages } =
    messageStateController;

  const { loadLastMessages } = useLoadLastMessagesUseCase();

  useEffect(() => {
    loadLastMessages();
  }, []);

  return (
    <div className="my-10">
      <h4 className="text-xl font-semibold mb-10">Últimas mensagens</h4>
      {lastMessagesIsLoading &&
        Array.from({ length: 4 }).map((_, index) => (
          <MessageSkeleton key={index} />
        ))}
      {!lastMessagesIsLoading &&
        lastMessages.results.length > 0 &&
        lastMessages.results.map((message) => (
          <MessageContainer
            key={message._id}
            messages={lastMessages.results}
            message={message}
          />
        ))}
      {!lastMessagesIsLoading && lastMessages.results.length === 0 && (
        <NoContent message="Nenhuma mensagem para mostrar" />
      )}

      {errorLastMessages && <ErrorAlert error={errorLastMessages} />}
    </div>
  );
};
