import { NoContent } from "@/components/no-content";
import { IMessage } from "@/features/messages/contracts/IRecoilState";
import MessageContainer from "../message-view/message-container";
import { ErrorAlert } from "@/components/error-alert";
import { messageState } from "@/features/messages/states/atoms";
import { useRecoilValue } from "recoil";
import { MessageSkeleton } from "../message-view/message-skeleton";

interface MessagesListProps {
  messages: IMessage[];
  isLoading: boolean;
  error?: string;
}

const MessagesList: React.FC<MessagesListProps> = ({
  messages,
  isLoading,
  error,
}) => {
  const { controller: messageStateController } = useRecoilValue(messageState);
  const { messagesParams } = messageStateController;
  if (isLoading) {
    return Array.from({ length: messagesParams.pageSize || 10 }).map(
      (_, index) => <MessageSkeleton key={index} />
    );
  }
  if (messages.length === 0)
    return <NoContent message="Nenhuma mensagem para mostrar" />;

  if (error) return <ErrorAlert error={error} />;

  return (
    <>
      {messages.map((message) => (
        <MessageContainer
          key={message._id}
          messages={messages}
          message={message}
        />
      ))}
    </>
  );
};

export default MessagesList;
