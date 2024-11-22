/* eslint-disable react-hooks/exhaustive-deps */
import { messageState } from "@/features/messages/states/atoms";
import { useRecoilValue } from "recoil";
import MessageContainer from "../message-view/message-container";
import { NoContent } from "@/components/no-content";
import { useEffect } from "react";
import { ErrorAlert } from "@/components/error-alert";
import { MessageSkeleton } from "../message-view/message-skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useLoadLastMessagesUseCase } from "@/features/messages/useCases/useLoadLastMessagesUseCase";

export const LastMessagesViewList = () => {
  const { controller: messageStateController, lastMessages } =
    useRecoilValue(messageState);
  const { isLoadingLastMessages: lastMessagesIsLoading, errorLastMessages } =
    messageStateController;

  const { loadLastMessages } = useLoadLastMessagesUseCase();

  useEffect(() => {
    loadLastMessages();
  }, []);

  if (errorLastMessages || !lastMessages)
    return <ErrorAlert error={errorLastMessages} />;

  if (
    !lastMessagesIsLoading &&
    lastMessages &&
    lastMessages.results &&
    lastMessages.results.length === 0
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
      <div className="flex items-center justify-between mb-10 ">
        <h4 className="text-xl font-semibold ">Últimas mensagens</h4>
        <Button
          variant={"outline"}
          className={`${lastMessagesIsLoading ? "text-muted-foreground" : ""}`}
          title="Atualizar"
          onClick={() => {
            loadLastMessages();
          }}
          disabled={lastMessagesIsLoading}
        >
          <span className="mr-2">Atualizar</span>
          <RefreshCw
            className={`w-4 h-4 mb-0 ${
              lastMessagesIsLoading ? "animate-spin" : ""
            }`}
          />
        </Button>
      </div>
      {!lastMessagesIsLoading &&
        lastMessages.results.map((message) => (
          <MessageContainer
            key={message._id}
            messages={lastMessages.results}
            message={message}
          />
        ))}
      {lastMessagesIsLoading &&
        Array.from({ length: 4 }).map((_, index) => (
          <MessageSkeleton key={index} />
        ))}
    </div>
  );
};
