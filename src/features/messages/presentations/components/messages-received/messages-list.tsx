import ContentLoader from "@/components/content-loader";
import { NoContent } from "@/components/no-content";
import { IMessage } from "@/features/messages/contracts/IRecoilState";
import MessageContainer from "../message-view/message-container";
import { ErrorAlert } from "@/components/error-alert";

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
  if (isLoading) return <ContentLoader message="Carregando mensagens" />;
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
