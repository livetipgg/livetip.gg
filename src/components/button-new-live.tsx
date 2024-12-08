import { TvMinimalPlay } from "lucide-react";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export const ButtonNewLive = () => {
  const isMobile = useIsMobile();
  return (
    <Button
      size={isMobile ? "icon" : "default"}
      className={`${isMobile ? "" : "w-full  md:w-auto"} bg-secondary`}
      onClick={() => {
        window.open(`/transmissao`, "_blank");
      }}
    >
      <TvMinimalPlay className={`h-5 w-5 ${isMobile ? "" : "mr-2"}`} />
      {isMobile ? "" : "Modo Apresentação"}
    </Button>
  );
};
