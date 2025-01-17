import { MessageSquareMore } from "lucide-react";
import { formatTextMaxCaracters } from "@/helpers/formatTextMaxCaracters";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface MessageContentProps {
  content: string;
}

const MessageContent = ({ content }: MessageContentProps) => {
  return (
    <div className="flex flex-1 mt-4 lg:mx-10 lg:my-0 items-center">
      <MessageSquareMore className="h-5 w-5 mr-2" />
      <p className="text-sm font-normal flex items-center">
        <div className="hidden lg:flex">
          {formatTextMaxCaracters(content, 50)}
        </div>
        <div className=" flex md:hidden">
          {formatTextMaxCaracters(content, 30)}
        </div>
        {content.length > 30 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="link">Ver mais</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <div className=" max-w-full overflow-hidden">
                <p className="break-words whitespace-normal max-w-full overflow-auto">
                  {content}
                </p>
              </div>
              <AlertDialogFooter>
                <AlertDialogAction>Fechar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </p>
    </div>
  );
};

export default MessageContent;
