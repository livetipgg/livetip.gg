import { TvMinimalPlay } from "lucide-react";
import { Button } from "./ui/button";

export const ButtonNewLive = () => {
  return (
    <Button
      variant="destructive"
      className="w-full  md:w-auto"
      onClick={() => {
        window.open(`/transmissao`, "_blank");
      }}
    >
      <TvMinimalPlay className="h-5 w-5 mr-2" />
      Modo Apresentação
    </Button>
  );
};
