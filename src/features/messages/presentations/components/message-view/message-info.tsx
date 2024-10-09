import { format } from "date-fns";

interface MessageInfoProps {
  sender: string;
  timestamp: Date;
}

const MessageInfo = ({ sender, timestamp }: MessageInfoProps) => {
  return (
    <div className="flex flex-col w-[200px]">
      <strong>{sender}</strong>
      <span>{format(new Date(timestamp), "dd/MM/yyyy HH:mm")}</span>
    </div>
  );
};

export default MessageInfo;
