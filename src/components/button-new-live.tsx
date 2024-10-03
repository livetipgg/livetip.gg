import { TvMinimalPlay } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export const ButtonNewLive = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <TvMinimalPlay className="h-5 w-5 mr-2" />
          Iniciar transmissão
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Deseja iniciar uma nova transmissão ao vivo?
          </DialogTitle>
          <DialogDescription>
            Você está prestes a iniciar uma nova transmissão ao vivo. Deseja
            continuar?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="link">Cancelar</Button>
          <Button
            variant="default"
            onClick={() => {
              const randomId = Math.random().toString(36).substr(2, 9);
              window.open(`/transmissao/${randomId}`, "_blank");
            }}
          >
            Iniciar transmissão
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
