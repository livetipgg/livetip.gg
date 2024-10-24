import { MessageSquareMore } from "lucide-react";
import { formatTextMaxCaracters } from "@/helpers/formatTextMaxCaracters";

interface MessageContentProps {
  content: string;
}

const MessageContent = ({ content }: MessageContentProps) => {
  return (
    <div className="flex w-full mt-4 md:mx-10 md:my-0">
      <MessageSquareMore className="h-5 w-5 mr-2" />
      <p className="text-sm font-normal">
        {formatTextMaxCaracters(content, 180)}
      </p>
    </div>
  );
};

export default MessageContent;
