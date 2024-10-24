import { CheckCheck } from "lucide-react";
import { IMessage } from "@/features/messages/contracts/IRecoilState";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import MessageInfo from "./message-info";
import MessageContent from "./message-content";
import MessageAmount from "./message-amount";

interface MessageContainerMobileProps {
  message: IMessage;
  messages: IMessage[];
}

const MessageContainerMobile = ({
  message,
  messages,
}: MessageContainerMobileProps) => {
  const isLastMessage = messages[0] === message;

  return (
    <div
      className={cn(
        "flex md:hidden flex-col md:flex-row w-full items-start md:items-center justify-between border p-4 rounded-lg mt-4 relative bg-muted/40",
        isLastMessage ? "border-success" : ""
      )}
    >
      <CheckCheck className="h-5 w-5 text-success mr-5" />
      {isLastMessage && (
        <Badge className="bg-success text-white absolute -top-4 left-4">
          Última mensagem recebida
        </Badge>
      )}
      <div className="flex w-full justify-between">
        <MessageInfo sender={message.sender} timestamp={message.timestamp} />
        <MessageAmount currency={message.currency} amount={message.amount} />
      </div>
      <MessageContent content={message.content} />
    </div>
  );
};

export default MessageContainerMobile;
