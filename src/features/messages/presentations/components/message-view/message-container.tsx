import { CheckCheck } from "lucide-react";
import { IMessage } from "@/features/messages/contracts/IRecoilState";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import MessageInfo from "./message-info";
import MessageContent from "./message-content";
import MessageAmount from "./message-amount";
import { useRecoilValue } from "recoil";
import { messageState } from "@/features/messages/states/atoms";

interface MessageContainerProps {
  message: IMessage;
  messages: IMessage[];
}

const MessageContainer = ({ message, messages }: MessageContainerProps) => {
  const isLastMessage = messages[0] === message;
  const { controller } = useRecoilValue(messageState);
  const { messagesParams } = controller;
  return (
    <div
      className={cn(
        "md:flex flex-col md:flex-row w-full items-start hidden md:items-center justify-between border p-4 rounded-lg mt-4 relative bg-muted/40",
        isLastMessage && messagesParams.page === 1 ? "border-success" : ""
      )}
    >
      <CheckCheck className="h-5 w-5 text-success mr-5" />
      {isLastMessage && messagesParams.page === 1 && (
        <Badge className="bg-success text-white absolute -top-4 left-4">
          Última mensagem recebida
        </Badge>
      )}
      <MessageInfo sender={message.sender} timestamp={message.timestamp} />
      <MessageContent content={message.content} />
      <MessageAmount currency={message.currency} amount={message.amount} />
    </div>
  );
};

export default MessageContainer;
