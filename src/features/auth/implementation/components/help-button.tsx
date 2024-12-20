import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Info } from "lucide-react";
import { Link } from "react-router-dom";

export const HelpButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="link"
          className="text-blue-600 flex gap-2  absolute bottom-10"
        >
          <Info size={18} />
          Preciso de ajuda
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Fale com a gente!</DropdownMenuLabel>
        <Separator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              className="flex items-center gap-1"
              target="_blank"
              to="https://api.whatsapp.com/send/?phone=5551997858889&text=Bem+vindo+ao+suporte+LiveTip%0A%0AEnvie+sua+mensagem%0A%0AResponderemos+o+mais+r%C3%A1pido+poss%C3%ADvel.&type=phone_number&app_absent=0"
            >
              <img
                src="https://cdn.simpleicons.org/whatsapp"
                alt="Whatsapp icon"
                className="w-5 h-5"
              />
              <span className=" font-medium text-sm">Whatsapp</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              to="https://t.me/livetipgg"
              target="_blank"
              className="flex items-center gap-1"
            >
              <img
                src="https://cdn.simpleicons.org/telegram"
                alt="Whatsapp icon"
                className="w-5 h-5"
              />
              <span className=" font-medium text-sm">Telegram</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
